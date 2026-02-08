import {getTextMessage} from '@tb-bot/utils/context/getTextMessage.util';
import {ServiceTone} from '@tb-modules/tone/services/tone.service';
import {Action, Ctx, Wizard, WizardStep} from 'nestjs-telegraf';
import {Scenes} from 'telegraf';
import {HANDLERS_BOT_TONE} from '../constant/handlers.const';
import {buildCancelScene} from '@tb-bot/utils/scene/buildCancelScene.util';
import {ASceneBot} from '@tb-common/interfaces/sceneBot/sceneBot.abscract';

interface IStateSceneAddToneMode {
  name: string;
  desc: string;
}

@Wizard('add_new_tone_mode')
export class SceneAddToneMode extends ASceneBot {
  cancelScene = async (ctx: Scenes.WizardContext, message: string) => {
    await buildCancelScene(ctx, message, HANDLERS_BOT_TONE.cancelAddTone);
  };

  constructor(private readonly serviceTone: ServiceTone) {
    super();
  }

  @Action(HANDLERS_BOT_TONE.cancelAddTone.name)
  async onCancel(@Ctx() ctx: Scenes.WizardContext) {
    await super.onCancel(ctx, 'Добавление тона отменено.');
  }

  @WizardStep(1)
  async askName(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.reply('Название тона');

    ctx.wizard.next();
  }

  @WizardStep(2)
  async askDesc(@Ctx() ctx: Scenes.WizardContext) {
    const message = getTextMessage(ctx, true)?.trim();

    if (!message) {
      await this.cancelScene(
        ctx,
        'Название тона не может быть пустым, попробуйте ещё раз.',
      );
      return;
    }

    const state = ctx.scene.state as IStateSceneAddToneMode;
    state.name = message;

    await ctx.reply('Теперь введите описание тона');
    ctx.wizard.next();
  }

  @WizardStep(3)
  async finish(@Ctx() ctx: Scenes.WizardContext) {
    const desc = getTextMessage(ctx, true)?.trim();

    if (!desc) {
      await this.cancelScene(
        ctx,
        'Описание тона не может быть пустым, попробуйте ещё раз.',
      );
      return;
    }

    const {name} = ctx.scene.state as IStateSceneAddToneMode;

    if (!name) {
      await ctx.reply(
        'Ошибка: название не найдено. Пожалуйста, начните заново.',
      );
      await ctx.scene.leave();
      return;
    }

    await this.serviceTone.addToneMode({name, desc});

    await ctx.reply(`Готово: ${name}, ${desc}`);
    await ctx.scene.leave();
  }
}
