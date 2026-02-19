type TProccesEnv = string | undefined;

interface IConfigBot {
  token: TProccesEnv;
}

interface IConfigNode {
  mode: TProccesEnv;
  port: TProccesEnv;
}

export interface IConfigAi {
  token: TProccesEnv;
  models: TProccesEnv;
}

export interface IConfigApp {
  bot: IConfigBot;
  node: IConfigNode;
  ai: IConfigAi;
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
    token: process.env.AI_API_TOKEN,
    models: process.env.AI_MODELS,
  },
});

export default createAppConfig;
