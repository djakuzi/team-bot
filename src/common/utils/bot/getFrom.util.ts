import { Context } from 'telegraf';

export function getFrom(ctx: Context) {
	if (!('from' in ctx) || !ctx.from) {
		throw new Error('The ctx don`t have form ');
	}

	return ctx.from;
}