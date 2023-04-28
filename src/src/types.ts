export type TUser = {
    id: string,
    email: string,
    password: string
  }
  
  export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: ProductCategory
  }
  
  export enum ProductCategory {
    SMARTPHONE = "smartphone",
    TABLET = "tablet",
    LAPTOP = "laptop",
    TV = "tv",
    OTHERS = "others"
  }
  
  export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
  }
  