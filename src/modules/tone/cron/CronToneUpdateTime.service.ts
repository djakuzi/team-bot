import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { ServiceToneSettings } from '../services/toneSettings.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventToneUpdatedByTime } from '../events/updateToneByTime.event';

@Injectable()
export class CronToneUpdateByTime implements OnModuleInit {
	private readonly logger = new Logger(CronToneUpdateByTime.name);
	private currentJob: CronJob | null = null;
	private timeUpdateTone: string | null = null;

	constructor(
		private readonly serviceToneSettings: ServiceToneSettings,
		private readonly eventEmitter: EventEmitter2,
	) { }

	async onModuleInit() {
		try {
			const time = await this.serviceToneSettings.getToneTime();

			if (time) {
				this.scheduleToneUpdate(time);
			}
		} catch (error) {
			console.error(error);
		}
	}

	private scheduleToneUpdate(time: string) {
		if (this.currentJob) {
			this.currentJob.stop();
			this.logger.log('Остановлена старая задача обновления тона');
		}

		this.logger.log(`Произошло обновление времени с ${this.timeUpdateTone} на ${time} по интервальному измению тона.`);
		this.timeUpdateTone = time;

		const [hour, minute] = time.split(':').map(Number);
		const cronTime = `${minute} ${hour} * * *`;

		this.currentJob = new CronJob(cronTime, this.callbackUpdateTone.bind(this), null, true);

		this.currentJob.start();
		this.logger.log(`Запущена задача обновления тона на ${time}`);
	}

	private async callbackUpdateTone() {
		const tone = await this.serviceToneSettings.setRandomTone();
		const message = (`Тон был обновлен по расписанию в ${this.timeUpdateTone}. \n Обновленный тон *${tone.name}* — ${tone.desc}`);

		this.eventEmitter.emit(
			EventToneUpdatedByTime.eventName,
			new EventToneUpdatedByTime(tone.name, tone.desc, { isCron: true })
		);

		this.logger.log(message);
	}

	updateScheduledTime(newTime: string) {
		this.scheduleToneUpdate(newTime);
	}
}
