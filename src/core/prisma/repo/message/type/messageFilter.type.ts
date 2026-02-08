import {TypeMessage} from './message.type';

export type TypeFilterMessage = Partial<TypeMessage> & {
  from?: Date;
  to?: Date;
};
