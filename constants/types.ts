import { i18n, StringConstants } from "../configs";

export type StatusBook = 'available' | 'sold' | 'exchanged';
export type StatusTransaction = 'pending' | 'completed' | 'canceled'
export type TransactionType = 'purchase' | 'sale' | 'swap'


export enum BookCategory {
    Fiction = 1,
    Adventure,
    Mystery,
    SciFi,
    // Add more categories as needed
}



export function getCategoryName(category: BookCategory): string {
    switch (category) {
        case BookCategory.Fiction:
            return i18n.t(StringConstants.fiction);
        case BookCategory.Adventure:
            return i18n.t(StringConstants.adventure);
        case BookCategory.Mystery:
            return i18n.t(StringConstants.mystery);
        case BookCategory.SciFi:
            return i18n.t(StringConstants.sci_fiction);
        default:
            return 'Unknown';
    }
}