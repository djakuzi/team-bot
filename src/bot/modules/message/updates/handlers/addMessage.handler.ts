import { getFrom } from '@tb-common/utils/bot/getFrom.util';
import { getTextMessage } from '@tb-common/utils/bot/getTextMessage.util';
import { TypeMessage } from '@tb-core/prisma/repo/message/type/message.type';
import { ServiceMessage } from '@tb-modules/message/services/message.service';
import { Context } from 'telegraf';

export async function OnAddMessage(
	ctx: Context,
	serviceMessage: ServiceMessage,
) {
		const text = getTextMessage(ctx, true);
		const from = getFrom(ctx);
		if (!text) return;

		const message: TypeMessage = {
			text: text,
			userId: from.id,
			firstName: from.first_name,
			username: from.username ?? 'Неизвестный',
			timestamp: new Date(), 
		}

		await serviceMessage.addMessage(message);
}
