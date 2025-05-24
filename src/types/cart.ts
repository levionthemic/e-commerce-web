import { Product } from './product'

export interface CartItem {
  productId: string
  typeId: string
  quantity: number
}

interface FullProductItem extends Product {
  _id: string
  sellerId: string
}

export interface Cart {
  itemList: CartItem[]
  fullProducts: FullProductItem[]
}
