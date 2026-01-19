/**
 * String utilities
 */
import { deburr, kebabCase } from "lodash/string";

export function slugsJoin(...parts: string[]): string {
  return parts.filter((p) => p !== undefined && p !== null && p !== "").join("_");
}

export function slugify(input: string): string {
  if (!input) return "";
  return kebabCase(deburr(input)).toLowerCase();
}
