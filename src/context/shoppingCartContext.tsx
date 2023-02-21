import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { storeItems } from "../data/items.js"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { formatCurrency } from "../utilities/formatCurrency"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContextProps = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    totalPrice: string
    cartQuantity: number
    items: CartItem[]
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [items, setItems] = useLocalStorage<CartItem[]>("shoppin-cart", [])
    const [isOpen, setIsOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState("")

    useEffect(() => {
        const calculatedPrice = items.reduce((total, cartItem) => {
            const item = storeItems.find((i) => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0)

        setTotalPrice(formatCurrency(calculatedPrice))
    }, [items])

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const cartQuantity = items.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const getItemQuantity = (id: number) => {
        return items.find((item) => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setItems((prevData) => {
            if (prevData.find((item) => item.id === id) == null) {
                // create a new item with quantity 1
                return [...prevData, { id, quantity: 1 }]
            } else {
                return prevData.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setItems((prevData) => {
            if (prevData.find((item) => item.id === id)?.quantity == 1) {
                // create a new item with quantity 1
                return prevData.filter((item) => item.id !== id)
            } else {
                return prevData.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setItems((prevData) => {
            return prevData.filter((item) => item.id !== id)
        })
    }

    return (
        <>
            <ShoppingCartContext.Provider
                value={{
                    openCart,
                    closeCart,
                    getItemQuantity,
                    increaseCartQuantity,
                    decreaseCartQuantity,
                    removeFromCart,
                    items,
                    cartQuantity,
                    totalPrice,
                }}
            >
                {children}
                <ShoppingCart isOpen={isOpen} />
            </ShoppingCartContext.Provider>
        </>
    )
}
