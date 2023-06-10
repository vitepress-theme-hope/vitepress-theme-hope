import { isString } from "@vue/shared";

export { isArray, isString, isSymbol } from "@vue/shared";
export { isDef, isObject } from "@vueuse/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
// eslint-disable-next-line

export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown
): val is T => Object.prototype.toString.call(val) === "[object Object]";

export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === "function";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (val: any): val is number => typeof val === "number";
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;
/* String helper */

export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix);

export const endsWith = (str: unknown, suffix: string): boolean =>
  isString(str) && str.endsWith(suffix);

/* Object helper */

export const entries = Object.entries;
export const fromEntries = Object.fromEntries;
export const keys = Object.keys;
export const values = Object.values;
