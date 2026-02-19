import {Command, Ctx, Update} from 'nestjs-telegraf';
import {Context, Scenes} from 'telegraf';
import {COMMANDS_BOT_AI} from '../constant/commands.const';
import {clearAddedModels} from './action/clearAddedModels.action';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';
import {getLastUsedModels} from './action/getLastUsedModels.action';
import {getListModels} from './action/getListModels.action';

@Update()
export class CommandsBotAi {
  constructor(private readonly serviceAi: ServiceAi) {}

  @Command(COMMANDS_BOT_AI.addNewModel.command)
  async addNewModel(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('add_new_ai_model');
  }

  @Command(COMMANDS_BOT_AI.getLastUsedModels.command)
  async getLastUsedModels(@Ctx() ctx: Context) {
    await getLastUsedModels(ctx, this.serviceAi, 'command');
  }

  @Command(COMMANDS_BOT_AI.getListModels.command)
  async getListModels(@Ctx() ctx: Context) {
    await getListModels(ctx, this.serviceAi, 'command');
  }

  @Command(COMMANDS_BOT_AI.clearAddedModels.command)
  async clearAddedModels(@Ctx() ctx: Context) {
    await clearAddedModels(ctx, this.serviceAi, 'command');
  }
}
