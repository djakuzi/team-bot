import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CronJob} from 'cron';
import {EventEmitter2} from '@nestjs/event-emitter';
import {ServiceMessageSettings} from '../services/messageSettings.service';
import {ServiceMessageAi} from '../services/messageAi.service';
import {EventMessageRetellingGenerated} from '../events/generatedRetelling.event';

@Injectable()
export class CronRetellingMessages implements OnModuleInit {
  private readonly logger = new Logger(CronRetellingMessages.name);
  private currentJob: CronJob | null = null;
  private timeRetelling: string | null = null;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly serviceMessageSettings: ServiceMessageSettings,
    private readonly serviceMessageAi: ServiceMessageAi,
  ) {}

  async onModuleInit() {
    try {
      const time = await this.serviceMessageSettings.getTimeRetellingMessage();

      if (time) {
        this.scheduleRetellingMessage(time);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async scheduleRetellingMessage(time: string) {
    if (this.currentJob) {
      await this.currentJob.stop();
      this.logger.log('Остановлена старая задача пересказа сообщений');
    }

    this.logger.log(
      `Произошло обновление времени с ${this.timeRetelling} на ${time} по интервальному пересказу сообщений.`,
    );
    this.timeRetelling = time;

    const [hour, minute] = time.split(':').map(Number);
    const cronTime = `${minute} ${hour} * * *`;

    this.currentJob = new CronJob(
      cronTime,
      this.callbackUpdateTone.bind(this),
      null,
      true,
    );

    this.currentJob.start();
    this.logger.log(`Запущена задача пересказа сообщений на ${time}`);
  }

  private async callbackUpdateTone() {
    this.logger.log(
      `Генерация пересказа началась по расписанию в ${this.timeRetelling}.`,
    );
    const retelling = await this.serviceMessageAi.getRetellingMessages();

    this.eventEmitter.emit(
      EventMessageRetellingGenerated.eventName,
      new EventMessageRetellingGenerated(retelling, {isCron: true}),
    );

    this.logger.log(
      `Генерация пересказа начавшееся по расписанию в ${this.timeRetelling} закончилась.`,
    );
  }

  updateScheduledRetellingMessage(newTime: string) {
    this.scheduleRetellingMessage(newTime);
  }
}
