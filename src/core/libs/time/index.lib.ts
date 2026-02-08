import {ValidateTime} from './methods/validate.methods';

export class LibTime {
  static validate(...args: Parameters<typeof ValidateTime.validate>) {
    return ValidateTime.validate(...args);
  }
}
