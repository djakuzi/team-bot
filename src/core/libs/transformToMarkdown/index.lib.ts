import { escapeMarkdownV2 } from "./helpers/escapeMarkdownV2.helper";
import { TransformFromArray } from "./methods/fromArray";

export class TransformMarkdown {
	static fromArray(...args: Parameters<typeof TransformFromArray.build>) {
		return TransformFromArray.build(...args);
	}

	static parseEscapeMarkdownV2(text: string) {
		return escapeMarkdownV2(text)
	}
}