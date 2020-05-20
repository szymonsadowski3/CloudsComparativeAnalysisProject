import React, {Component} from 'react';
import ProductsGrid from "./products-grid";


class MainView extends Component {
    constructor(props) {
        super(props);

        this.props.setBreadcrumbs([
            {name: 'home', url: '/'},
        ]);
    }

    render() {
        return (
            <ProductsGrid
                listOfIdsToDisplay={this.props.listOfIdsToDisplay}
                appliedFilters={this.props.appliedFilters}
                addProductToCart={this.props.addProductToCart}
            />
        );
    }

}

export default MainView;
