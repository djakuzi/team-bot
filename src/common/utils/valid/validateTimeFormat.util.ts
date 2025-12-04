import { ExceptionValidation } from "@tb-common/exception/validation.exception";

type TypeFormatTime = 'hh:mm'

export function validateTimeFormat(time: string, format: TypeFormatTime = 'hh:mm', showError = false): boolean {
	let isValid = false;
	const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

	switch (format) {
		case 'hh:mm':
			isValid = timeRegex.test(time);
			if (showError && !isValid) {
				throw new ExceptionValidation('Неверный формат. Пожалуйста, введите время в формате ЧЧ:ММ');
			}
			break;
	}

	return isValid;
}
