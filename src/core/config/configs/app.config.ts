type TProccesEnv = string | undefined;

interface IConfigBot {
	token: TProccesEnv;
}

interface IConfigNode {
	mode: TProccesEnv;
	port: TProccesEnv;
}

interface IConfigAi {
	token: TProccesEnv;
}

export interface IConfigApp {
	bot: IConfigBot;
	node: IConfigNode;
	ai: IConfigAi
}

const createAppConfig = (): IConfigApp => ({
	bot: {
		token: process.env.BOT_TOKEN,
	},
	node: {
		mode: process.env.NODE_MODE,
		port: process.env.NODE_PORT,
	},
	ai: {
		token: process.env.HF_API_TOKEN
	}
});

export default createAppConfig;
