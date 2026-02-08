export function parseObjectToFlatArray<T = unknown>(obj: object): T[] {
  const record = obj as Record<string, unknown>;

  return Object.values(record).flatMap(value => {
    if (Array.isArray(value)) {
      return value as T[];
    }

    if (typeof value === 'object' && value !== null) {
      return Object.values(value) as T[];
    }

    return [];
  });
}
