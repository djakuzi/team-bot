import { Context } from "telegraf";
import { TransformMarkdown } from "@tb-core/libs/transformToMarkdown/index.lib";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";
import { ACTIONS_BOT_REMINDER } from "../../constant/actions.const";
import { ServiceReminder } from "@tb-modules/reminder/services/reminder.service";

export async function getReminders(
    ctx: Context,
    typeUpdate: TypeUpdateContext,
    serviceReminder: ServiceReminder,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const reminders = await serviceReminder.getListReminder();

    let descMessage = TransformMarkdown.parseEscapeMarkdownV2('Список напоминаний пуст.');

    if (reminders?.length > 0) {
        descMessage = TransformMarkdown.fromArray(
            reminders,
            ['title', 'description'],
            {
                title: 'name',
                description: 'desc',
            }
        );
    }

    if (isAction) {
        await ctx.editMessageText(descMessage, {
            parse_mode: 'MarkdownV2',
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_REMINDER.menu.desc, callback_data: ACTIONS_BOT_REMINDER.menu.action }]
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(descMessage)
    }
}