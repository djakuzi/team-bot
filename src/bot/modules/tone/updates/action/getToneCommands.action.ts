import { COMMANDS_BOT_TONE } from "@tb-bot/modules/tone/constant/commands.const";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";
import { TransformMarkdown } from "@tb-core/libs/transformToMarkdown/index.lib";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";

export async function getToneCommands(
    ctx: Context,
    typeUpdate: TypeUpdateContext,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const transformedCommands = Object.values(COMMANDS_BOT_TONE);
    const descMessage = TransformMarkdown.fromArray(
        transformedCommands,
        ['title', 'description'],
        {
            title: 'command',
            description: 'desc',
        }
    );

    if (isAction) {
        await ctx.editMessageText(descMessage, {
            parse_mode: 'MarkdownV2',
            reply_markup: {
                inline_keyboard: [
                    [{ text: ACTIONS_BOT_TONE.menu.desc, callback_data: ACTIONS_BOT_TONE.menu.action }]
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(descMessage)
    }
}