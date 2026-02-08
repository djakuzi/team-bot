export interface IDescActionUpdate {
  action: string;
  desc: string;
}

export interface IDescCommandUpdate {
  command: string;
  desc: string;
}

export type TListDescUpdate<T> = Record<string, T>;
