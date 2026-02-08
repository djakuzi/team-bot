import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {EventMessageTimeRetellingChanged} from '../events/timeRetellingChanged.event';
import {HandlerMessageTimeRetellingChanged} from './handlers/changeTimeRetelling.handler';

@Injectable()
export class ListenerMessages {
  constructor(
    private readonly handlerMessageTimeRetellingChanged: HandlerMessageTimeRetellingChanged,
  ) {}

  @OnEvent(EventMessageTimeRetellingChanged.eventName)
  async onTimeRetellingChanged(payload: EventMessageTimeRetellingChanged) {
    await this.handlerMessageTimeRetellingChanged.execute(payload);
  }
}
