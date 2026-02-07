import { Context } from "telegraf";
import { TransformMarkdown } from "@tb-core/libs/transformToMarkdown/index.lib";
import { TypeUpdateContext } from "@tb-common/types/bot/update.type";
import { ACTIONS_BOT_MESSAGE } from "../../constant/actions.const";
import { COMMANDS_BOT_MESSAGE } from "../../constant/commands.const";

export async function getMessageCommands(
    ctx: Context,
    typeUpdate: TypeUpdateContext,
) {
    const isAction = typeUpdate === 'action';
    const isCommand = typeUpdate === 'command';

    if (isAction) {
        await ctx.answerCbQuery();
    }

    const transformedCommands = Object.values(COMMANDS_BOT_MESSAGE);
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
                    [{ text: ACTIONS_BOT_MESSAGE.menu.desc, callback_data: ACTIONS_BOT_MESSAGE.menu.action }]
                ],
            },
        });
    }

    if (isCommand) {
        await ctx.reply(descMessage)
    }
}