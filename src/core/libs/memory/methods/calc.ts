export class MemoryCalc {
  private static toSerializable(
    value: unknown,
    seen = new WeakSet<object>(),
  ): unknown {
    if (value === null || value === undefined) return value;

    const type = typeof value;

    if (
      type === 'string' ||
      type === 'number' ||
      type === 'boolean' ||
      type === 'bigint'
    ) {
      return value;
    }

    if (type === 'function' || type === 'symbol') {
      return `[${type}]`;
    }

    if (type === 'object') {
      if (seen.has(value as object)) return '[Circular]';
      seen.add(value as object);

      if (value instanceof Map) {
        return Array.from(value.entries()).map(([k, v]) => [
          this.toSerializable(k, seen),
          this.toSerializable(v, seen),
        ]);
      }

      if (value instanceof Set) {
        return Array.from(value).map(v => this.toSerializable(v, seen));
      }

      if (value instanceof Date) {
        return value.toISOString();
      }

      if (Array.isArray(value)) {
        return value.map(v => this.toSerializable(v, seen));
      }

      const result: Record<string, unknown> = {};
      for (const key in value as Record<string, unknown>) {
        result[key] = this.toSerializable(
          (value as Record<string, unknown>)[key],
          seen,
        );
      }
      return result;
    }

    return `[Unserializable: ${type}]`;
  }

  static calc(data: any) {
    const json = JSON.stringify(this.toSerializable(data));
    const bytes = Buffer.byteLength(json, 'utf8');

    return {
      bytes,
      kb: (bytes / 1024).toFixed(2) + ' KB',
      mb: (bytes / 1024 / 1024).toFixed(3) + ' MB',
      raw: json,
    };
  }
}
