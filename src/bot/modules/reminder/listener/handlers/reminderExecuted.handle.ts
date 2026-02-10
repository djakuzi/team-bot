import {Telegraf} from 'telegraf';
import {Injectable} from '@nestjs/common';
import {InjectBot} from 'nestjs-telegraf';
import {ServiceSettings} from '@tb-modules/settings/services/settings.service';
import {EventReminderExecute} from '@tb-modules/reminder/events/executeReminder.event';

@Injectable()
export class HandlerReminderExecuted {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly serviceSettings: ServiceSettings,
  ) {}

  private async sendReminder(payload: EventReminderExecute) {
    const id = await this.serviceSettings.getSettings(true);
    const {reminder} = payload;

    const message = `
        *Напоминание*: ${reminder.name}. 
        \n${reminder.desc}`;

    await this.bot.telegram.sendMessage(id.connectedIdChat + '', message, {
      parse_mode: 'Markdown',
    });
  }

  async execute(payload: EventReminderExecute) {
    await this.sendReminder(payload);
  }
}
