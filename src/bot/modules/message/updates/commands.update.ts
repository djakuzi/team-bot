import {Command, Ctx, Update} from 'nestjs-telegraf';
import {Context, Scenes} from 'telegraf';
import {COMMANDS_BOT_MESSAGE} from '../constant/commands.const';
import {getMessagesToday} from './action/getMessagesToday.action';
import {ServiceMessage} from '@tb-modules/message/services/message.service';
import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';
import {getRetellingMessages} from './action/getRetellingMessages.action';
import {ServiceMessageAi} from '@tb-modules/message/services/messageAi.service';
import {getPromt} from './action/getPromt.action';
import {removePromt} from './action/removePromt.action';
import {getSizeMemory} from './action/getSizeMemory.action';
import {removeAllMemory} from './action/removeAllMemory.action';

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

  @Command(COMMANDS_BOT_MESSAGE.getPromt.command)
  async getPromt(@Ctx() ctx: Context) {
    await getPromt(ctx, this.serviceMessageSettings, 'command');
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

  @Command(COMMANDS_BOT_MESSAGE.setPromt.command)
  async setPromt(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('set_retelling_promt');
  }

  @Command(COMMANDS_BOT_MESSAGE.removePromt.command)
  async removePromt(@Ctx() ctx: Context) {
    await removePromt(ctx, this.serviceMessageSettings, 'command');
  }

  @Command(COMMANDS_BOT_MESSAGE.clear.command)
  async removeAllMemory(@Ctx() ctx: Context) {
    await removeAllMemory(ctx, this.serviceMessage, 'command');
  }
}
