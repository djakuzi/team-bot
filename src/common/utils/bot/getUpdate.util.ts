import { Context } from 'telegraf';

export function getUpdate(ctx: Context) {
	if (!('update' in ctx) || !ctx.update) {
		throw new Error('The ctx don`t have form.');
	}

	return ctx.update;
}