import { Injectable } from "@nestjs/common";
import { toTextByListObject } from "@tb-common/utils/transform/toTextByArray.util";
import { RepoMessage } from "@tb-core/prisma/repo/message/message.repo";
import { TypeMessage } from "@tb-core/prisma/repo/message/type/message.type";

type TReturnTypeMessages = 'array' | 'string';

type ResultByType<T extends TReturnTypeMessages> = T extends 'array' ? TypeMessage[] : string;

interface IArgsGetMessageByDate<T extends TReturnTypeMessages> {
    method: 'today';
    type: T;
}

@Injectable()
export class StrategyGetMessagesByMethod {
    constructor(
        readonly repoMessage: RepoMessage,
    ) { }

    async execute<T extends TReturnTypeMessages>(
        arg: IArgsGetMessageByDate<T>
    ): Promise<ResultByType<T> | null> {
        if (arg.method === 'today') {
            const messages = await this.repoMessage.getMessages();

            if (!messages.length) {
                return null;
            };

            const resMessages = arg.type === 'array' ? messages : toTextByListObject(
                messages,
                {
                    'firstName': true,
                    'text': true,
                }
            )

            return resMessages as ResultByType<T>;
        }

        return null
    }
}
