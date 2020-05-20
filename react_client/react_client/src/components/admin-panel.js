import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {UtilityComponents} from "./utility-components";
import {Button, Input, message, Popconfirm} from 'antd';
import {EditableFormTable} from "./my-products-table";
import join from "lodash/join";
import {Link} from "react-router-dom";
import {addReview} from "../api/custom-queries";
import {getCurrentUser, getNewsletterRecipients} from "../common/session";
import {sendEmail} from "../api/api-fetch";

const ALL_PRODUCTS_QUERY = gql`
  {
  allProducts {
    edges {
      node {
        id
        name
        description
        currentPrice
        illustrativeMediaUrl
        createdAt
        tags
      }
    }
  }
}
`;

function mapEdge(edge) {
    const nodeToReturn = {
        ...edge.node
    };

    nodeToReturn.illustrativeMediaUrl = join(nodeToReturn.illustrativeMediaUrl, ',');
    nodeToReturn.tags = join(nodeToReturn.tags, ',');

    return nodeToReturn;
}

export default function AdminPanel({setBreadcrumbs}) {
    setBreadcrumbs([
        {name: 'home', url: '/'},
        {name: 'admin', url: false},
    ]);

    const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);

    if (loading) return <UtilityComponents />;
    if (error) return <p>Error :(</p>;

    const mappedData = data.allProducts.edges.map(edge => mapEdge(edge));

    return <div className="admin-panel">
        <Button type="primary" className="add-new-product-button">
            <Link to="/add-new-product">Add a new product</Link>
        </Button>
        <hr/>
        <h3>Edit products</h3>
        <EditableFormTable dataToDisplay={mappedData}/>
        <hr/>
        <h3>Send newsletter</h3>
        <div className="newsletter-section">
            <Input.TextArea
                rows={2}
                value={
                    this.state.newsletterText
                }
                onChange={event => {
                    this.setState({
                        newsletterText: event.target.value
                    })
                }}
            />

            <Popconfirm
                title="Are you sure you want to submit the newsletter?"
                onConfirm={() => {
                    sendEmail(
                        [],
                        getNewsletterRecipients(),
                        'E-commerce Newsletter',
                        null,
                        '<h3>E-commerce Newsletter</h3>' +
                        '<hr/>' +
                        `<p>${this.state.newsletterText}</p>`).then(() => {
                            message.success("Newsletter sent!")
                    }).catch(error => {
                        message.error('Some error ocurred!');
                    });
                }}
                onCancel={() => {message.success('canceled')}}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    className='submit-your-rating-button'
                    type="primary"
                >
                    Submit the newsletter
                </Button>
            </Popconfirm>
        </div>
    </div>;
}