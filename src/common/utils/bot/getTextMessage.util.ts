import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

export function getTextMessage(ctx: Context, isEmitStr: boolean = false): string {
	const message = ctx.message;
	const isText = !message || typeof message !== 'object' || !('text' in message) || typeof (message as { text?: unknown }).text !== 'string';

	if (isText && !isEmitStr) {
		throw new Error('Message is not a text message');
	} else if (isText && isEmitStr) {
		return '';
	}

	return (message as Message.TextMessage).text;
}