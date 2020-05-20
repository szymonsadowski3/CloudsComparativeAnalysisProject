import React, {Component} from "react";
import WrappedAddNewProductForm from "./add-new-product-form";

export default class AddNewProduct extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <div className="add-new-product">
            <h3>Add a new product</h3>

            <div className="new-product-form-wrapper">
                <WrappedAddNewProductForm />
            </div>
        </div>
    }
}