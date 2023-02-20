import { createContext, ReactNode, useContext, useState } from "react"

// Create the type for the ShoppingCartProvider
type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantitiy: (id: number) => void
    decreaseCartQuantitiy: (id: number) => void
    removeFromCart: (id: number) => void
}

type CartItem = {
    id: number
    quantity: number
}

//---------------------------------------------------------------------------------------------------------

const ShoppingCartContext = createContext({} as ShoppingCartContext)

// export the function to use the context
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// Function to use the Context, Using the type we created
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    // declare use State as a CartItem Array
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number) {
        // find the item that matches the id and retunr its quantity or 0
        return cartItems.find((item) => item.id === id)?.quantity || 0
    }

    function increaseCartQuantitiy(id: number) {
        setCartItems((currItems) => {
            // if no item add a new item
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
                // if item exists add a item to the existing quantity
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantitiy(id: number) {
        setCartItems((currItems) => {
            // if no item add a new item
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id)
                // if item exists add a item to the existing quantity
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id)
        })
    }

    return (
        // using the Context created to pass the value to the children
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantitiy,
                decreaseCartQuantitiy,
                removeFromCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}
