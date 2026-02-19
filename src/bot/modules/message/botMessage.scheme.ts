import {ListenerBotMessages} from './listener/botMessages.listener';
import {HandleGenerateRetellingMessages} from './listener/handlers/generateRetellingMessages.handler';
import {SceneRetellingPrompt} from './scene/setPromtRetelling.scene';
import {SceneRetellingTime} from './scene/setRetellingTime.scene';
import {ActionsBotMessage} from './updates/action.updates';
import {CommandsBotMessage} from './updates/commands.update';
import {OnBotMessage} from './updates/on.update';

export const SCHEME_MESSAGE = {
  updates: [ActionsBotMessage, CommandsBotMessage, OnBotMessage],
  scene: [SceneRetellingTime, SceneRetellingPrompt],
  handlers: [HandleGenerateRetellingMessages],
  listener: [ListenerBotMessages],
};
