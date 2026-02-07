type TKeyByListObject<O> = Partial<Record<keyof O, boolean>>;

export function toTextByListObject<O extends Record<string, any>>(
	array: O[],
	keys: TKeyByListObject<O>,
	separationSymbol: string = '\n\n',
): string {
	if (!array || array.length === 0) return '';

	const selectedKeys = (Object.keys(keys) as (keyof O)[]).filter(k => Boolean(keys[k]));

	if (selectedKeys.length === 0) return '';

	const renderValue = (val: any) => {
		if (val === null || val === undefined) return '';
		if (val instanceof Date) return val.toISOString();
		if (typeof val === 'object') {
			try {
				return JSON.stringify(val);
			} catch {
				return String(val);
			}
		}
		return String(val);
	};

	return array
		.map(item =>
			selectedKeys
				.map(key => `${String(key)}: ${renderValue(item[key])}`)
				.join('\n')
		)
		.join(separationSymbol);
}
