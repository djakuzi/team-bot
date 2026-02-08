import {Module} from '@nestjs/common';
import {SCHEME_PRISMA} from './prisma.scheme';

@Module({
  imports: [],
  providers: [...SCHEME_PRISMA.services, ...SCHEME_PRISMA.repo],
  exports: [...SCHEME_PRISMA.services, ...SCHEME_PRISMA.repo],
})
export class ModulePrisma {}
