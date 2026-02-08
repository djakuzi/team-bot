import {Telegraf} from 'telegraf';
import {Injectable} from '@nestjs/common';
import {InjectBot} from 'nestjs-telegraf';
import {ServiceSettings} from '@tb-modules/settings/services/settings.service';
import {EventMessageRetellingGenerated} from '@tb-modules/message/events/generatedRetelling.event';
import {splitTextByMaxSymbol} from '@tb-common/utils/transform/splitTextByMaxSymbol.util';
import {TransformMarkdown} from '@tb-core/libs/transformToMarkdown/index.lib';

@Injectable()
export class HandleGenerateRetellingMessages {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly serviceSettings: ServiceSettings,
  ) {}

  private async generatedRetellingMessages(
    payload: EventMessageRetellingGenerated,
  ) {
    const id = await this.serviceSettings.getSettings(true);

    const retelling = `Сгенерирован пересказ сообщений по расписанию. \n
			${payload.retelling}
		`;

    const partsRetelling = splitTextByMaxSymbol(retelling);

    for (const part of partsRetelling) {
      const escaped = TransformMarkdown.parseEscapeMarkdownV2(part);

      await this.bot.telegram.sendMessage(id.connectedIdChat + '', escaped, {
        parse_mode: 'MarkdownV2',
      });
    }
  }

  async execute(payload: EventMessageRetellingGenerated) {
    await this.generatedRetellingMessages(payload);
  }
}
