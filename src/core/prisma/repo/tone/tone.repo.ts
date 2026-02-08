import {Injectable} from '@nestjs/common';
import type {Tone, Prisma} from '@prisma/client';
import {ServicePrisma} from '@tb-core/prisma/prisma.service';

@Injectable()
export class RepoTone {
  constructor(private readonly prisma: ServicePrisma) {}

  async findAll(): Promise<Tone[]> {
    return this.prisma.tone.findMany();
  }

  async findByName(name: string): Promise<Tone | null> {
    return this.prisma.tone.findUnique({where: {name}});
  }

  async create(data: Prisma.ToneCreateInput): Promise<Tone> {
    return this.prisma.tone.create({data});
  }

  async upsertByName(data: Prisma.ToneCreateInput): Promise<Tone> {
    return this.prisma.tone.upsert({
      where: {name: data.name},
      update: {},
      create: data,
    });
  }
}
