import {Form, Input} from 'antd';
import React from "react";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ShippingAddressForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.dir(values);
            } else {
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="Recipient name and surname">
                    {getFieldDecorator('recipientNameAndSurname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input recipient name and surname!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Street address">
                    {getFieldDecorator('streetAddress', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input street address!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="City">
                    {getFieldDecorator('city', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input city!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Zip code">
                    {getFieldDecorator('zipCode', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input zip code!',
                            },
                        ]
                    })(<Input />)}
                </Form.Item>
            </Form>
        );
    }
}

const WrappedShippingAddressForm = Form.create({ name: 'horizontal_login' })(ShippingAddressForm);
export default WrappedShippingAddressForm;