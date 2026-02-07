declare module 'telegraf-calendar-telegram' {
    import { Telegraf, Context } from 'telegraf';
    import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

    export interface CalendarOptions {
        startWeekDay?: number;
        weekDayNames?: string[];
        monthNames?: string[];
        minDate?: Date;
        maxDate?: Date;
    }

    export type DateSelectedHandler = (
        ctx: Context,
        date: string, // библиотека передаёт строку YYYY-MM-DD
    ) => void | Promise<void>;

    export class Calendar {
        constructor(
            bot: Telegraf<Context>,
            options?: CalendarOptions,
        );

        /**
         * Return inline calendar markup
         */
        getCalendar(date?: Date): {
            reply_markup: InlineKeyboardMarkup;
        };

        /**
         * Register date selection handlers
         */
        setDateListener(
            onDateSelected: DateSelectedHandler,
        ): void;

        /**
         * Configuration methods (chainable)
         */
        setMinDate(date: Date): this;
        setMaxDate(date: Date): this;
        setWeekDayNames(names: string[]): this;
        setMonthNames(names: string[]): this;
        setStartWeekDay(startDay: number): this;
    }
}
