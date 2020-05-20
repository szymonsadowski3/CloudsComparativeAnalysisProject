import React, {Component} from "react";

import {Breadcrumb} from 'antd';
import {Link} from "react-router-dom";

export default class MyBreadcrumbs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Breadcrumb style={{margin: '16px 0'}}>
            {this.props.breadcrumbs.map(breadcrumb => {
                return breadcrumb.url ?
                    <Breadcrumb.Item>
                        <Link to={breadcrumb.url}>
                            <span className="my-link">
                                {breadcrumb.name}
                            </span>
                        </Link>
                    </Breadcrumb.Item> :
                    <Breadcrumb.Item>{breadcrumb.name}</Breadcrumb.Item>;
            })}
        </Breadcrumb>;
    }
}