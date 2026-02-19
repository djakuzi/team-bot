import {Action, Ctx, Update} from 'nestjs-telegraf';
import {ACTIONS_BOT_MESSAGE} from '../constant/actions.const';
import {Context, Scenes} from 'telegraf';
import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';
import {ServiceMessage} from '@tb-modules/message/services/message.service';
import {getSizeMemory} from './action/getSizeMemory.action';
import {removeAllMemory} from './action/removeAllMemory.action';
import {getMessagesToday} from './action/getMessagesToday.action';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';
import {getTimeRetellingMessage} from './action/getTimeRetellingMessage.action';
import {getRetellingMessages} from './action/getRetellingMessages.action';
import {ServiceMessageAi} from '@tb-modules/message/services/messageAi.service';
import {getCommands} from '@tb-bot/updates/action/getCommands.action';
import {COMMANDS_BOT_MESSAGE} from '../constant/commands.const';
import {getPrompt} from './action/getPromt.action';
import {removePrompt} from './action/removePromt.action';

@Update()
export class ActionsBotMessage {
  constructor(
    private readonly serviceMessage: ServiceMessage,
    private readonly serviceMessageAi: ServiceMessageAi,
    private readonly serviceMessageSettings: ServiceMessageSettings,
  ) {}

  @Action(ACTIONS_BOT_MESSAGE.menu.action)
  async menuSettings(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_MESSAGE,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_MESSAGE.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });
    await ctx.editMessageText('Настройки', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_MESSAGE.setRetellingTime.action)
  async addNewToneTime(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('set_retelling_time');
  }

  @Action(ACTIONS_BOT_MESSAGE.setPrompt.action)
  async setPrompt(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('set_retelling_prompt');
  }

  @Action(ACTIONS_BOT_MESSAGE.getMessageToday.action)
  async connectThisChat(@Ctx() ctx: Context) {
    await getMessagesToday(ctx, this.serviceMessage, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.getRetellingMessages.action)
  async getRetellingMessages(@Ctx() ctx: Context) {
    await getRetellingMessages(ctx, this.serviceMessageAi, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.getMemoryStorage.action)
  async getMemoryStorage(@Ctx() ctx: Context) {
    await getSizeMemory(ctx, this.serviceMessage, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.getTimeRetellingMessage.action)
  async getTimeRetellingMessage(@Ctx() ctx: Context) {
    await getTimeRetellingMessage(ctx, this.serviceMessageSettings, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.getPrompt.action)
  async getPrompt(@Ctx() ctx: Context) {
    await getPrompt(ctx, this.serviceMessageSettings, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.commands.action)
  async getMessageCommands(@Ctx() ctx: Context) {
    await getCommands(ctx, 'action', COMMANDS_BOT_MESSAGE, ACTIONS_BOT_MESSAGE);
  }

  @Action(ACTIONS_BOT_MESSAGE.clearMessage.action)
  async removeAllMemory(@Ctx() ctx: Context) {
    await removeAllMemory(ctx, this.serviceMessage, 'action');
  }

  @Action(ACTIONS_BOT_MESSAGE.removePrompt.action)
  async removePrompt(@Ctx() ctx: Context) {
    await removePrompt(ctx, this.serviceMessageSettings, 'action');
  }
}
