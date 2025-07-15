import { clsx, type ClassValue } from "clsx";
import { format, type DateArg, type FormatOptions } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: DateArg<Date> & {},
  formatStr = "MMM d, yyyy h:mm a",
  options?: FormatOptions
) {
  return format(date, formatStr);
}
