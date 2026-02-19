import {
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const COMMANDS_BOT_AI = {
  addNewModel: {
    command: 'add_new_ai_model',
    desc: 'Добавить новую модель',
  },
  getListModels: {
    command: 'get_list_ai_models',
    desc: 'Список моделей',
  },
  getLastUsedModels: {
    command: 'get_last_used_models',
    desc: 'Последняя использованная модель',
  },
  clearAddedModels: {
    command: 'clear_added_ai_models',
    desc: 'Удалить модели',
  },
} satisfies TListDescUpdate<IDescCommandUpdate>;
