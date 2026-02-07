import { ServiceToneSettings } from "@tb-modules/tone/services/toneSettings.service";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";
import { TransformMarkdown } from "@tb-core/libs/transformToMarkdown/index.lib";

export async function getCurrentToneMode(
    ctx: Context,
    serviceToneSettings: ServiceToneSettings,
    typeUpdate: TypeUpdateContext,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const tone = await serviceToneSettings.getCurrnetTone();
    const descMessage = TransformMarkdown.fromArray(
        [tone],
        ['title', 'description'],
        {
            title: 'name',
            description: 'desc',
        },
        '*Текущий режим тона*'
    );
    const message = `${descMessage}`;

    if (isAction) {
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_TONE.menu.desc, callback_data: ACTIONS_BOT_TONE.menu.action }],
                ],
            },
            parse_mode: 'MarkdownV2',
        });
    }

    if (isCommand) {
        await ctx.reply(message)
    }
}