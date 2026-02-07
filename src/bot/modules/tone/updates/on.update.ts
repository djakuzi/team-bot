import { getCallbackQuery } from '@tb-common/utils/bot/getCallbackQuery.util';
import { On, Update } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { HANDLERS_BOT_TONE } from '../constant/handlers.const';
import { cancelAddTone } from './handlers/cancelAddTone.handler';
import { cancelChangeTimeTone } from './handlers/cancelChangeTimeUpdatedTone.handler';

@Update()
export class OnBotTone {
    @On('callback_query')
    async onCancel(ctx: Scenes.WizardContext, next: () => Promise<void>) {
        const data = getCallbackQuery<string>(ctx, 'data');
        if (data === HANDLERS_BOT_TONE.cancelAddTone.name) {
            await cancelAddTone(ctx);
            return;
        }

        if (data === HANDLERS_BOT_TONE.cancelChangeTimeTone.name) {
            await cancelChangeTimeTone(ctx);
            return;
        }

        await next();
    }
}
