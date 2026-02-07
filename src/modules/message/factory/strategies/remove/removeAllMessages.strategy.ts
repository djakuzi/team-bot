import { Injectable } from "@nestjs/common";
import { RepoMessage } from "@tb-core/prisma/repo/message/message.repo";

@Injectable()
export class StrategyRemoveAllMessage {
    constructor(
        readonly repoMessage: RepoMessage,
    ) { }

    async execute() {
        await this.repoMessage.clearMessage();
    }
}
