import { Telegraf } from "telegraf";
import { Injectable } from '@nestjs/common';
import { InjectBot } from "nestjs-telegraf";
import { ServiceSettings } from "@tb-modules/settings/services/settings.service";
import { EventReminderExecute } from "@tb-modules/reminder/events/executeReminder.event";
import { TransformMarkdown } from "@tb-core/libs/transformToMarkdown/index.lib";

@Injectable()
export class HandlerReminderExecuted {
    constructor(
        @InjectBot() private readonly bot: Telegraf,
        private readonly serviceSettings: ServiceSettings,
    ) { }

    private async sendReminder(payload: EventReminderExecute) {
        const id = await this.serviceSettings.getSettings(true);
        const list = [payload.reminder];

        const message = TransformMarkdown.fromArray(
            list,
            ['title', 'description'],
            {
                title: 'name',
                description: 'desc',
            }
        );

        await this.bot.telegram.sendMessage(
            id.connectedIdChat + '',
            message,
            {
                parse_mode: 'MarkdownV2',
            }
        );
    }

    async execute(payload: EventReminderExecute) {
        await this.sendReminder(payload);
    }
}
