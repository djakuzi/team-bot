import {SceneAddNewModel} from './scene/addNewModel.scene';
import {ActionsBotAi} from './updates/action.updates';
import {CommandsBotAi} from './updates/commands.update';

export const SCHEME_AI = {
  updates: [ActionsBotAi, CommandsBotAi],
  scene: [SceneAddNewModel],
};
