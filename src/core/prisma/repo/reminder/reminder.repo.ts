import { Injectable } from '@nestjs/common';
import { ServicePrisma } from '@tb-core/prisma/prisma.service';
import { Prisma, Reminder } from '@prisma/client';

@Injectable()
export class RepoReminder {

	constructor(
		private readonly prisma: ServicePrisma,
	) { }

    async create(data: Prisma.ReminderCreateInput): Promise<Reminder> {
        return await this.prisma.reminder.create({ data });
    }

    async findAll(): Promise<Reminder[]> {
        return await this.prisma.reminder.findMany();
    }

    async update(id: number, data: Prisma.ReminderUpdateInput): Promise<Reminder | null> {
        try {
            return await this.prisma.reminder.update({
                where: { id },
                data
            });
        } catch (error) {
            return null
        }
    }

    async delete(id: number): Promise<Reminder | null> {
        try {
            return await this.prisma.reminder.delete({ where: { id } });
        } catch (error) {
            return null;
        }
    }

    async deleteAll(): Promise<Prisma.PrismaPromise<Prisma.BatchPayload> | null> {
        try {
            return await this.prisma.reminder.deleteMany({});
        } catch (error) {
            return null;
        }
    }
}
