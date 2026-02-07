export class MemoryUsage {
    private static before: number = 0;

    private static format(bytes: number) {
        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';     // < 1MB → KB
        }
        return (bytes / 1024 / 1024).toFixed(3) + ' MB';  // ≥ 1MB → MB
    }

    static process(type: "start" | "end"): string | void {
        if (type === "start") {
            this.before = process.memoryUsage().heapUsed;
            return;
        }

        if (type === "end") {
            const after = process.memoryUsage().heapUsed;
            const diff = after - this.before;
            return this.format(diff);
        }
    }
}
