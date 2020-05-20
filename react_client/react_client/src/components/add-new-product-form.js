import {Form, Input, Button, InputNumber, message} from 'antd';
import React from "react";
import {FileUpload} from "./file-upload";
import {createProduct} from "../api/custom-queries";
import get from "lodash/get";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddNewProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.fileUploadChild = React.createRef();
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const handleCreatingProduct = (functionParameters) => {
                    createProduct(functionParameters).then(response => {
                        message.success(`Created product of id: ${get(response, 'data.createProduct.product.id')}`);
                    });
                };

                if(get(this.fileUploadChild.current, 'state.fileList.length') > 0) {
                    this.fileUploadChild.current.handleUpload((uploadedLocations) => {
                        handleCreatingProduct({
                            ...values,
                            illustrativeMediaUrl: uploadedLocations
                        });
                    });
                } else {
                    handleCreatingProduct({
                        ...values,
                        illustrativeMediaUrl: ""
                    });
                }
            } else {
                message.error("Couldn't validate form fields!");
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>

                <Form.Item label="Product name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your product name!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Product description">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your product description!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Product price">
                    {getFieldDecorator('currentPrice', {
                        rules: [
                            {
                                type: 'number',
                                message: 'The input is not a valid number!',
                            },
                            {
                                required: true,
                                message: 'Please input your product price!',
                            },
                        ]
                    })(<InputNumber
                        min={0}
                    />)}
                </Form.Item>

                <Form.Item label="Product tags (separated by newline)">
                    {getFieldDecorator('tags', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your product tags!',
                            },
                        ]
                    })(<Input.TextArea rows={4} />)}
                </Form.Item>

                <Form.Item label="Select images to upload">
                    <FileUpload ref={this.fileUploadChild} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Submit product
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

const WrappedAddNewProductForm = Form.create({ name: 'horizontal_login' })(AddNewProductForm);
export default WrappedAddNewProductForm;