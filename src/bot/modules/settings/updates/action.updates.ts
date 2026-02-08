import {ServiceSettings} from '@tb-modules/settings/services/settings.service';
import {Action, Ctx, Update} from 'nestjs-telegraf';
import {ACTIONS_BOT_SETTINGS} from '../constant/actions.const';
import {Context} from 'telegraf';
import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';
import {connectThisChat} from './action/connectThisChat.action';
import {GServiceCache} from '@tb-core/services/services/cache.service';
import {getSizeCache} from './action/getSizeCache.action';
import {сlearCache} from './action/сlearCache.action';
import {disconnectThisChat} from './action/disconnectThisChat.action';
import {getСonnectedChat} from './action/getСonnectedChat.action';

@Update()
export class ActionsBotSettings {
  constructor(
    private readonly serviceSettings: ServiceSettings,
    private readonly GServiceCache: GServiceCache,
  ) {}

  @Action(ACTIONS_BOT_SETTINGS.menu.action)
  async menuSettings(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_SETTINGS,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_SETTINGS.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });
    await ctx.editMessageText('Настройки', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_SETTINGS.connectThisChat.action)
  async connectThisChat(@Ctx() ctx: Context) {
    await connectThisChat(ctx, this.serviceSettings, 'action');
  }

  @Action(ACTIONS_BOT_SETTINGS.getСonnectedChat.action)
  async getСonnectedChat(@Ctx() ctx: Context) {
    await getСonnectedChat(ctx, this.serviceSettings, 'action');
  }

  @Action(ACTIONS_BOT_SETTINGS.disconnectThisChat.action)
  async disconnectThisChat(@Ctx() ctx: Context) {
    await disconnectThisChat(ctx, this.serviceSettings, 'action');
  }

  @Action(ACTIONS_BOT_SETTINGS.getSizeCache.action)
  async getSizeCache(@Ctx() ctx: Context) {
    await getSizeCache(ctx, this.GServiceCache, 'action');
  }

  @Action(ACTIONS_BOT_SETTINGS.сlearCache.action)
  async сlearCache(@Ctx() ctx: Context) {
    await сlearCache(ctx, this.GServiceCache, 'action');
  }
}
