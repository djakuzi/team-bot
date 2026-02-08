import {ServicePrisma} from './prisma.service';
import {RepoReminder} from './repo/reminder/reminder.repo';
import {RepoSettings} from './repo/settings/settings.repo';
import {RepoTone} from './repo/tone/tone.repo';
import {RepoToneSettings} from './repo/tone/toneSettings.repo';

export const SCHEME_PRISMA = {
  services: [ServicePrisma],
  repo: [RepoToneSettings, RepoTone, RepoSettings, RepoReminder],
};
