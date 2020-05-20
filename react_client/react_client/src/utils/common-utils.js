import isEqual from "lodash/isEqual";
import React from "react";
import sample from "lodash/sample";

export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

export function mapGraphQlRawResultToListOfIds(result) {
    return result.data.allProducts.edges.map(edge => {
        return edge.node.id;
    });
}

export const getUniqueItems = (items) => {
    return [...new Set(items)];
};

export const breadcrumbsEqual = (left, right) => {
    if (left.length !== right.length) {
        return false;
    }

    for (let i = 0; i < left.length; i++) {
        if (!isEqual(left.name, right.name) && isEqual(left.url, right.url)) {
            return false;
        }
    }

    return true;
};

export function roundTwoDecimals(inputNum) {
    return Math.round(inputNum * 100) / 100;
}

export function formatDateTimeString(dateTimeString) {
    return new Date(dateTimeString).toDateString();
}

export function sumArray(inputArray) {
    return inputArray.reduce((a, b) => a + b, 0);
}

export const findValuesInNestedObject = (o, prop) =>
    (res => (
            JSON.stringify(o, (key, value) =>
                (key === prop && res.push(value), value)), res)
    )([]);

export function getProductPriceSummary(productPrice, quantity) {
    console.dir(productPrice);
    return <span>Single price = {productPrice} <br/> Sum product price = {roundTwoDecimals(productPrice*quantity)}</span>;
}

export function getRandomColor() {
    const colors = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
    ];

    return sample(colors);
}

function roundHalf(num) {
    return Math.round(num*2)/2;
}

export function getRatingsFromProductByIdQuery(product) {
    return product.productratingsByProductId.edges.map(
        edge => {
            return {
                rating: edge.node.ratingByRatingId.rating,
                comment: edge.node.ratingByRatingId.comment,
                user: edge.node.ratingByRatingId.userByRatedById,
            }
        }
    )
}

export function getAverageRatingFromProductByIdQuery(product) {
    const ratingValues = product.productratingsByProductId.edges.map(
        edge => edge.node.ratingByRatingId.rating
    );

    return roundHalf(average(ratingValues));
}