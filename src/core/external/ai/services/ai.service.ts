import { Injectable } from "@nestjs/common";
import { OpenRouter } from "@openrouter/sdk";

@Injectable()
export class ServiceAi {
	private readonly openRouter: OpenRouter;
	private readonly config = {
		model: "qwen/qwen3-coder:free",
		stream: true
	}

	constructor(){
		this.openRouter = new OpenRouter({
			apiKey: "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"
		});
	}

	async generateText(promt: string) {
		if (!promt) return;

		const stream = await this.openRouter.chat.send({
			model: "nvidia/nemotron-nano-9b-v2:free",
			messages: [
				{
					"role": "user",
					"content": promt
				}
			],
			stream: true
		});

		let response = '';
		
		for await (const chunk of stream) {
			const content = chunk.choices[0]?.delta?.content;

			if (content) {
				response += content;
			}
		}

		return response;
	}
}
