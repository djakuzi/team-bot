import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {parseExceptionMessage} from '@tb-common/utils/parse/parseExceptionMesage.util';
import {Action, Ctx, Wizard, WizardStep} from 'nestjs-telegraf';
import {Scenes} from 'telegraf';
import {ASceneBot} from '@tb-common/interfaces/sceneBot/sceneBot.abscract';
import {buildCancelScene} from '@tb-bot/utils/scene/buildCancelScene.util';
import {HANDLERS_BOT_AI} from '../constant/handlers.const';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';
import {replyWithParseMode} from '@tb-bot/utils/context/replyWithParseMode.util';

interface IStateAddedAi {
  modelName: string;
}

@Wizard('add_new_ai_model')
export class SceneAddNewModel extends ASceneBot {
  cancelScene = async (ctx: Scenes.WizardContext, message: string) => {
    await buildCancelScene(ctx, message, HANDLERS_BOT_AI.cancelAddNewModel);
  };

  constructor(private readonly serviceAi: ServiceAi) {
    super();
  }

  @Action(HANDLERS_BOT_AI.cancelAddNewModel.name)
  async onCancel(@Ctx() ctx: Scenes.WizardContext) {
    await super.onCancel(ctx, HANDLERS_BOT_AI.cancelAddNewModel.desc);
  }

  @WizardStep(1)
  async ask(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.reply('Введите название новой модели:');
    ctx.wizard.next();
  }

  @WizardStep(2)
  async askPos(@Ctx() ctx: Scenes.WizardContext) {
    const modelName = getTextMessage(ctx, true).trim();

    if (!modelName) {
      await this.cancelScene(
        ctx,
        'Название модели не может быть пустым. Попробуйте еще раз',
      );
      return;
    }

    (ctx.scene.state as IStateAddedAi).modelName = modelName;

    await replyWithParseMode(
      ctx,
      `
        Введите позицию для модели: \n\n- start — в начало списка \n- end — в конец списка
    `,
    );

    ctx.wizard.next();
  }

  @WizardStep(3)
  async addModelStep(@Ctx() ctx: Scenes.WizardContext) {
    const pos = getTextMessage(ctx, true).trim().toLowerCase();

    if (!['start', 'end'].includes(pos)) {
      await this.cancelScene(
        ctx,
        'Позиция указана некорректно. Введите "start" или "end".',
      );
      return;
    }

    const state = ctx.scene.state as IStateAddedAi;

    try {
      this.serviceAi.addModel(state.modelName, pos as 'start' | 'end');
      await ctx.reply(
        `Модель "${state.modelName}" успешно добавлена в список.`,
      );
    } catch (error) {
      const resError = parseExceptionMessage(error);
      await ctx.reply(`Ошибка: ${resError}`);
      return;
    }

    await ctx.scene.leave();
  }
}
