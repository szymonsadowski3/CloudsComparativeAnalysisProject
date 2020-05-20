import React, {Component} from "react";
import ProductDetails from "./product-details";
import {Layout} from 'antd';

const {Content} = Layout;


export default class ProductDetailsParent extends Component {
    constructor(props) {
        super(props);

        this.props.setBreadcrumbs([
            {name: 'home', url: '/'},
            {name: 'product', url: false},
            {name: this.props.match.params.id},
        ]);
    }

    render() {
        console.dir(this.props.match.params.id);
        return <Content style={{padding: '0 24px', minHeight: 280}}>
            <ProductDetails
                productId={this.props.match.params.id}
                addProductToCart={this.props.addProductToCart}
            />
        </Content>;
    }
}