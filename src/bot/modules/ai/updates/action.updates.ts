import {Action, Ctx, Update} from 'nestjs-telegraf';
import {ACTIONS_BOT_AI} from '../constant/actions.const';
import {Context, Scenes} from 'telegraf';
import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';
import {getCommands} from '@tb-bot/updates/action/getCommands.action';
import {COMMANDS_BOT_AI} from '../constant/commands.const';
import {clearAddedModels} from './action/clearAddedModels.action';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';
import {getLastUsedModels} from './action/getLastUsedModels.action';
import {getListModels} from './action/getListModels.action';

@Update()
export class ActionsBotMessage {
  constructor(private readonly serviceAi: ServiceAi) {}

  @Action(ACTIONS_BOT_AI.menu.action)
  async menuSettings(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_AI,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_AI.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });
    await ctx.editMessageText('Настройки', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_AI.addNewModel.action)
  async addNewModel(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('add_new_ai_model');
  }

  @Action(ACTIONS_BOT_AI.getLastUsedModels.action)
  async getLastUsedModels(@Ctx() ctx: Scenes.WizardContext) {
    await getLastUsedModels(ctx, this.serviceAi, 'action');
  }

  @Action(ACTIONS_BOT_AI.getListModels.action)
  async getListModels(@Ctx() ctx: Scenes.WizardContext) {
    await getListModels(ctx, this.serviceAi, 'action');
  }

  @Action(ACTIONS_BOT_AI.clearAddedModels.action)
  async clearAddedModels(@Ctx() ctx: Context) {
    await clearAddedModels(ctx, this.serviceAi, 'action');
  }

  @Action(ACTIONS_BOT_AI.commands.action)
  async getMessageCommands(@Ctx() ctx: Context) {
    await getCommands(ctx, 'action', COMMANDS_BOT_AI, ACTIONS_BOT_AI);
  }
}
