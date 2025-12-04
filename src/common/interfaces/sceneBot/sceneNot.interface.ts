export interface ISceneBot {
	cancelScene(...arg: any): Promise<void> | void;
}