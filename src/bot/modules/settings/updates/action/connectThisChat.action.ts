import { ACTIONS_BOT_SETTINGS } from "@tb-bot/modules/settings/constant/actions.const";
import { ExceptionValidation } from "@tb-common/exception/validation.exception";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";
import { ServiceSettings } from "@tb-modules/settings/services/settings.service";
import { Context } from "telegraf";

export async function connectThisChat(
    ctx: Context,
    serviceSettings: ServiceSettings,
    typeUpdate: TypeUpdateContext,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const chat = ctx.chat;
    const message = 'Чат успешно подключился к боту';

    if (!chat?.id) {
        throw new ExceptionValidation('Не валидный id чата: ' + chat?.id);
    }

    await serviceSettings.createSettings({
        connectedIdChat: BigInt(chat?.id)
    })

    if (isAction) {
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_SETTINGS.menu.desc, callback_data: ACTIONS_BOT_SETTINGS.menu.action }],
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(message);
    }
}