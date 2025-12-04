type TProccesEnv = string | undefined;

interface IConfigBot {
	token: TProccesEnv;
}

interface IConfigNode {
	mode: TProccesEnv;
	port: TProccesEnv;
}

export interface IConfigApp {
	bot: IConfigBot;
	node: IConfigNode;
}

const createAppConfig = (): IConfigApp => ({
	bot: {
		token: process.env.BOT_TOKEN,
	},
	node: {
		mode: process.env.NODE_MODE,
		port: process.env.NODE_PORT,
	},
});

export default createAppConfig;
