export function toListByObject<T extends Record<string, any>>(obj: T) {
	return Object.entries(obj).map(([key, value]) => ({
		key: key,
		label: String(value),
	}));
}
