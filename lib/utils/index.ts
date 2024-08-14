import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    // sign up + sign in
    email: z.string().email(),
    password: z.string().min(8),
  });

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

export const getLocale = (pathname: string) => {
  const parts = pathname.split("/");
  return parts.length > 1 ? parts[1] : "";
};

export const isLinkActive = (route: string, pathname: string) => {
  const locale = getLocale(pathname);

  if (route === "/") {
    return pathname === `/${locale}`;
  }
  return pathname.startsWith(`/${locale}${route}`);
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function encryptId(id: string) {
  return btoa(id);
}
