import { TypeUpdateContext } from "@tb-common/types/bot/update.type";
import { ServiceMessage } from "@tb-modules/message/services/message.service";
import { Context } from "telegraf";
import { ACTIONS_BOT_MESSAGE } from "../../constant/actions.const";

export async function getSizeMemory(
    ctx: Context,
    serviceMessage: ServiceMessage,
    typeUpdate: TypeUpdateContext,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const size = await serviceMessage.getSizeMemory();

    const message = `Размер сообщений: ${size}`;


    if (isAction) {
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_MESSAGE.menu.desc, callback_data: ACTIONS_BOT_MESSAGE.menu.action }],
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(message);
    }
}