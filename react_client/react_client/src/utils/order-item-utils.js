import {ORDER_STATUS, ORDER_STATUS_DESCRIPTION} from "../common/definitions";
import {getProductPriceSummary, sumArray} from "./common-utils";

export function getIconByOrderStatus(status) {
    return {
        [ORDER_STATUS.AWAITING_PAYMENT]: "hourglass",
        [ORDER_STATUS.PAID]: "dollar",
        [ORDER_STATUS.SHIPPED]: "logout",
        [ORDER_STATUS.RECEIVED]: "check",

    }[status];
}

export function getDescriptionByOrderStatus(status) {
    return ORDER_STATUS_DESCRIPTION[status];
}

export function getOrderPricesLabel(orderProduct) {
    return getProductPriceSummary(orderProduct.singlePrice, orderProduct.quantity);
}

export function calculateTotalPrice(order) {
    const subsequentSums = order.orderProducts.map(orderProduct => {
        return orderProduct.singlePrice*orderProduct.quantity;
    });

    return sumArray(subsequentSums);
}