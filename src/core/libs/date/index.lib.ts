import {LocaleDate} from './methods/localeDate.methods';

export class LibDate {
  static toLocaleDate(
    ...args: Parameters<typeof LocaleDate.toLocaleDate>
  ): string {
    return LocaleDate.toLocaleDate(...args);
  }
}
