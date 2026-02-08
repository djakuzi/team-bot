import {Command, Ctx} from 'nestjs-telegraf';
import {COMMANDS_BOT_PANEL} from '../constant/commands.const';
import {getDataPanel} from './action/getDataPanel.action';
import {getLinkPanel} from './action/getLinkPanel.action';
import {Context} from 'telegraf';

export class CommandsBotPanel {
  constructor() {}

  @Command(COMMANDS_BOT_PANEL.getLinkPanel.command)
  async getDataPanel(@Ctx() ctx: Context) {
    await getDataPanel(ctx, 'command');
  }

  @Command(COMMANDS_BOT_PANEL.getLinkPanel.command)
  async getLinkPanel(@Ctx() ctx: Context) {
    await getLinkPanel(ctx, 'command');
  }
}
