import {ConfigService} from '@nestjs/config';
import {IConfigApp} from './app.config';

export function createBotConfig(configService: ConfigService) {
  const token = configService.get<IConfigApp['bot']>('bot')?.token;

  if (!token) {
    throw new Error('Telegram bot token is not defined!');
  }

  return {
    token,
  };
}
