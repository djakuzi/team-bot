type TypeChangeKey<A, TK extends string> = {
	[K in TK]?: keyof A;
};

export function changeKeyInObjectFromArray<A extends Record<string, unknown>, TK extends string>(
	array: A[], 
	changeKey: TypeChangeKey<A, TK>,
	include: TK[]
) {
	const resArray = array.map((item) => {
		const result = changeKeyInObject<A, TK>(item, include, changeKey);
		return result;
	});

	return resArray as Record<TK, string>[];
}

export function changeKeyInObject<O extends Record<string, unknown>, TK extends string>(
	object: O,
	include: TK[],
	changeKey: TypeChangeKey<O, TK>,
) {
	const result: Partial<Record<TK, string>> = {};

	for (const markdownKey of include) {
		const originalKey = changeKey[markdownKey];

		if (originalKey && object[originalKey] !== undefined) {
			result[markdownKey] = String(object[originalKey]);
		}
	}

	return {
		...result,
		...object
	};
}