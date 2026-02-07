import { ListenerBotMessages } from "./listener/botMessages.listener";
import { HandleGenerateRetellingMessages } from "./listener/handlers/generateRetellingMessages.handler";
import { SceneRetellingTime } from "./scene/setRetellingTime.scene";
import { ActionsBotMessage } from "./updates/action.updates";
import { CommandsBotMessage } from "./updates/commands.update";
import { MessageBotMessage } from "./updates/on.update";

export const SCHEME_TONE_MESSAGE = {
    updates: [
        ActionsBotMessage,
        CommandsBotMessage,
        MessageBotMessage,
    ],
    scene: [
        SceneRetellingTime,
    ],
    handlers: [
        HandleGenerateRetellingMessages,
    ],
    listener: [
        ListenerBotMessages
    ]
}