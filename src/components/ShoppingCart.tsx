import {
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle,
    Stack,
} from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import { CartItem } from "./CartItem"

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, items, totalPrice } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <OffcanvasHeader closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    {items.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">{totalPrice}</div>
                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )
}
