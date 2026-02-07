import { Scenes } from "telegraf";

export abstract class ASceneBot {
    abstract cancelScene(
        ctx: Scenes.WizardContext,
        message: string
    ): Promise<void>;

    async onCancel(ctx: Scenes.WizardContext, mes?: string): Promise<void> {
        await ctx.answerCbQuery();
        await ctx.reply(mes || 'Операция отменена.');
        await ctx.scene.leave();
    }
}