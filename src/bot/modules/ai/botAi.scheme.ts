import {SceneAddNewModel} from './scene/addNewModel.scene';
import {ActionsBotMessage} from './updates/action.updates';
import {CommandsBotMessage} from './updates/commands.update';

export const SCHEME_AI = {
  updates: [ActionsBotMessage, CommandsBotMessage],
  scene: [SceneAddNewModel],
};
