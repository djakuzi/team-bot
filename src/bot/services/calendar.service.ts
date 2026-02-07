// src/common/services/calendar.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { typeUpdateBot } from '@tb-common/types/bot/context.type';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

// Не самое лучшее решение, но библиотека telegraf-calendar-telegram не имеет корректных типов для TypeScript.
// Поэтому создаём отдельный файл с типами и используем 'as' при импорте библиотеки.

import * as CalendarLib from 'telegraf-calendar-telegram';

@Injectable()
export class ServiceBotCalendar implements OnModuleInit {
    private calendar: InstanceType<typeof CalendarLib.Calendar>;

    constructor(
        @InjectBot() private readonly bot: Telegraf<any>
    ) { }

    onModuleInit() {
        const Calendar = CalendarLib as unknown as typeof import('telegraf-calendar-telegram').Calendar;

        this.calendar = new Calendar(this.bot, {
            startWeekDay: 1,
            weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            monthNames: [
                'Январь', 'Февраль', 'Март',
                'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь',
                'Октябрь', 'Ноябрь', 'Декабрь',
            ],
            minDate: new Date(),
        });

        this.bot.action(/calendar-telegram-prev-[\d-]+/, (ctx) => this.actionPrevOrDirection(ctx, 'prev'));
        this.bot.action(/calendar-telegram-next-[\d-]+/, (ctx) => this.actionPrevOrDirection(ctx, 'next'));
    }

    getCalendar(date?: Date) {
        return this.calendar.getCalendar(date);
    }

    private async actionPrevOrDirection(ctx: typeUpdateBot, direction: 'prev' | 'next') {
        const dateString = ctx.match[0].replace(`calendar-telegram-${direction}-`, '');
        const date = new Date(dateString);
        date.setMonth(direction === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);
        const text = 'Выберите дату:';

        const newCalendarMarkup = this.getCalendar(date);

        await ctx.answerCbQuery();
        await ctx.editMessageText(text, newCalendarMarkup);
    }
}
