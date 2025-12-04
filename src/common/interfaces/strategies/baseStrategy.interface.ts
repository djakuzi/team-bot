export interface IStrategy<TInput = void, TResult = any> {
	execute(input: TInput): Promise<TResult>;
}

