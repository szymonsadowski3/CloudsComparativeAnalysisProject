import './styles/checkout-component.css';
import React, {Component} from "react";
import {Avatar, Button, Icon, InputNumber, Layout, List, Popconfirm} from 'antd';
import {getProductPriceSummary} from "../utils/common-utils";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import {Link} from "react-router-dom";
import WrappedShippingAddressForm from "./shipping-address-form";

const {Content} = Layout;


export default class CheckoutComponent extends Component {
    constructor(props) {
        super(props);

        this.props.setBreadcrumbs([
            {name: 'home', url: '/'},
            {name: 'checkout', url: false},
        ]);

        this.shippingAddressFormChild = React.createRef();
    }

    render() {
        const isCartEmpty = isEqual(get(this, 'props.shoppingCartProducts.length'), 0);

        return <Content style={{padding: '0 24px', minHeight: 280}}>
            <h3>Checkout</h3>
            <List
                itemLayout="horizontal"
                dataSource={this.props.shoppingCartProducts}
                renderItem={cartItem => (
                    <List.Item
                        extra={
                            <div className="extra-shopping-cart-content">
                                {getProductPriceSummary(cartItem.product.currentPrice, cartItem.quantity)}
                                <hr/>
                                <div className="actions">
                                    <Button
                                        type="primary"
                                        onClick={
                                            () => {
                                                let newShoppingCartProducts = [
                                                    ...this.state.shoppingCartProducts
                                                ];

                                                const filteredItems = newShoppingCartProducts.filter(
                                                    cartItemNew => {
                                                        return cartItem.product.id !== cartItemNew.product.id
                                                    });

                                                this.setState({
                                                    shoppingCartProducts: filteredItems
                                                });
                                            }
                                        }
                                    >
                                        Remove item from cart <Icon type="delete" />
                                    </Button>
                                    <div className="quantity-wrapper">
                                        Quantity: <InputNumber
                                        min={0}
                                        defaultValue={1}
                                        onChange={(value) => {
                                            let newShoppingCartProducts = [
                                                ...this.state.shoppingCartProducts
                                            ];
                                            for(let cartItemNew of newShoppingCartProducts) {
                                                if(cartItem.product.id === cartItemNew.product.id) {
                                                    cartItemNew.quantity = value;
                                                    this.setState({
                                                        shoppingCartProducts: newShoppingCartProducts
                                                    });
                                                }
                                            }
                                        }}
                                        value={cartItem.quantity}
                                    />
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={get(cartItem, 'product.illustrativeMediaUrl[0]')} />}
                            title={<span>
                                                <Link to={`/product/${cartItem.product.id}`} >
                                                    {cartItem.quantity} x {cartItem.product.name}
                                                </Link>
                                            </span>}
                            description={`Brand: ${cartItem.product.brand}`}
                        />
                    </List.Item>
                )}
            />

            <span>
                <Icon type="dollar" /> Total price: {this.props.calculateTotalShoppingCartPrice()}
            </span>

            <hr/>

            <div className="shipping-address-section">
                <h4>Please provide your shipping address:</h4>

                <WrappedShippingAddressForm
                    wrappedComponentRef={(inst) => this.shippingAddressFormChild = inst}
                />
            </div>

            <div className="confirm-section">
                <Popconfirm
                    title="Are you sure you want to place this order?"
                    onConfirm={() => {
                        this.props.placeOrder(
                            this.shippingAddressFormChild.props.form.getFieldsValue()
                        )
                    }}
                >
                    <Button
                        type="primary"
                        size="large"
                        className="place-order-button"
                        disabled={isCartEmpty}
                    >
                        Place order
                    </Button>
                </Popconfirm>
            </div>
        </Content>;
    }
}