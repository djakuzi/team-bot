import { MemoryCalc } from "./methods/calc";

export class Memory {
	static calc(...args: Parameters<typeof MemoryCalc.calc>) {
		return MemoryCalc.calc(...args);
	}
}