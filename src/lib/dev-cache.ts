type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

export function createDevTtlCache<T>(ttlMs: number) {
  let entry: CacheEntry<T> | null = null;

  return {
    get(): T | null {
      if (process.env.NODE_ENV !== "development" || !entry) {
        return null;
      }

      if (Date.now() > entry.expiresAt) {
        entry = null;
        return null;
      }

      return entry.value;
    },
    set(value: T) {
      if (process.env.NODE_ENV !== "development") {
        return;
      }

      entry = { value, expiresAt: Date.now() + ttlMs };
    },
    clear() {
      entry = null;
    },
  };
}
