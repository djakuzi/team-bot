import {Provider} from '@nestjs/common';

export interface ISceneProvider {
  services?: Provider[];
  factory?: Provider[];
  strategies?: Provider[];
  cron?: Provider[];
  handler?: Provider[];
  listener?: Provider[];
  repo?: Provider[];
}
