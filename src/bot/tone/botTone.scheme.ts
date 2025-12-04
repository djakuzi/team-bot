import { ActionsBotTone } from "./updates/action.updates";
import { CommandsBotTone } from "./updates/commands.update";
import { SceneAddToneMode } from "./scene/addToneMode.scene";
import { SceneSetToneTime } from "./scene/setToneTime.scene";
import { ListenerBotTone } from "./listener/botTone.listener";
import { HandlerToneUpdatedByTime } from "./listener/handlers/toneUpdatedByTime.handler";
import { OnBotTone } from "./updates/handlers.update";

export const SCHEME_TONE_BOT = {
	updates: [
		CommandsBotTone,
		ActionsBotTone,
		OnBotTone
	],
	Scene: [
		SceneAddToneMode,
		SceneSetToneTime,
	],
	handlers: [
		HandlerToneUpdatedByTime,
	],
	listner: [
		ListenerBotTone
	]
}