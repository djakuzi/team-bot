import { getTextMessage } from '@tb-common/utils/bot/getTextMessage.util';
import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { buildCancelScene } from '@tb-common/utils/bot/buildCancelScene.util';
import { ASceneBot } from '@tb-common/interfaces/sceneBot/sceneBot.abscract';
import { HANDLERS_BOT_REMINDER } from '../constant/handlers.const';
import { ServiceReminder } from '@tb-modules/reminder/services/reminder.service';
import { Prisma } from '@prisma/client';
import { getCallbackQuery } from '@tb-common/utils/bot/getCallbackQuery.util';
import { parseExceptionMessage } from '@tb-common/utils/parse/parseExceptionMesage.util';
import { LibTime } from '@tb-core/libs/time/index.lib';
import { LibDate } from '@tb-core/libs/date/index.lib';
import { ServiceBotCalendar } from '@tb-bot/services/calendar.service';

interface IStateSceneAddToneMode extends Prisma.ReminderCreateInput {
    date?: string;
    time?: string;
}

@Wizard('add_new_reminder')
export class SceneAddReminder extends ASceneBot {
    async cancelScene(ctx: Scenes.WizardContext, message: string) {
        await buildCancelScene(ctx, message, HANDLERS_BOT_REMINDER.cancelAddReminder);
    }

    constructor(
        private readonly serviceReminder: ServiceReminder,
        private readonly serviceBotCalendar: ServiceBotCalendar,
    ) {
        super();
    }

    @Action(HANDLERS_BOT_REMINDER.cancelAddReminder.name)
    async onCancel(@Ctx() ctx: Scenes.WizardContext) {
        await super.onCancel(ctx, 'Добавление напоминания отменено.')
    }

    @Action(/calendar-telegram-date-/)
    async onSelectDate(@Ctx() ctx: Scenes.WizardContext) {
        const data = getCallbackQuery<string>(ctx, 'data');
        const rawDate = data?.replace('calendar-telegram-date-', '');

        if (!rawDate) return;

        const state = ctx.scene.state as IStateSceneAddToneMode;
        state.date = rawDate;

        await ctx.answerCbQuery();

        await ctx.reply('Введите время напоминания в формате ЧЧ:ММ (например, 14:30).');
        ctx.wizard.next();
    }

    @WizardStep(1)
    async askName(@Ctx() ctx: Scenes.WizardContext) {
        await this.cancelScene(ctx, 'Введите название напоминания');

        ctx.wizard.next();
    }

    @WizardStep(2)
    async askDesc(@Ctx() ctx: Scenes.WizardContext) {
        const message = getTextMessage(ctx, true)?.trim();

        if (!message) {
            await this.cancelScene(ctx, 'Название напоминания не может быть пустым.');
            return;
        }

        const state = ctx.scene.state as IStateSceneAddToneMode;
        state.name = message;

        await ctx.reply('О чем нужно будет напомнить?');
        ctx.wizard.next();
    }

    @WizardStep(3)
    async askDate(@Ctx() ctx: Scenes.WizardContext) {
        const message = getTextMessage(ctx, true)?.trim();

        if (!message) {
            await this.cancelScene(ctx, 'Описание напоминания не может быть пустым.');
            return;
        }

        const state = ctx.scene.state as IStateSceneAddToneMode;
        state.desc = message;

        await ctx.reply(
            '📅 Выберите дату напоминания:',
            this.serviceBotCalendar.getCalendar(),
        );
    }

    @WizardStep(4)
    async askRepeat(@Ctx() ctx: Scenes.WizardContext) {
        try {
            const time = getTextMessage(ctx, true).trim();
            LibTime.validate(time, 'hh:mm', true);

            if (!time) {
                await this.cancelScene(ctx, 'Введите время напоминания в формате ЧЧ:ММ (например, 14:30)');
                return;
            }

            const state = ctx.scene.state as IStateSceneAddToneMode;
            state.time = time;

            await ctx.reply('Через какое количество дней нужно снова напоминать об этом?. Введите число дней или 0 если не нужно повторять.');
            ctx.wizard.next();
        } catch (error) {
            const resError = parseExceptionMessage(error);

            await this.cancelScene(ctx, resError);
            return;
        }
    }

    @WizardStep(5)
    async finish(@Ctx() ctx: Scenes.WizardContext) {
        const message = getTextMessage(ctx, true)?.trim();

        if (typeof +message != 'number') {
            await this.cancelScene(ctx, 'Введите корректное число дней для повторения.');
            return;
        }

        const state = ctx.scene.state as IStateSceneAddToneMode;
        state.reapetRangeDays = +message;
        state.repeat = true;
        state.executedAt = new Date(`${state.date}T${state.time}:00`);

        await this.serviceReminder.addReminder({
            name: state.name,
            desc: state.desc,
            executedAt: state.executedAt,
            repeat: state.repeat,
            reapetRangeDays: state.reapetRangeDays
        })

        await ctx.reply(`
            Название напоминания: ${state.name}. 
            \nОписание: ${state.desc}.
            \nДата напоминания: ${LibDate.toLocaleDate(state.executedAt, 'ru-Ru')}.
            ${state.reapetRangeDays ? `\nС повторением каждые ${state.reapetRangeDays} дней.` : ''}`,
        );

        await ctx.scene.leave();
    }
}
