export interface Product {
  productId: string
  category: string
  product: string
  unitPrice: number
  discount: number
  totalPrice: number
  decription?: string
  brand?: string
  currentStock: number
  status: 'Active' | 'Inactive'
}
