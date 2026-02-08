import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {EventMessageRetellingGenerated} from '@tb-modules/message/events/generatedRetelling.event';
import {HandleGenerateRetellingMessages} from './handlers/generateRetellingMessages.handler';

@Injectable()
export class ListenerBotMessages {
  constructor(
    private readonly handleGenerateRetellingMessages: HandleGenerateRetellingMessages,
  ) {}

  @OnEvent(EventMessageRetellingGenerated.eventName)
  async handleToneUpdatedByTime(payload: EventMessageRetellingGenerated) {
    await this.handleGenerateRetellingMessages.execute(payload);
  }
}
