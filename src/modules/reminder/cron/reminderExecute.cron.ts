import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CronJob} from 'cron';
import {EventEmitter2} from '@nestjs/event-emitter';
import {ServiceReminder} from '../services/reminder.service';
import {Reminder} from '@prisma/client';
import {RepoReminder} from '@tb-core/prisma/repo/reminder/reminder.repo';
import {EventReminderExecute} from '../events/executeReminder.event';

@Injectable()
export class CronReminderExecute implements OnModuleInit {
  private readonly logger = new Logger(CronReminderExecute.name);
  private listCurrentJob: Map<number, CronJob> | null = null;

  constructor(
    private readonly serviceReminder: ServiceReminder,
    private readonly repoReminder: RepoReminder,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    try {
      const listReminder = await this.serviceReminder.getListReminder();

      if (listReminder && listReminder.length > 0) {
        listReminder.forEach(reminder => {
          if (reminder.repeat) {
            this.scheduleReminder(reminder);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  private getCronTIme(reminder: Reminder): string | null {
    try {
      const executedAt = new Date(reminder.executedAt);
      const hour = executedAt.getHours();
      const minute = executedAt.getMinutes();

      return `${minute} ${hour} * * *`;
    } catch (error) {
      this.logger.error(
        `Ошибка при создании времени cron для напоминания ${reminder.id}`,
        error,
      );
      return null;
    }
  }

  private async stopScheduledReminder(reminderId: number) {
    const currentJob = this.listCurrentJob?.get(reminderId);

    if (currentJob) {
      await currentJob.stop();
      this.listCurrentJob?.delete(reminderId);

      this.logger.log(`Остановлена задача напоминание с ID ${reminderId}`);
    }
  }

  private checkNeedExecuted(reminder: Reminder): boolean {
    const now = new Date();
    const todayISO = now.toISOString().slice(0, 10);
    const lastExecISO = reminder.lastExecutedAt?.toISOString().slice(0, 10);

    if (lastExecISO === todayISO) return false;
    const executedAt = new Date(reminder.executedAt);

    if (!reminder.repeatRangeDays || !reminder.lastExecutedAt) {
      return (
        now.getDay() === executedAt.getDay() &&
        now.getHours() === executedAt.getHours() &&
        now.getMinutes() === executedAt.getMinutes()
      );
    }

    if (reminder.repeatRangeDays > 0) {
      if (!lastExecISO) {
        const execTimeToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          executedAt.getHours(),
          executedAt.getMinutes(),
          executedAt.getSeconds(),
        );
        return now >= execTimeToday;
      }

      const lastExecuted = new Date(reminder.lastExecutedAt);
      const diffDays = Math.floor(
        (now.getTime() - lastExecuted.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diffDays >= reminder.repeatRangeDays;
    }

    return false;
  }

  private scheduleReminder(reminder: Reminder) {
    const cronTime = this.getCronTIme(reminder);

    if (!cronTime) {
      this.logger.warn(`Не удалось запустить напоминание с ID ${reminder.id}`);
      return;
    }

    const newJob = new CronJob(
      cronTime,
      () => this.executeReminder(reminder),
      null,
      true,
    );

    if (!this.listCurrentJob) {
      this.listCurrentJob = new Map<number, CronJob>();
    }

    this.listCurrentJob.set(reminder.id, newJob);
    this.logger.log(`Запущена задача напоминание с ID ${reminder.id}`);
  }

  private async executeReminder(reminder: Reminder) {
    if (!this.checkNeedExecuted(reminder)) {
      this.logger.log(
        `Напоминание ${reminder.id} пропущено (уже выполнено сегодня или интервал не прошел)`,
      );
      return;
    }

    try {
      await this.repoReminder.update(reminder.id, {
        lastExecutedAt: new Date(),
      });

      this.eventEmitter.emit(
        EventReminderExecute.eventName,
        new EventReminderExecute(reminder, {isCron: true}),
      );

      this.logger.log(
        `Выполнено напоминание: ${reminder.name} (ID: ${reminder.id})`,
      );
    } catch (error) {
      this.logger.error(
        `Ошибка при выполнении напоминания ${reminder.id}`,
        error,
      );
    }
  }

  async addedScheduledReminder(reminder: Reminder) {
    if (!reminder.repeat) return;

    this.scheduleReminder(reminder);
  }

  async restartScheduledReminder(reminder: Reminder) {
    await this.stopScheduledReminder(reminder.id);

    if (!reminder.repeat) return;

    this.scheduleReminder(reminder);

    this.logger.log(`Перезапущено напоминание с ID ${reminder.id}`);
  }

  async deleteScheduledReminder(reminderId: number) {
    await this.stopScheduledReminder(reminderId);
  }
}
