import React, {Component} from "react";

import {Button, Form, Input, message} from 'antd';
import {login} from "../api/api-fetch";
import {setSession} from "../common/session";
import { withRouter } from 'react-router-dom';
import {CenterSpin} from "./utility-components";
import {isDemo} from "../common/apollo-client";



const FAILED_LOGIN_MESSAGE = "Couldn't log in!";

class LoginScreenForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
        }
    }

    handleSubmit = e => {
        this.setState({isProcessing: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { name, password } = values;
                
                if(isDemo) {
                    this.setState({isProcessing: true});
                    setTimeout(() => {
                        setSession({
                            username: name,
                            userId: 1,
                        });

                        this.props.history.push('/');
                        this.setState({isProcessing: false});
                    }, 1000);
                } else {
                    login(name, password).then(result => {
                        if('jwtToken' in result) {
                            setSession(result);
                            this.props.history.push('/');
                        } else {
                            message.error(`${FAILED_LOGIN_MESSAGE} Reason: ${result.message}`);
                        }

                        this.setState({isProcessing: false});
                    }).catch(error => {
                        console.error(error);
                        message.error(FAILED_LOGIN_MESSAGE);
                        this.setState({isProcessing: false});
                    });
                }
                
            } else {
                console.error(err);
                this.setState({isProcessing: false});
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        if(this.state.isProcessing) {
            return <CenterSpin />;
        } else {
            return <div className="login-screen-wrapper">
                <h3>Sign in</h3>

                <Form layout="horizontal" onSubmit={this.handleSubmit}>

                    <Form.Item
                        label="Username"
                    >
                        {getFieldDecorator('name', {
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

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>;
        }
    }
}

const LoginScreen = withRouter(Form.create({ name: 'horizontal_login' })(LoginScreenForm));
export default LoginScreen;