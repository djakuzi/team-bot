import { ListenerBotReminder } from "./listener/botReminder.listener";
import { HandlerReminderExecuted } from "./listener/handlers/reminderExecuted.handle";
import { SceneAddReminder } from "./scene/addReminder.scene";
import { ActionsBotReminder } from "./updates/action.updates";
import { CommandsBotReminder } from "./updates/commands.update";

export const SCHEME_TONE_REMINDER = {
    updates: [
        CommandsBotReminder,
        ActionsBotReminder
    ],
    listener: [
        ListenerBotReminder
    ],
    handlers: [
        HandlerReminderExecuted,
    ],
    scene: [
        SceneAddReminder
    ],
    service: [
        // ServiceBotCalendar
    ]
}