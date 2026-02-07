import { Injectable } from "@nestjs/common";
import { FactoryAddReminder } from "../factory/add.factory";
import { FactoryGetReminder } from "../factory/get.factory";
import { Prisma } from "@prisma/client";
import { FactoryChangeReminder } from "../factory/change.factory";
import { FactoryDeleteReminder } from "../factory/delete.factory";

@Injectable()
export class ServiceReminder {
	constructor(
        private readonly factoryAddTone: FactoryAddReminder,
        private readonly factoryGetTone: FactoryGetReminder,
        private readonly factoryChangeReminder: FactoryChangeReminder,
        private readonly factoryDeleteReminder: FactoryDeleteReminder,
	) { }

	async addReminder(reminder: Prisma.ReminderCreateInput) {
		const strategy = this.factoryAddTone.getStrategy('newReminder');
        return await strategy.execute(reminder);
	}

	async getReminder(name: string) {
		const strategy = this.factoryGetTone.getStrategy('oneReminder');
		return await strategy.execute();
	}

	async getListReminder() {
		const strategy = this.factoryGetTone.getStrategy('listReminders');
		return await strategy.execute();
	}

    async changeReminderData(id: number, data: Prisma.ReminderUpdateInput) {
        const strategy = this.factoryChangeReminder.getStrategy('changeDataReminder');
        return await strategy.execute(id, data);
    }

    async removeAllReminders() {
        const strategy = this.factoryDeleteReminder.getStrategy('deleteAllReminders');
        return strategy.execute();
    }
}
