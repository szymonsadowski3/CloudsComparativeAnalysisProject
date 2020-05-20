import ApolloClient from 'apollo-boost';
import {graphQlUrl} from "../config/cfg";
import { createMockClient } from 'mock-apollo-client';
import {
    ALL_PRODUCTS_QUERY,
    allProductsResponse,
    BRAND_ONLY_QUERY,
    brandsResponse,
    TAGS_ONLY_QUERY,
    tagsResponse,
    productByIdMocks,
    pricesResponse,
    PRICES_QUERY,
    ALL_BOUGHT_PRODUCTS_QUERY,
    allBoughtProductsResponse,
    PRODUCTS_USER_ALREADY_RATED_QUERY,
    productsUserAlreadyRatedResponse, ORDER_QUERY, orderByIdResponse, ORDERS_PER_USER_QUERY, ordersPerUserResponse,
} from "../mock/mocks";


let apolloClient = createMockClient();

let mocks = [
    [ALL_PRODUCTS_QUERY, allProductsResponse],
    [BRAND_ONLY_QUERY, brandsResponse],
    [TAGS_ONLY_QUERY, tagsResponse],
    [PRICES_QUERY, pricesResponse],
    [ALL_BOUGHT_PRODUCTS_QUERY, allBoughtProductsResponse],
    [PRODUCTS_USER_ALREADY_RATED_QUERY, productsUserAlreadyRatedResponse],
    [ORDER_QUERY, orderByIdResponse],
    [ORDERS_PER_USER_QUERY, ordersPerUserResponse],
    ...productByIdMocks,
];

for(const mockEntry of mocks) {
    apolloClient.setRequestHandler(
        mockEntry[0],
        () => Promise.resolve(mockEntry[1])
    );
}




// export const isDemo = true;
export const isDemo = true;

if(!isDemo) {
    apolloClient = new ApolloClient({
        uri: graphQlUrl,
    });
}

export {
    apolloClient
};