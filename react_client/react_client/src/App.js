import React, {Component} from 'react';
import './App.css';
import MainView from "./components/main-view";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";
import ProductDetailsParent from "./components/product-details-parent";
import MyHeader from "./components/my-header";
import MyBreadcrumbs from "./components/my-breadcrumbs";
import MySideMenu from "./components/my-side-menu";
import {Affix, Avatar, Button, Icon, InputNumber, Layout, List, message, Modal} from 'antd';
import {apolloClient, isDemo} from "./common/apollo-client";
import {ALL} from "./common/definitions";
import OrdersList from "./components/orders-list";
import {breadcrumbsEqual, getProductPriceSummary} from "./utils/common-utils";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import join from "lodash/join";
import map from "lodash/map";
import AdminPanel from "./components/admin-panel";
import AddNewProduct from "./components/add-new-product";
import CheckoutComponent from "./components/checkout-component";
import {placeOrder} from "./api/custom-queries";
import OrderSuccess from "./components/order-success-component";
import LoginScreen from "./components/login-screen";
import RegisterScreen from "./components/register-screen";

const {Content, Footer} = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            breadcrumbs: [{name: 'home', url: '/'}],

            listOfIdsToDisplay: ALL,
            appliedFilters: null,
            whichFiltersApplied: {},

            shoppingCartVisible: false,

            shoppingCartProducts: [

            ]
        };
    }

    showShoppingCartModal = () => {
        this.setState({
            shoppingCartVisible: true,
        });
    };

    handleOk = e => {
        this.setState({
            shoppingCartVisible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            shoppingCartVisible: false,
        });
    };

    setBreadcrumbs = (newBreadcrumbs) => {
        if(!breadcrumbsEqual(this.state.breadcrumbs, newBreadcrumbs)) {
            this.setState({
                breadcrumbs: newBreadcrumbs
            });
        }
    };

    setListOfIdsFilter = (listOfIdsToDisplay, meta, whichFiltersApplied) => {
        if(meta && whichFiltersApplied) {
            this.setState({
                listOfIdsToDisplay,
                appliedFilters: {
                    priceFrom: meta.priceFrom,
                    priceTo: meta.priceTo,
                    minimumRating: meta.minimumRating,
                    brand: meta.brand,
                    tags: meta.tags,
                    productName: meta.productName,
                },
                whichFiltersApplied,
            });
        } else {
            this.setState({
                listOfIdsToDisplay,
                appliedFilters: null,
                whichFiltersApplied: {}
            });
        }
    };

    calculateTotalShoppingCartPrice = () => {
        let sum = 0.0;

        this.state.shoppingCartProducts.forEach(cartItem => {
            sum += (cartItem.product.currentPrice*cartItem.quantity);
        });

        return sum;
    };

    addProductToCart = (product, quantity) => {
        console.dir(product, quantity);

        let newShoppingCartProducts = [
            ...this.state.shoppingCartProducts
        ];

        newShoppingCartProducts.push({
            product,
            quantity,
        });

        this.setState({
            shoppingCartProducts: newShoppingCartProducts,
        });
    };

    removeProductOfIdFromCart = (productId) => {
        let newShoppingCartProducts = [
            ...this.state.shoppingCartProducts
        ];

        const filteredItems = newShoppingCartProducts.filter(
            cartItemNew => {
                return productId !== cartItemNew.product.id
            });

        this.setState({
            shoppingCartProducts: filteredItems
        });
    };

    /**
     * Output of below function should look like this:
     *     {
     *        productId: 4
     *        quantity: 1
     *        singlePrice: "10"
     *      },
     *      {
     *        productId: 5
     *        quantity: 1
     *        singlePrice: "10"
     *      }
     */
    getProductsInCartFormatted = () => {
        const productsInShoppingCart = this.state.shoppingCartProducts;

        const formattedProducts = map(productsInShoppingCart, cartItem => {
            return `
                {
                    productId: ${cartItem.product.id}
                    quantity: ${cartItem.quantity}
                    singlePrice: \"${cartItem.product.currentPrice}\"
                }
            `
        });

        return join(formattedProducts, ',\n');
    };

    placeOrder = (shippingAddress) => {
        const {
            streetAddress,
            city,
            zipCode
        } = shippingAddress;
        const shippingAddressFormatted = `${streetAddress} ${city} ${zipCode}`;
        const productsInCartFormatted = this.getProductsInCartFormatted();

        if(isDemo) {
            message.success(`Order placed! Redirecting...`);
            window.location.href = `/order-success/1`;
        } else {
            placeOrder(shippingAddressFormatted, productsInCartFormatted).then(response => {
                const placedOrderId = response.data.createOrder.order.id;
                message.success(`Order placed! Redirecting...`);
                window.location.href = `/order-success/${placedOrderId}`;
            });
        }
    };

    render() {
        const LayoutContentWrapper = props => <Layout style={{padding: '24px 0', background: '#fff'}}>
            {props.sideChildren}

            <Content style={{padding: '0 24px', minHeight: 280}}>
                {props.children}
            </Content>
        </Layout>;

        return (
            <ApolloProvider client={apolloClient}>
                <Router>
                    <Layout>
                        <MyHeader/>
                        <Affix offsetTop={10} style={{ position: 'absolute', top: 80, right: 10 }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.showShoppingCartModal()
                                }}
                            >
                                <Icon type="shopping-cart" />
                            </Button>
                        </Affix>
                        <Modal
                            title="Shopping cart"
                            visible={this.state.shoppingCartVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            width={800}
                            footer={<span>
                                <Button
                                    type="primary"
                                    className="checkout-button"
                                    onClick={this.handleCancel}
                                >
                                    <Link to='/checkout'>
                                        Checkout
                                    </Link>
                                </Button>
                                <Icon type="dollar" /> Total price: {this.calculateTotalShoppingCartPrice()}
                            </span>}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.shoppingCartProducts}
                                renderItem={cartItem => (
                                    <List.Item
                                        extra={
                                            <div className="extra-shopping-cart-content">
                                                {getProductPriceSummary(cartItem.product.currentPrice, cartItem.quantity)}
                                                <hr/>
                                                <div className="actions">
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            this.removeProductOfIdFromCart(cartItem.product.id)
                                                        }}
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
                        </Modal>
                        <Content style={{padding: '0 50px'}}>
                            <MyBreadcrumbs breadcrumbs={this.state.breadcrumbs} />

                                <Switch>
                                    <Route path="/register" render={
                                        () => <LayoutContentWrapper>
                                            <RegisterScreen
                                                setBreadcrumbs={this.setBreadcrumbs}
                                            />
                                        </LayoutContentWrapper>
                                    }/>
                                    <Route path="/sign-in" render={
                                        () => <LayoutContentWrapper>
                                            <LoginScreen />
                                        </LayoutContentWrapper>
                                    }/>
                                    <Route path="/order-success/:id" render={
                                        (props) => <LayoutContentWrapper>
                                            <OrderSuccess
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                            />
                                        </LayoutContentWrapper>
                                    }/>
                                    <Route path="/product/:id" render={
                                        (props) => <LayoutContentWrapper>
                                            <ProductDetailsParent
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                                addProductToCart={this.addProductToCart}
                                            />
                                        </LayoutContentWrapper>
                                    }/>
                                    <Route path="/checkout" render={
                                        (props) => <LayoutContentWrapper>
                                            <CheckoutComponent
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                                addProductToCart={this.addProductToCart}
                                                shoppingCartProducts={this.state.shoppingCartProducts}
                                                calculateTotalShoppingCartPrice={this.calculateTotalShoppingCartPrice}
                                                placeOrder={this.placeOrder}
                                            />
                                        </LayoutContentWrapper>
                                    }/>
                                    <Route path="/orders" render={
                                        (props) => <LayoutContentWrapper>
                                            <OrdersList
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                            />
                                        </LayoutContentWrapper>
                                    } />
                                    <Route path="/add-new-product" render={
                                        (props) => <LayoutContentWrapper>
                                            <AddNewProduct
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                            />
                                        </LayoutContentWrapper>
                                    } />
                                    <Route path="/admin" render={
                                        (props) => <LayoutContentWrapper>
                                            <AdminPanel
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                            />
                                        </LayoutContentWrapper>
                                    } />
                                    <Route path="/" render={
                                        (props) => <LayoutContentWrapper
                                            sideChildren={<MySideMenu setListOfIdsFilter={this.setListOfIdsFilter} />}
                                        >
                                                {
                                                    !isEqual(this.state.appliedFilters, null) &&
                                                    <div className="applied-filters-section">
                                                        <span className='applied-filters-label'>Applied filters: </span>
                                                        {Object.entries(this.state.whichFiltersApplied).map(
                                                            ([key, value]) => {
                                                                if(value) {
                                                                    return <span className="filter-entry"><b>{key}</b>: {this.state.appliedFilters[key]} </span>
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                }
                                            <MainView
                                                {...props}
                                                setBreadcrumbs={this.setBreadcrumbs}
                                                listOfIdsToDisplay={this.state.listOfIdsToDisplay}
                                                addProductToCart={this.addProductToCart}
                                                appliedFilters={this.state.appliedFilters}
                                            />
                                        </LayoutContentWrapper>
                                    } />
                                </Switch>

                        </Content>
                        <Footer style={{textAlign: 'center'}}>Szymon Sadowski ©2020</Footer>
                    </Layout>
                </Router>
            </ApolloProvider>
        );
    }

}

export default App;
