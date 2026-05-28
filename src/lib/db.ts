// In-memory database for Vercel serverless (no filesystem writes)
// Data persists for the lifetime of the serverless instance

const store = new Map<string, any[]>();

export function readCollection<T>(name: string): T[] {
  if (!store.has(name)) {
    store.set(name, []);
  }
  return store.get(name) as T[];
}

export function writeCollection<T>(name: string, data: T[]): void {
  store.set(name, data);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
