import {escapeMarkdownV2} from './helpers/escapeMarkdownV2.helper';
import {TransformFromArray} from './methods/fromArray';

export class TransformMarkdown {
  static fromArray<T extends Record<keyof T, unknown>>(
    ...args: Parameters<typeof TransformFromArray.build<T>>
  ) {
    return TransformFromArray.build<T>(...args);
  }

  static parseEscapeMarkdownV2(text: string) {
    return escapeMarkdownV2(text);
  }
}
