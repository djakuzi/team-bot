import { Context } from "telegraf";
import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";

export type typeUpdateBot = Context<Update.CallbackQueryUpdate<CallbackQuery>> & Omit<any, keyof Context<Update>> & {
    match: RegExpExecArray;
}