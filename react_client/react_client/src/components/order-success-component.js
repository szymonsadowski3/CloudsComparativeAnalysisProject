import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {UtilityComponents} from "./utility-components";
import {OrderItem} from "./order-item";
import map from "lodash/map";

export default function OrderSuccess({match, setBreadcrumbs}) {
    setBreadcrumbs([
        {name: 'home', url: '/'},
        {name: 'orders', url: false},
        {name: match.params.id},
    ]);

    const ORDER_QUERY = gql`
      {
      orderById(id: ${match.params.id}) {
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
    `;

    const { loading, error, data } = useQuery(ORDER_QUERY);

    if (loading) return <UtilityComponents />;
    if (error) {
        console.error(error);
        return <p>Error :(</p>;
    }

    const order = {
        ...data.orderById
    };

    order.orderProducts = map(order.orderproductsByOrderId.edges, edge => edge.node);

    console.dir(order);

    return <div className="order-success">
        <h3>Congratulations! You have made order {match.params.id}</h3>
        <hr/>
        <h4>Below is order summary:</h4>
        <OrderItem order={order} />
    </div>;
}