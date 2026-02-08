import type {PrismaClient} from '@prisma/client';

export async function setDefaultTone(prisma: PrismaClient) {
  try {
    const tones = [
      {
        name: 'FORMAL',
        desc: 'Формальный: уважительный, сдержанный и официальный, без юмора.',
      },
      {
        name: 'FRIENDLY',
        desc: 'Дружелюбный/Неформальный: простой, близкий, доверительный тон, с обращением на «ты».',
      },
      {
        name: 'HUMOROUS',
        desc: 'Юмористический/Остроумный: использование шуток, иронии и метафор.',
      },
      {
        name: 'ENTHUSIASTIC',
        desc: 'Восторженный: передача энтузиазма и страсти.',
      },
      {
        name: 'SERIOUS',
        desc: 'Серьезный: информационный, лаконичный, по делу.',
      },
      {
        name: 'PROVOCATIVE',
        desc: 'Провокационный: смелый, независимый, бунтарский.',
      },
      {
        name: 'MENTORING',
        desc: 'Наставнический: передача советов, объяснение и разбор ошибок.',
      },
    ];

    for (const tone of tones) {
      await prisma.tone.upsert({
        where: {name: tone.name},
        update: {},
        create: tone,
      });
    }

    const existingSettings = await prisma.toneSettings.findFirst();
    if (!existingSettings) {
      const formalTone = await prisma.tone.findUnique({
        where: {name: 'FORMAL'},
      });

      if (formalTone) {
        await prisma.toneSettings.create({
          data: {
            toneId: formalTone.id,
            updateTime: '09:00',
          },
        });
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
