import { changeKeyInObjectFromArray } from "../helpers/changeKeyInObject.helper";
import { escapeMarkdownV2 } from "../helpers/escapeMarkdownV2.helper";

type TypeKeyMarkdown = 'title' | 'description' | 'content' | 'code';

type TypeChangeKey<T> = {
	[K in TypeKeyMarkdown]?: keyof T;
};

export class TransformFromArray {

	public static transformToMarkdown(
		array: Record<TypeKeyMarkdown, string>[], 
		include: TypeKeyMarkdown[],
		title?: string,
	) {
		let text = `${title ? escapeMarkdownV2(title) + '\n\n' : ''}`;

		const isDesc  =	 include.includes('description');
		const isTitle =	 include.includes('title');

		array.forEach((item) => {
			
			include.forEach((key) => {
				if (item[key]) {
					const value = escapeMarkdownV2(item[key]);

					if (key === 'title') {
						text += isDesc ? `*${value}* \\- ` : `*${value}*\n`;
					} else if (key === 'description') {
						text += `${value}\n\n`;
					}
				}
			})
		})

		return text
	}

	static build<A extends Record<string, unknown>>(
		array: A[],
		include: TypeKeyMarkdown[],
		changeKey: TypeChangeKey<A> | null = null,
		title?: string,
	): string {
		let resArray: Record<TypeKeyMarkdown, string>[] = [];

		if (changeKey) {
			resArray = changeKeyInObjectFromArray<A, TypeKeyMarkdown>(
				array,
				changeKey,
				include
			);
		} else {
			resArray = array as unknown as Record<TypeKeyMarkdown, string>[];
		}

		return this.transformToMarkdown(resArray, include, title);
	}
}