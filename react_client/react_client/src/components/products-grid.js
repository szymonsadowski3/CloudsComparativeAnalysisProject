import React from 'react';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import difference from 'lodash/difference';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProductCard from "./product-card";
import {UtilityComponents} from "./utility-components";
import {ALL} from "../common/definitions";
import {isDemo} from "../common/apollo-client";
import {findValuesInNestedObject} from "../utils/common-utils";

const ALL_PRODUCTS_QUERY = gql`
  {
  allProducts(first:20) {
    edges {
      node {
        id
        name
        description
        currentPrice
        illustrativeMediaUrl
        createdAt
        tags
        brand
      }
    }
  }
}
`;

function getProductsFilteredById(listOfIds) {
    console.dir('here');
    return gql`{
      allProducts(filter: {id: {in: ${JSON.stringify(listOfIds)}}}) {
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
}

export default function ProductsGrid({listOfIdsToDisplay, appliedFilters, addProductToCart}) {
    const shouldFetchAllProducts = (listOfIdsToDisplay === ALL) || isDemo;

    const queryToUse = shouldFetchAllProducts ?
        ALL_PRODUCTS_QUERY:
        getProductsFilteredById(listOfIdsToDisplay);

    console.dir(queryToUse);

    let { loading, error, data } = useQuery(queryToUse);

    if (loading) return <UtilityComponents />;
    if (error) return <p>Error :(</p>;

    if(isDemo) {
        const includesArray = (outer, inner) => {
            return difference(inner, outer).length === 0
        };

        const filteredEdges = data.allProducts.edges.filter(edge => {
            const currentPrice = get(findValuesInNestedObject(edge, "currentPrice"), '0');
            const brand = get(findValuesInNestedObject(edge, "brand"), '0');
            const tags = get(findValuesInNestedObject(edge, "tags"), '0');
            const productName = get(findValuesInNestedObject(edge, "name"), '0');

            const isPriceBetween = (!get(appliedFilters, 'priceFrom')|| !get(appliedFilters, 'priceTo')) ||
                ((currentPrice > get(appliedFilters, 'priceFrom')) && (currentPrice < get(appliedFilters, 'priceTo')));

            const isEqualBrand = !get(appliedFilters, 'brand') || (isEqual(brand, get(appliedFilters, 'brand')));

            const includesTags = !get(appliedFilters, 'tags') || (includesArray(tags, get(appliedFilters, 'tags')));

            const isEqualProductName = !get(appliedFilters, 'productName') || (includes(productName, get(appliedFilters, 'productName')));

            return isPriceBetween &&
                isEqualBrand &&
                includesTags &&
                isEqualProductName;
        });

        data = {
            allProducts: {
                edges: filteredEdges
            }
        }
    }

    return data.allProducts.edges.map( (product) => {
        return <ProductCard product={product} addProductToCart={addProductToCart} />
    });
}