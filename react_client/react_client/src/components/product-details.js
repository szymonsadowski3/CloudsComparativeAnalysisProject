import './styles/product-details.css';
import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {Button, Carousel, Col, message, Rate, Row, Tag} from "antd";
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import RatingComment from "./rating-comment";
import {UtilityComponents} from "./utility-components";
import OptionalAddReviewSection from "./optional-add-review-section";
import {
    getRandomColor,
    getAverageRatingFromProductByIdQuery,
    getRatingsFromProductByIdQuery
} from "../utils/common-utils";


export default function ProductDetails({productId, addProductToCart}) {
    const PRODUCT_BY_ID_QUERY = gql`
      {
          productById(id:${productId}) {
              id
              brand
              name
              description
              currentPrice
              illustrativeMediaUrl
              createdAt
              tags
              productratingsByProductId {
                edges {
                  node {
                    id
                    ratingByRatingId {
                      userByRatedById {
                        username
                        avatarUrl
                      }
                      rating
                      comment
                    }
                  }
                }
              }
          }
        }
    `;

    const {loading, error, data} = useQuery(PRODUCT_BY_ID_QUERY);

    if (loading) return <UtilityComponents/>;
    if (error) return <p>Error :(</p>;

    console.dir(data);

    const product = data.productById;
    console.dir(product);

    const ratingsAndComments = getRatingsFromProductByIdQuery(product);

    const averageRating = getAverageRatingFromProductByIdQuery(product);
    const averageRatingText = isEqual(averageRating, NaN) ? 'No ratings yet': averageRating;

    return <Row>
        <Col span={12}>
            <Carousel
                afterChange={() => {
                }}
                variableWidth={true}
            >
                {
                    map(product.illustrativeMediaUrl, url => {
                        return <div className="slide-wrapper">
                            <img alt="example"
                                 src={url}
                                 width={400}
                                 height={400}
                            />
                        </div>;
                    })
                }

            </Carousel>
        </Col>
        <Col span={12}>
            <div className="add-to-cart-section">
                <Button
                    type="primary"
                    icon="plus"
                    onClick={() => {
                        addProductToCart(product, 1);
                        message.success("Product added to cart!");
                    }}
                    className='add-to-cart-button'
                >
                    Add to cart
                </Button>
            </div>
            <div className='name-section'>
                <span className="product-name">
                    {product.name}
                </span>
                <span className='product-rating'>
                    <Rate
                        allowHalf
                        value={averageRating}
                        disabled={true}
                    />
                    <span className='product-rating-text'>{averageRatingText}</span>
                </span>
            </div>

            <div className='brand-section'>
                <span className="label brand-label">Brand: </span>
                <span className="brand-name">{product.brand}</span>
            </div>

            <div className="tags-section">
                <span className="tags-label">Contains tags: </span>

                {
                    map(product.tags, tag => {
                        return <Tag color={getRandomColor()}>{tag}</Tag>
                    })
                }
            </div>

            <div className="price-section">
                <span className="label">Price: </span>
                <span className="price-text">{product.currentPrice} PLN</span>
            </div>

            <div className="description-section">
                <span className="label">Description: </span>
                <p className="description-text">
                    {product.description}
                </p>
            </div>

            <div className="comments-section">
                <span className="label">Reviews: </span>
                {
                    map(ratingsAndComments, ({rating, comment, user}) => {
                        return <RatingComment
                            rating={rating}
                            comment={comment}
                            user={user}
                        />
                    })
                }
            </div>

            <hr/>

            <OptionalAddReviewSection
                productId={productId}
            />
        </Col>
    </Row>;
}