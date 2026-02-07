import { getTextMessage } from '@tb-common/utils/bot/getTextMessage.util';
import { parseExceptionMessage } from '@tb-common/utils/parse/parseExceptionMesage.util';
import { ServiceToneSettings } from '@tb-modules/tone/services/toneSettings.service';
import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { HANDLERS_BOT_TONE } from '../constant/handlers.const';
import { ASceneBot } from '@tb-common/interfaces/sceneBot/sceneBot.abscract';
import { buildCancelScene } from '@tb-common/utils/bot/buildCancelScene.util';

@Wizard('set_updated_tone_time')
export class SceneSetToneTime extends ASceneBot {
    cancelScene = async (ctx: Scenes.WizardContext, message: string) => {
        await buildCancelScene(ctx, message, HANDLERS_BOT_TONE.cancelChangeTimeTone);
    }

    constructor(
        private readonly serviceToneSettings: ServiceToneSettings,
    ) {
        super();
    }

    @Action(HANDLERS_BOT_TONE.cancelChangeTimeTone.name)
    async onCancel(@Ctx() ctx: Scenes.WizardContext) {
        await super.onCancel(ctx, 'Изменение времени обновления тона отменено.')
    }

    @WizardStep(1)
    async ask(@Ctx() ctx: Scenes.WizardContext) {
        await this.cancelScene(ctx, 'Введите время обновления тона в формате ЧЧ:ММ (например, 14:30)');

        ctx.wizard.next();
    }

    @WizardStep(2)
    async askTime(@Ctx() ctx: Scenes.WizardContext) {
        const time = getTextMessage(ctx, true).trim();

        if (!time) {
            await this.cancelScene(ctx, 'Время не может быть пустым, попробуйте ещё раз.');
            return;
        }

        try {
            await this.serviceToneSettings.setUpdatedToneTime(time);
        } catch (error) {
            const resError = parseExceptionMessage(error);

            await ctx.reply(resError);
            return;
        }

        await ctx.reply(`Время обновления тона общения установлено на ${time}`);
        await ctx.scene.leave();
    }
}
