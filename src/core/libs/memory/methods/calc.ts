export class MemoryCalc {
	public static roughSizeOfObject(object: unknown): number {
		const objectList = new Set();
		const stack = [object];
		let bytes = 0;

		while (stack.length) {
			const value = stack.pop();
			
			if (value === null || value === undefined) {
				bytes += 0;
			} else if (typeof value === 'boolean') {
				bytes += 4;
			} else if (typeof value === 'string') {
				bytes += value.length * 2;
			} else if (typeof value === 'number') {
				bytes += 8;
			} else if (typeof value === 'object') {
				if (objectList.has(value)) {
					continue;
				}
				objectList.add(value);

				for (const i in value) {
					if (Object.prototype.hasOwnProperty.call(value, i)) {
						stack.push(value[i]);
					}
				}
			} else {
				bytes += 0;
			}
		}

		return bytes;
	}

	static calc(item: unknown) {
		return this.roughSizeOfObject(item);
	}
}