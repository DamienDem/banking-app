import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function formatAmount(amount: number, currency: string = "EUR"): string {
    const formatter = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    });
  
    return formatter.format(amount);
  }

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }  
  