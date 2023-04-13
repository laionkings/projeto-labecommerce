import { ACCOUNT_TYPE, TAccount } from "./types";

export const accounts: TAccount[] = [
    {
        id: "a001",
        ownerName: "Ciclano",
        balance: 10000,
        type: ACCOUNT_TYPE.GOLD
    },
    {
        id: "a002",
        ownerName: "Astrodev",
        balance: 500000,
        type: ACCOUNT_TYPE.BLACK
    },
    {
        id: "a003",
        ownerName: "Fulana",
        balance: 20000,
        type: ACCOUNT_TYPE.PLATINUM
    }
]

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export const products: Product[] = [
    { id: 1, name: "Product 1", price: 10.99, description: "Description of product 1" },
    { id: 2, name: "Product 2", price: 20.99, description: "Description of product 2" },
    { id: 3, name: "Product 3", price: 30.99, description: "Description of product 3" },
];
