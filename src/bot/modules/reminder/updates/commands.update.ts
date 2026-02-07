import { Command, Ctx, Update } from 'nestjs-telegraf';
import { COMMANDS_BOT_REMINDER } from '../constant/commands.const';
import { getReminders } from './action/getReminders.action';
import { Context, Scenes } from 'telegraf';
import { ServiceReminder } from '@tb-modules/reminder/services/reminder.service';

@Update()
export class CommandsBotReminder {
    constructor(
        private readonly serviceReminder: ServiceReminder,
    ) {}

    @Command(COMMANDS_BOT_REMINDER.addReminders.command)
    async addReminders(@Ctx() ctx: Scenes.WizardContext) {
        await ctx.scene.enter('add_new_reminder');
    }

    @Command(COMMANDS_BOT_REMINDER.getReminders.command)
    async getReminders(@Ctx() ctx: Context) {
        await getReminders(ctx, 'command', this.serviceReminder);
    }
}
