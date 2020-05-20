import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {UtilityComponents} from "./utility-components";
import {gql} from 'apollo-boost';
import map from "lodash/map";
import get from "lodash/get";
import {Avatar, Icon, List} from "antd";
import {formatDateTimeString} from "../utils/common-utils";
import {Link} from "react-router-dom";
import {OrderItem} from "./order-item";
import {getCurrentUser} from "../common/session";


export default function OrdersList({setBreadcrumbs}) {
    setBreadcrumbs([
        {name: 'home', url: '/'},
        {name: 'orders', url: false},
    ]);

    const ORDERS_PER_USER_QUERY = gql`
        {
          allUsers(filter: {username: {equalTo: "${getCurrentUser().username}"}}) {
            edges {
              node {
                id
                ordersByUserId {
                  edges {
                    node {
                      id
                      status
                      shippingAddress
                      createdAt
                      orderproductsByOrderId {
                        edges {
                          node {
                            id
                            quantity
                            singlePrice
                            productByProductId {
                              id
                              name
                              illustrativeMediaUrl
                              brand
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `;

    const {loading, error, data} = useQuery(ORDERS_PER_USER_QUERY);

    if (loading) return <UtilityComponents />;
    if (error) return <p>Error :(</p>;

    console.dir(data);

    const orders = map(get(data, 'allUsers.edges[0].node.ordersByUserId.edges'), edge => {
        const orderProducts = edge.node.orderproductsByOrderId.edges.map(edge => {
            return edge.node;
        });

        const {
            id,
            status,
            shippingAddress,
            createdAt,
        } = edge.node;

        return {
            id,
            status,
            shippingAddress,
            createdAt,
            orderProducts,
        }
    });

    return <div className="orders-list">
        <h2>Your orders <Icon type="snippets" /></h2>
        {
            map(orders, order => {
                return <OrderItem order={order} />;
            })
        }
    </div>;
}