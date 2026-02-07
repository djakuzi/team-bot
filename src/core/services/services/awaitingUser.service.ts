import { Injectable } from "@nestjs/common";

@Injectable()
export class GServiceAwaitingUser {
	private userStates = new Map<number, Record<string, unknown>>();

	setState(userId: number, key: string, value: any) {
		const state = this.userStates.get(userId) || {};
		state[key] = value;
		this.userStates.set(userId, state);
	}

	getState(userId: number, key: string) {
		const state = this.userStates.get(userId);
		return state ? state[key] : undefined;
	}

	clearState(userId: number, key?: string) {
		if (!key) {
			this.userStates.delete(userId);
		} else {
			const state = this.userStates.get(userId);
			if (state) {
				delete state[key];
				this.userStates.set(userId, state);
			}
		}
	}

	hasState(userId: number, key: string) {
		const state = this.userStates.get(userId);
		return state ? key in state : false;
	}
}
