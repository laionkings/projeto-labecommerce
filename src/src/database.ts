import { 
    TUser, 
    TProduct, 
    TPurchase, 
    ProductCategory
} from "./types"

export const user: TUser[] = [
    {
        id: "01",
        email: "celular@gmail.com.br",
        password: "celularQuente123"
    },
    {
        id: "02",
        email: "smartphone@gmail.com.br",
        password: "smartphoneAmassadoQdlc"        
    }
]

export const product: TProduct[] = [
    {
        id: "01",
        name: "celular",
        price: 800,
        category: ProductCategory.SMARTPHONE
    },
    {
        id: "02",
        name: "smartphone",
        price: 900,
        category: ProductCategory.SMARTPHONE       
    }
]

export const purchase: TPurchase[] = [
    {
        userId: "01",
        productId: "01",
        quantity: 1,
        totalPrice: 800
    },
    {
        userId: "02",
        productId: "01",
        quantity: 2,
        totalPrice: 900    
    }
];

export function createUser(id: string, email: string, password: string): string {
    user.push({id, email, password})
    return "Cadastro realizado com sucesso"
}

export function getAllUsers(): TUser []
 {
    return user
 }

 export function createProduct(id: string, name: string, price: number, category: ProductCategory): string {
   product.push({id, name, price, category})
   return "Produto criado com sucesso" 
 }

 export function getAllProducts():TProduct[] {
    return product
 }

 export function getProductById(idToSearch: string): TProduct | undefined {
    return product.find((prod) => prod.id === idToSearch)
 }

export function queryProductsByName(q: string): TProduct[] {
    return product.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()));
  }

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
    purchase.push({userId, productId, quantity, totalPrice});
    return "Compra realizada com sucesso";
  }

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase [] {
    return purchase.filter((purchase) => purchase.userId === userIdToSearch);
  }
