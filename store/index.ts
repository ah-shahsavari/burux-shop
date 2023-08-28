//@ts-ignore

import { defineStore } from 'pinia'

interface ProductModel {
  id: string
  name: string
  price: string
  count: number
}

interface CartState {
  products: ProductModel[]
}

export const useCartStore = defineStore({
  id: 'cart',
  state: (): CartState => ({
    products: [],
  }),
  getters: {
    getProductById: (state) => {
      return (id: String) => state.products.find((product) => product.id === id)
    },
    getProductCountById: (state) => {
      const products = state.products
      return (id: String) => {
        products.find((product) => product.id === id)
      }
    },
  },
  actions: {
    addProducts(products: ProductModel[]): void {
      this.products.push(...products)
    },
    deleteProducts(id: string): void {
      this.products = this.products.filter((p) => p.id !== id)
    },
    increament(id: string) {
      const itemToDouble = this.products.find((item) => item.id === id)
      if (itemToDouble) {
        itemToDouble.count += 1
      }
    },
    decreament(id: string) {
      const itemToDouble = this.products.find((item) => item.id === id)
      if (itemToDouble) {
        if (itemToDouble.count > 1) {
          itemToDouble.count -= 1
        } else {
          this.deleteProducts(id)
        }
      }
    },
  },
  persist: {
    enabled: true,
  },
})
