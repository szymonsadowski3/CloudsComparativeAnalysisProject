import {gql} from 'apollo-boost';
import {apolloClient} from "../common/apollo-client";
import {average, findValuesInNestedObject, getUniqueItems} from "../utils/common-utils";
import flatten from "lodash/flatten";
import map from "lodash/map";
import get from "lodash/get";
import stringifyObject from 'stringify-object';
import {getCurrentUser} from "../common/session";


const RATING_QUERY = gql`{
  allProducts {
    edges {
      node {
        id
        productratingsByProductId {
          edges {
            node {
              id
              ratingByRatingId {
                rating
              }
            }
          }
        }
      }
    }
  }
}
`;

export function getProductIdsAndTheirAvgRatings() {
    return apolloClient
        .query({query: RATING_QUERY})
        .then(result => {
            const edges = result.data.allProducts.edges;

            const averageRatingAndIdForEdge = edges.map(edge => {
                const ratingEdges = edge.node.productratingsByProductId.edges;
                const ratings = ratingEdges.map(ratingEdge => {
                    return ratingEdge.node.ratingByRatingId.rating;
                });
                return {
                    average: average(ratings),
                    id: edge.node.id,
                };
            });

            return averageRatingAndIdForEdge;
        });
}

export function getProductsIdsInPriceRange(priceFrom, priceTo) {
    const PRICE_RANGE_QUERY = gql`{
  allProducts(filter: {currentPrice: {greaterThan: \"${priceFrom}\", lessThan: \"${priceTo}\"}}) {
    edges {
      node {
        id
      }
    }
  }
}`;


    return apolloClient
        .query({query: PRICE_RANGE_QUERY});
}

export function getProductsIdsByBrand(brand) {
    const FILTER_BY_BRAND_QUERY = gql`{
      allProducts(filter: {brand: {equalTo: "${brand}"}}) {
        edges {
          node {
            id
          }
        }
      }
    }`;


    return apolloClient
        .query({query: FILTER_BY_BRAND_QUERY});
}

export function getProductsIdsByTags(tags) {
    const FILTER_BY_TAGS_QUERY = gql`
    {
      allProducts(filter: {tags: {contains: ${JSON.stringify(tags)}}}) {
        edges {
          node {
            id
            tags
          }
        }
      }
    }
    `;

    return apolloClient
        .query({query: FILTER_BY_TAGS_QUERY});
}

export function getProductsIdsByNameRegex(name) {
    const FILTER_BY_NAME_REGEX_QUERY = gql`
        {
      allProducts(filter: {name: {like: "%${name}%"}}) {
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
    }`;

    return apolloClient
        .query({query: FILTER_BY_NAME_REGEX_QUERY});
}

export function getUsers() {
    const USERS_QUERY = gql`
    {
      allUsers {
        edges {
          node {
            id
            username
          }
        }
      }
    }`;

    return apolloClient
        .query({query: USERS_QUERY});
}

