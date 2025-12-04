import { TransformFromArray } from "./methods/fromArray";

export class TransformMarkdown {
	static fromArray(...args: Parameters<typeof TransformFromArray.build>) {
		return TransformFromArray.build(...args);
	}
}