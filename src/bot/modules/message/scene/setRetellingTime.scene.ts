import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {parseExceptionMessage} from '@tb-common/utils/parse/parseExceptionMesage.util';
import {Action, Ctx, Wizard, WizardStep} from 'nestjs-telegraf';
import {Scenes} from 'telegraf';
import {ASceneBot} from '@tb-common/interfaces/sceneBot/sceneBot.abscract';
import {buildCancelScene} from '@tb-bot/utils/scene/buildCancelScene.util';
import {HANDLERS_BOT_MESSAGE} from '../constant/handlers.const';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';

@Wizard('set_retelling_time')
export class SceneRetellingTime extends ASceneBot {
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
      'Изменение времени генерации пересказа сообщений отменено.',
    );
  }

  @WizardStep(1)
  async ask(@Ctx() ctx: Scenes.WizardContext) {
    await this.cancelScene(
      ctx,
      'Введите время генерации пересказа сообщений в формате ЧЧ:ММ (например, 14:30)',
    );

    ctx.wizard.next();
  }

  @WizardStep(2)
  async askTime(@Ctx() ctx: Scenes.WizardContext) {
    const time = getTextMessage(ctx, true).trim();

    if (!time) {
      await this.cancelScene(
        ctx,
        'Время не может быть пустым, попробуйте ещё раз.',
      );
      return;
    }

    try {
      await this.serviceMessageSettings.setTimeRetelling(time);
    } catch (error) {
      const resError = parseExceptionMessage(error);

      await ctx.reply(resError);
      return;
    }

    await ctx.reply(
      `Время генерации пересказа сообщений установлено на ${time}`,
    );
    await ctx.scene.leave();
  }
}
