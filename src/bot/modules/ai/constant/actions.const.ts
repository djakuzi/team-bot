import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_AI = {
  menu: {
    action: 'menu_ai',
    desc: 'Настройки AI',
  },
  addNewModel: {
    action: 'add_new_ai_model',
    desc: 'Добавить новую модель',
  },
  getListModels: {
    action: 'get_list_ai_models',
    desc: 'Список моделей',
  },
  getLastUsedModels: {
    action: 'get_last_used_models',
    desc: 'Последняя использованная модель',
  },
  clearAddedModels: {
    action: 'clear_added_ai_models',
    desc: 'Удалить модели',
  },
  commands: {
    action: 'get_ai_commands',
    desc: '📝 Команды',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
