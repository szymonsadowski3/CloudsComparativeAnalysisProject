import React, {Component} from "react";
import {register} from "../api/api-fetch";
import get from "lodash/get";
import { withRouter } from "react-router";

import {Button, Form, Input, message} from 'antd';
import {isDemo} from "../common/apollo-client";


class RegisterScreenForm extends Component {
    constructor(props) {
        super(props);

        this.props.setBreadcrumbs([
            {name: 'home', url: '/'},
            {name: 'register', url: false},
        ]);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, username, password } = values;

                if(isDemo) {
                    message.success(`Hello ${username}! You are now registered... 
                        You will now be redirected to sign-in page`);
                    this.props.history.push("/sign-in");
                } else {
                    register(email, username, password).then(result => {
                        console.dir(result);
                        const retrievedUsername = get(result, 'user.username');
                        if(retrievedUsername) {
                            message.success(`Hello ${retrievedUsername}! You are now registered... 
                        You will now be redirected to sign-in page`);
                            this.props.history.push("/sign-in");
                        } else {
                            message.error('Something went wrong!');
                        }
                    }).catch(error => {
                        console.error(error);
                        message.error('Something went wrong!');
                    });
                }
            } else {
                console.error(err);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return <div className="login-screen-wrapper">
            <h3>Register</h3>

            <Form layout="horizontal" onSubmit={this.handleSubmit}>

                <Form.Item
                    label="Email"
                >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }]
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }]
                    })(<Input.Password />)}
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                asyncValidator: (rule, value) => {
                                    if (!value || this.props.form.getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                                message: `The two passwords that you entered do not match!`,
                            },
                        ],
                        dependencies: ['password'],
                        hasFeedback: true
                    })(<Input.Password />)}
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>;
    }
}

const RegisterScreen = withRouter(Form.create({ name: 'horizontal_login' })(RegisterScreenForm));
export default RegisterScreen;