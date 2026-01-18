/**
 * String utilities
 */

export function slugsJoin(...parts: string[]): string {
  return parts.filter((p) => p !== undefined && p !== null && p !== "").join("_");
}
