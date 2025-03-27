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

// Example usage:
export function getCategoryName(category: BookCategory): string {
    switch (category) {
        case BookCategory.Fiction:
            return i18n.t(StringConstants.fiction);
        case BookCategory.Adventure:
            return 'Adventure';
        case BookCategory.Mystery:
            return 'Mystery';
        case BookCategory.SciFi:
            return 'Science Fiction';
        default:
            return 'Unknown';
    }
}