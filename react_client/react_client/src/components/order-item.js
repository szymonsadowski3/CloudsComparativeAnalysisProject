import './styles/order-item.css';
import {formatDateTimeString} from "../utils/common-utils";
import {Avatar, Icon, List} from "antd";
import {Link} from "react-router-dom";
import React from "react";
import {
    calculateTotalPrice,
    getDescriptionByOrderStatus,
    getIconByOrderStatus,
    getOrderPricesLabel
} from "../utils/order-item-utils";

export const OrderItem = props => {
    return <div className="order-item">
        <div className="card-top">
            <div className="order-id d-inline">
                <b>Order number:</b> {props.order.id}
            </div>
            <div className="created-at-label d-inline">
                <b>Ordered at:</b> {formatDateTimeString(props.order.createdAt)}
            </div>
            <div className="total-price-label d-inline">
                <b>Total price:</b> {calculateTotalPrice(props.order)}
            </div>
        </div>

        <div className="card-body">
            <div className="status-description">
                <span className="current-status-label"><Icon type="monitor" /> Current status: </span>
                {getDescriptionByOrderStatus(props.order.status)}
                <span className="icon-wrap"><Icon type={getIconByOrderStatus(props.order.status)} /></span>
            </div>
            <div className="shipping-address">
                <span className="shipping-address-label"><Icon type="home" /> Shipping address: </span> {props.order.shippingAddress}
            </div>
            <div className="ordered-products">
                <span className="ordered-products-label"><Icon type="shopping-cart" /> Ordered products: </span>
                <List
                    itemLayout="horizontal"
                    dataSource={props.order.orderProducts}
                    renderItem={orderProduct => (
                        <List.Item
                            extra={getOrderPricesLabel(orderProduct)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={orderProduct.productByProductId.illustrativeMediaUrl[0]} />}
                                title={<span>
                                                <Link to={`/product/${orderProduct.productByProductId.id}`} >
                                                    {orderProduct.quantity} x {orderProduct.productByProductId.name}
                                                </Link>
                                            </span>}
                                description={`Brand: ${orderProduct.productByProductId.brand}`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    </div>;
};
