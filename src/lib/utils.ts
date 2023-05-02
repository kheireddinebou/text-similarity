import { ClassValue } from "class-variance-authority/dist/types";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
