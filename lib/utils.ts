import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const relativeDate = (from: Date) => {
  return formatDistanceToNowStrict(from, {
    addSuffix: true,
  });
};

export const toSlug = (str: string) => {
  return str
    .toLocaleLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "-");
};

export const isAdmin = (user: UserResource | User) => {
  return user.publicMetadata?.role === "admin";
};
