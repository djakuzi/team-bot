import {Command, Ctx, Update} from 'nestjs-telegraf';
import {Context, Scenes} from 'telegraf';
import {COMMANDS_BOT_MESSAGE} from '../constant/commands.const';
import {getMessagesToday} from './action/getMessagesToday.action';
import {ServiceMessage} from '@tb-modules/message/services/message.service';
import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';
import {getRetellingMessages} from './action/getRetellingMessages.action';
import {ServiceMessageAi} from '@tb-modules/message/services/messageAi.service';
import {getSizeMemory} from './action/getSizeMemory.action';
import {removeAllMemory} from './action/removeAllMemory.action';
import {removePrompt} from './action/removePromt.action';
import {getPrompt} from './action/getPromt.action';

@Update()
export class CommandsBotMessage {
  constructor(
    private readonly serviceMessage: ServiceMessage,
    private readonly serviceMessageAi: ServiceMessageAi,
    private readonly serviceMessageSettings: ServiceMessageSettings,
  ) {}

  @Command(COMMANDS_BOT_MESSAGE.getMessageToday.command)
  async connectThisChat(@Ctx() ctx: Context) {
    await getMessagesToday(ctx, this.serviceMessage, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.getRetellingMessages.command)
  async getRetellingMessages(@Ctx() ctx: Context) {
    await getRetellingMessages(ctx, this.serviceMessageAi, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.getPrompt.command)
  async getPrompt(@Ctx() ctx: Context) {
    await getPrompt(ctx, this.serviceMessageSettings, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.getMemory.command)
  async getMemoryStorage(@Ctx() ctx: Context) {
    await getSizeMemory(ctx, this.serviceMessage, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.setRetellingTime.command)
  async addNewToneTime(@Ctx() ctx: Context) {
    const message = getTextMessage(ctx, true);
    const [, time] = message.split(' ');

    await this.serviceMessageSettings.setTimeRetelling(time);

    await ctx.reply(
      `Время генерации пересказа сообщений установлено на ${time}`,
    );
  }

  @Command(COMMANDS_BOT_MESSAGE.setPrompt.command)
  async setPrompt(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('set_retelling_prompt');
  }

  @Command(COMMANDS_BOT_MESSAGE.removePrompt.command)
  async removePrompt(@Ctx() ctx: Context) {
    await removePrompt(ctx, this.serviceMessageSettings, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.clear.command)
  async removeAllMemory(@Ctx() ctx: Context) {
    await removeAllMemory(ctx, this.serviceMessage, 'command');
  }
}
