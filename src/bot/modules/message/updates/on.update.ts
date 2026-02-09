import {ServiceMessage} from '@tb-modules/message/services/message.service';
import {Ctx, On, Update} from 'nestjs-telegraf';
import {Context} from 'telegraf';
import {OnAddMessage} from './handlers/addMessage.handler';

@Update()
export class MessageBotMessage {
  constructor(private readonly serviceMessage: ServiceMessage) {}

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    await OnAddMessage(ctx, this.serviceMessage);
  }
}
