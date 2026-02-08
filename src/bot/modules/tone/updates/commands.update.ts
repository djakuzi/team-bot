import {Update, Command, Ctx} from 'nestjs-telegraf';
import {Context, Scenes} from 'telegraf';
import {ServiceTone} from '../../../../modules/tone/services/tone.service';
import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {ServiceToneSettings} from '../../../../modules/tone/services/toneSettings.service';
import {COMMANDS_BOT_TONE} from '../constant/commands.const';
import {getToneTime} from './action/getToneTime.action';
import {getCurrentToneMode} from './action/getCurrentToneMode.action';
import {setToneRandom} from './action/setToneRandom.action';
import {getCommands} from '@tb-bot/updates/action/getCommands.action';
import {ACTIONS_BOT_TONE} from '../constant/actions.const';

@Update()
export class CommandsBotTone {
  constructor(
    private readonly serviceTone: ServiceTone,
    private readonly serviceToneSettings: ServiceToneSettings,
  ) {}

  @Command(COMMANDS_BOT_TONE.add_new_tone_mode.command)
  async addToneTime(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('add_new_tone_mode');
  }

  @Command(COMMANDS_BOT_TONE.set_tone_time.command)
  async setToneTime(@Ctx() ctx: Context) {
    const message = getTextMessage(ctx, true);
    const [, time] = message.split(' ');

    await this.serviceToneSettings.setUpdatedToneTime(time);

    await ctx.reply(`Время обновления тона общения установлено на ${time}`);
  }

  @Command(COMMANDS_BOT_TONE.set_tone_mode.command)
  async setToneMode(@Ctx() ctx: Context) {
    const message = getTextMessage(ctx, true);
    const [, name] = message.split(' ');

    await this.serviceToneSettings.setToneModeByName(name);
    await ctx.reply(`Режим тона установлен: ${name}`);
  }

  @Command(COMMANDS_BOT_TONE.set_tone_random.command)
  async randomTone(@Ctx() ctx: Context) {
    await setToneRandom(
      ctx,
      this.serviceTone,
      this.serviceToneSettings,
      'command',
    );
  }

  @Command(COMMANDS_BOT_TONE.get_current_tone_mode.command)
  async getCurrentToneMode(@Ctx() ctx: Context) {
    await getCurrentToneMode(ctx, this.serviceToneSettings, 'command');
  }

  @Command(COMMANDS_BOT_TONE.get_info_tone_mode.command)
  async getToneMode(@Ctx() ctx: Context) {
    ctx.reply('Не реализовано');
  }

  @Command(COMMANDS_BOT_TONE.get_tone_time.command)
  async getToneTime(@Ctx() ctx: Context) {
    await getToneTime(ctx, this.serviceToneSettings, 'command');
  }

  @Command(COMMANDS_BOT_TONE.get_tone_list.command)
  async listTone(@Ctx() ctx: Context) {
    await getCommands(ctx, 'action', COMMANDS_BOT_TONE, ACTIONS_BOT_TONE);
  }
}
