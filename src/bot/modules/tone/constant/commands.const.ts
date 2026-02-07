export const COMMANDS_BOT_TONE = {
	add_new_tone_mode: {
		command: 'add_new_tone_mode',
		desc: 'Добавить новый тон',
	},
	set_tone_time: {
		command: 'set_tone_time',
		desc: 'Установить время обновления тона общения. Использование: /set_tone_time ЧЧ:ММ',
	},
	set_tone_mode: {
		command: 'set_tone_mode',
		desc: 'Установить режим тона по имени. Использование: /set_tone_mode имя_тона',
	},
	set_tone_random: {
		command: 'set_tone_random',
		desc: 'Установить случайный режим тона',
	},
	get_current_tone_mode: {
		command: 'get_current_tone_mode',
		desc: 'Получить текущий режим тона',
	},
	get_info_tone_mode: {
		command: 'get_info_tone_mode',
		desc: 'Получить описание режима тона. Использование: /get_info_tone_mode имя_тона',
	},
	get_tone_time: {
		command: 'get_tone_time',
		desc: 'Получить время обновления тона',
	},
	get_tone_list: {
		command: 'get_tone_list',
		desc: 'Получить список доступных режимов тона общения',
	},
};
