import React, {Component} from "react";

import {Dropdown, Icon, Layout, Menu, message, Spin} from 'antd';
import {getCurrentUser, doesUserHaveAdminAccess, logout} from "../common/session";
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

const {Header} = Layout;

class MyHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
        }
    }

    handleLogout = () => {
        this.setState({isProcessing: true});
        message.success("Logging out...");
        logout();
        this.props.history.push("/");
        this.setState({isProcessing: false});
        window.location.reload();
    };

    renderUserDropdown(currentUser) {
        const userSubMenu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        My account
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/orders">My orders</Link>
                </Menu.Item>
                {
                    doesUserHaveAdminAccess() &&
                    <Menu.Item>
                        <Link to="/admin">Administrator panel</Link>
                    </Menu.Item>
                }
                <Menu.Item>
                    <span onClick={this.handleLogout}>Logout</span>
                </Menu.Item>
            </Menu>
        );

        return <div className="pull-right user-dropdown" onClick={() => {
        }}>
            <Dropdown overlay={userSubMenu}>
                <a className="ant-dropdown-link" href="#">
                    <Icon type="user"/> {currentUser.username} <Icon type="down"/>
                </a>
            </Dropdown>
        </div>;
    }

    renderSignInOptions() {
        return <Menu.Item key="sign-in" className="pull-right">
            <Link to="/sign-in">Sign In</Link>
        </Menu.Item>;
    }

    render() {
        if(this.state.isProcessing) {
            return <Spin />
        } else {
            const currentUser = getCurrentUser();

            return <Header className="header">
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="home"><Link to="/">Simple E-Commerce</Link></Menu.Item>
                    {
                        currentUser ?
                            this.renderUserDropdown(currentUser) :
                            this.renderSignInOptions()
                    }
                    <Menu.Item className="pull-right register-tab">
                        <Link to="/register">
                            Register
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>;
        }
    }
}

export default withRouter(MyHeader);