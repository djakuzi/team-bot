import {Update, Command, Ctx, Action} from 'nestjs-telegraf';
import {Context} from 'telegraf';
import {showMenu} from './action/showMenu.action';
import {ACTIONS_BOT_MENU} from '../constant/actions.const';
import {COMMANDS_BOT_MENU} from '../constant/commands.const';

@Update()
export class ActionsBotMenu {
  constructor() {}

  @Action(ACTIONS_BOT_MENU.back.action)
  @Command(COMMANDS_BOT_MENU.menu.command)
  async showMenu(@Ctx() ctx: Context) {
    await showMenu(ctx);
  }

  @Action(ACTIONS_BOT_MENU.exit.action)
  async exitMenu(@Ctx() ctx: Context) {
    await ctx.deleteMessage();
  }
}
