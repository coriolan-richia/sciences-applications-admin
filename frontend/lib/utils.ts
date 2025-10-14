import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function logIfDev(level: "log" | "warn" | "error", ...args: unknown[]) {
//   if (process.env.NODE_ENV === "development") {
//     console[level](...args);
//   }
// }

export function isNullOrEmpty(value: string): boolean {
  return value === null || value === undefined || value === "";
}
