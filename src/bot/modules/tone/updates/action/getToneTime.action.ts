import { ServiceToneSettings } from "@tb-modules/tone/services/toneSettings.service";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";

export async function getToneTime(
    ctx: Context,
    serviceToneSettings: ServiceToneSettings,
    source: TypeUpdateContext,
) {
    const isAction = source === 'action';
    const isCommand = source === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const time = await serviceToneSettings.getToneTime();

    const message = time ? `Обновление тона происходит в ${time}` : `не установлено`;

    if (isAction) {
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_TONE.menu.desc, callback_data: ACTIONS_BOT_TONE.menu.action }],
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(message)
    }
}