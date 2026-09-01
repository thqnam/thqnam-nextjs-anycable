function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function seededRandom<T>(id: string | undefined, arr: T[]): T | undefined {
  if (!Array.isArray(arr) || arr.length === 0) {
    return undefined;
  }

  const hash = simpleHash(id ?? "default-room");
  const index = Math.abs(hash) % arr.length;
  return arr[index];
}
