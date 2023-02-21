import { storeItems } from "../data/items.js"
import { Row, Col } from "react-bootstrap"
import { StoreItem, StoreItemProps } from "../components/Storeitem.js"

export function Store() {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map((item: StoreItemProps) => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
