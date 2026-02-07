import { MemoryCalc } from "./methods/calc";
import { MemoryUsage } from "./methods/memoryUsage";

export class Memory {
	static calc(...args: Parameters<typeof MemoryCalc.calc>) {
		return MemoryCalc.calc(...args);
	}

    static memoryUsage(stage: 'start' | 'end') {
        return MemoryUsage.process(stage);
    }
}