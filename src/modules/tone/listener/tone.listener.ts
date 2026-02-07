import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventToneTimeChanged } from '../events/toneTimeChanged.event';
import { HandlerToneTimeChanged } from './handlers/toneTimeChanged.handler';

@Injectable()
export class ListenerTone {
    constructor(
        private readonly HandlerToneTimeChanged: HandlerToneTimeChanged,
    ) { }

    @OnEvent(EventToneTimeChanged.eventName)
    async handleChangeTimeUpdatedTone(payload: EventToneTimeChanged) {
        await this.HandlerToneTimeChanged.execute(payload);
    }
}
