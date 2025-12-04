import { PrismaClient } from '@prisma/client';
import { setDefaultTone } from './seed/tone/defaultToneData.seed';

const prisma = new PrismaClient();

async function main() {
	await setDefaultTone(prisma);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
