import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export type CartItem = {
  id: string
  name: string
  cost: number
  requisition: boolean
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  shoppingCart: CartItem[]
  updateShoppingCart: Dispatch<SetStateAction<CartItem[]>>
}

const ShoppingCartContext = createContext<ShoppingCartContext>({
  shoppingCart: [],
  updateShoppingCart: () => {
    return
  },
})

export interface QuantifiedCartItem extends CartItem {
  quantity: number
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [localStorageCart, updateLocalStorageCart] = useLocalStorage('cart', [])
  const [shoppingCart, updateShoppingCart] =
    useState<CartItem[]>(localStorageCart)

  useEffect(() => {
    updateLocalStorageCart(shoppingCart)
  }, [shoppingCart, updateLocalStorageCart])

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, updateShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

const quantifyShoppingCart = (unquantifiedShoppingCart: CartItem[]) => {
  const quantifiedShoppingCart: QuantifiedCartItem[] = []

  unquantifiedShoppingCart.map((unquantifiedShoppingCartItem) => {
    const quantifiedShoppingCartItem = quantifiedShoppingCart.find(
      (item) => item.name === unquantifiedShoppingCartItem.name
    )

    if (quantifiedShoppingCartItem) {
      quantifiedShoppingCartItem.quantity =
        quantifiedShoppingCartItem.quantity + 1
    } else {
      quantifiedShoppingCart.push({
        ...unquantifiedShoppingCartItem,
        quantity: 1,
      })
    }
  })

  return quantifiedShoppingCart
}

export const useShoppingCart = () => {
  const shoppingCart = useContext(ShoppingCartContext)
  const quantifiedShoppingCart = quantifyShoppingCart(shoppingCart.shoppingCart)
  let totalCost = 0

  quantifiedShoppingCart.forEach((item) => {
    const total = item.cost * item.quantity
    totalCost = totalCost + total
  })

  return { ...shoppingCart, quantifiedShoppingCart, totalCost }
}
