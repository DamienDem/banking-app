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

export const getLocale = (pathname: string) => {
  const parts = pathname.split("/");
  return parts.length > 1 ? parts[1] : "";
};

export const isLinkActive = (route: string, pathname: string) => {
  console.log("route", route, "pathname",pathname);
  
  const locale = getLocale(pathname);
  console.log("locale", `/${locale}${route}`);
  
  if (route === "/") {
    return pathname === `/${locale}`;
  }
  return pathname.startsWith(`/${locale}${route}`);
};
