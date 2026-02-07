import { ServiceSettings } from '@tb-modules/settings/services/settings.service';
import { Command, Ctx, Update } from 'nestjs-telegraf';
import { COMMANDS_BOT_SETTINGS } from '../constant/commands.const';
import { Context } from 'telegraf';
import { GServiceCache } from '@tb-core/services/services/cache.service';
import { connectThisChat } from './action/connectThisChat.action';
import { disconnectThisChat } from './action/disconnectThisChat.action';
import { getSizeCache } from './action/getSizeCache.action';
import { getСonnectedChat } from './action/getСonnectedChat.action';
import { сlearCache } from './action/сlearCache.action';
import { COMMANDS_BOT } from '@tb-bot/commands.const';

@Update()
export class CommandsBotSettings {
	constructor(
		private readonly serviceSettings: ServiceSettings,
		private readonly GServiceCache: GServiceCache,
	) { }

	@Command(COMMANDS_BOT.startAuto.command)
	// @Command(COMMANDS_BOT_SETTINGS.connectThisChat.command)
	async connectThisChat(@Ctx() ctx: Context) {
		await connectThisChat(ctx, this.serviceSettings, 'command');
	}

	@Command(COMMANDS_BOT_SETTINGS.getСonnectedChat.command)
	async getСonnectedChat(@Ctx() ctx: Context) {
		await getСonnectedChat(ctx, this.serviceSettings, 'command');
	}

	@Command(COMMANDS_BOT_SETTINGS.disconnectThisChat.command)
	async disconnectThisChat(@Ctx() ctx: Context) {
		await disconnectThisChat(ctx, this.serviceSettings, 'command');
	}

	@Command(COMMANDS_BOT_SETTINGS.getSizeCache.command)
	async getSizeCache(@Ctx() ctx: Context) {
		await getSizeCache(ctx, this.GServiceCache, 'command');
	}

	@Command(COMMANDS_BOT_SETTINGS.сlearCache.command)
	async сlearCache(@Ctx() ctx: Context) {
		await сlearCache(ctx, this.GServiceCache, 'command');
	}
}
