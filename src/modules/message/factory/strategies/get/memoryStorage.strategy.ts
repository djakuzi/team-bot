import { Injectable } from "@nestjs/common";
import { RepoMessage } from "@tb-core/prisma/repo/message/message.repo";

@Injectable()
export class StrategyGetlMemoryStorage {
    constructor(
        readonly repoMessage: RepoMessage,
    ) { }

    async execute() {
        return await this.repoMessage.getSizeMemory();
    }
}
