import './styles/product-card.css';
import React, {Component} from "react";
import get from "lodash/get";

import {Button, Tooltip, message} from 'antd';
import {Link} from "react-router-dom";

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            product
        } = this.props;

        return <div className='product-wrapper'>
            <Tooltip title={`description: ${product.node.description}`}>
                <Link to={`/product/${product.node.id}`}>
                    <img alt="example"
                         src={get(product.node.illustrativeMediaUrl, '0')}
                         width={200}
                         height={200}
                    />
                    <div className="product-name">
                        <span className='my-link'>{product.node.name}</span>
                    </div>
                </Link>
                <div className="product-price">{product.node.currentPrice}</div>

                <Button
                    type="primary"
                    icon="plus"
                    onClick={() => {
                        this.props.addProductToCart(product.node, 1);
                        message.success("Product added to cart!");
                    }}
                    className='add-to-cart-button'
                >
                    Add to cart
                </Button>
            </Tooltip>
        </div>;
    }
}