export function canUserRateProduct(user, productId) {
    const ALL_BOUGHT_PRODUCTS_QUERY = gql`
    {
      userById(id: ${user.id}) {
        ordersByUserId {
          edges {
            node {
              orderproductsByOrderId {
                edges {
                  node {
                    productByProductId {
                      id
                      name
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

    return apolloClient
        .query({query: ALL_BOUGHT_PRODUCTS_QUERY}).then(response => {
            let productsEverBoughtByUser = findValuesInNestedObject(response, "productByProductId");
            const productIdsEverBoughtByUser = map(productsEverBoughtByUser, product => {
               return get(product, 'id');
            });

            if(productIdsEverBoughtByUser.length > 0) {
                return productIdsEverBoughtByUser.includes(productId);
            } else {
                return false;
            }
        });
}

export function whatProductsUserAlreadyRated(user) {
    const PRODUCTS_USER_ALREADY_RATED_QUERY = gql`
    {
        userById(id: ${user.id}) {
          ratingsByRatedById {
            edges {
              node {
                productratingsByRatingId {
                  edges {
                    node {
                      productId
                    }
                  }
                }
              }
            }
          }
        }
      }`;

    return apolloClient
        .query({query: PRODUCTS_USER_ALREADY_RATED_QUERY}).then(response => {
            const edges = response.data.userById.ratingsByRatedById.edges;
            return findValuesInNestedObject(edges, "productId");
        });
}



// <DISTINCT QUERIES>
export function getDistinctBrands() {
    const BRAND_ONLY_QUERY = gql`{
  allProducts {
    edges {
      node {
        brand
      }
    }
  }
}`;

    return apolloClient
        .query({query: BRAND_ONLY_QUERY})
        .then(result => {
            const brandsList = result.data.allProducts.edges.map(edge => {
                return edge.node.brand;
            });

            return getUniqueItems(brandsList);
        });
}

export function getDistinctTags() {
    const TAGS_ONLY_QUERY = gql`{
      allProducts {
        edges {
          node {
            tags
          }
        }
      }
    }`;

    return apolloClient
        .query({query: TAGS_ONLY_QUERY})
        .then(result => {
            const tagsList = result.data.allProducts.edges.map(edge => {
                return edge.node.tags;
            });

            const tagsListFlattened = flatten(tagsList);

            return getUniqueItems(tagsListFlattened);
        });
}
// </ DISTINCT QUERIES>


// <MUTATION QUERIES>
export function addReview(productId, user, rating, comment) {
    const MUTATION_QUERY = gql`
    mutation {
      createRating(
        input: {
            rating: {
                rating: ${rating},
                ratedById: ${user.id},
                comment: "${comment}",
                createdAt: "now",
                productratingsUsingId: {
                    create: {productId: ${productId}}
                }
            }
        }
      ) {
        rating {
          id
          nodeId
          rating
          ratedById
          comment
        }
      }
    }
    `;

    return apolloClient.mutate({
        variables: { text: "hello" },
        mutation: MUTATION_QUERY,

    });
}

export function updateItemInBackend(editedId, itemToUpdate) {
    const objectConvertedToString = stringifyObject(itemToUpdate, {
        singleQuotes: false
    });

    const UPDATE_ITEM_QUERY = gql`
    mutation {
      updateProductById(
        input: {id: ${editedId}, productPatch: ${objectConvertedToString}}
      ) {
        product {
          id
          name
          description
        }
      }
    }
    `;

    return apolloClient.mutate({
        mutation: UPDATE_ITEM_QUERY,
    });
}

export function deleteProductById(productId) {
    const DELETE_PRODUCT_QUERY = gql`
    mutation {
      deleteProductById(
        input: {id: ${productId}}
      ) {
        product {
          id
        }
      }
    }
    `;

    return apolloClient.mutate({
        mutation: DELETE_PRODUCT_QUERY,
    });
}

export function createProduct({name, description, currentPrice, illustrativeMediaUrl, tags, brand}) {
    console.dir({name, description, currentPrice, illustrativeMediaUrl, tags, brand});

    const ADD_PRODUCT_QUERY = gql`
    mutation {
      createProduct(
        input:{ product: {
          name: "${name}"
          description: "${description}"
          currentPrice: "${currentPrice}"
          illustrativeMediaUrl: "${illustrativeMediaUrl}"
          createdAt: "now"
          tags: "${tags}"
          brand: "${brand}"
        } }
      ) {
         product {
          id
        }
      }
    }
    `;

    console.dir(ADD_PRODUCT_QUERY);

    return apolloClient.mutate({
        mutation: ADD_PRODUCT_QUERY,
    });
}

export function placeOrder(shippingAddressFormatted, productsInCartFormatted) {
    const PLACE_ORDER_QUERY_TEMPLATE = gql`
    mutation {
      createOrder(
        input: {
            order: {
              status: "awaiting_payment"
              shippingAddress: \"${shippingAddressFormatted}\"
              createdAt: "now"
              updatedAt: "now"
              userToUserId: {
                connectById: {id: ${getCurrentUser().id}}
              }
              orderproductsUsingId: {
                create: [
                  ${productsInCartFormatted}
                ]
              }
            }
        }
      ) {
        order {
          id
        }
      }
    }
    `;

    return apolloClient.mutate({
        mutation: PLACE_ORDER_QUERY_TEMPLATE,
    });
}
// < /MUTATION QUERIES>