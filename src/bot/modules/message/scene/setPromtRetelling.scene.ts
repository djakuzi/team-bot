import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {parseExceptionMessage} from '@tb-common/utils/parse/parseExceptionMesage.util';
import {Action, Ctx, Wizard, WizardStep} from 'nestjs-telegraf';
import {Scenes} from 'telegraf';
import {ASceneBot} from '@tb-common/interfaces/sceneBot/sceneBot.abscract';
import {buildCancelScene} from '@tb-bot/utils/scene/buildCancelScene.util';
import {HANDLERS_BOT_MESSAGE} from '../constant/handlers.const';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';

@Wizard('set_retelling_promt')
export class SceneRetellingPromt extends ASceneBot {
  cancelScene = async (ctx: Scenes.WizardContext, message: string) => {
    await buildCancelScene(
      ctx,
      message,
      HANDLERS_BOT_MESSAGE.cancelChangeTimeRetelling,
    );
  };

  constructor(private readonly serviceMessageSettings: ServiceMessageSettings) {
    super();
  }

  @Action(HANDLERS_BOT_MESSAGE.cancelChangeTimeRetelling.name)
  async onCancel(@Ctx() ctx: Scenes.WizardContext) {
    await super.onCancel(
      ctx,
      HANDLERS_BOT_MESSAGE.cancelChangeTimeRetelling.desc,
    );
  }

  @WizardStep(1)
  async ask(@Ctx() ctx: Scenes.WizardContext) {
    await this.cancelScene(ctx, 'Введите промт');

    ctx.wizard.next();
  }

  @WizardStep(2)
  async askTime(@Ctx() ctx: Scenes.WizardContext) {
    const text = getTextMessage(ctx, true).trim();

    if (!text) {
      await this.cancelScene(
        ctx,
        'Промт не может быть пустым. Попробуйте еще раз',
      );
      return;
    }

    try {
      await this.serviceMessageSettings.setPromt(text);
    } catch (error) {
      const resError = parseExceptionMessage(error);

      await ctx.reply(resError);
      return;
    }

    await ctx.reply(`Промт для анализа сообщений обновлен`);
    await ctx.scene.leave();
  }
}
