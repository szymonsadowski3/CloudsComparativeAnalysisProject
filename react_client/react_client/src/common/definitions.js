export const ALL = Symbol('ALL');

export const ORDER_STATUS = {
    AWAITING_PAYMENT: "awaiting_payment",
    PAID: "paid",
    SHIPPED: "shipped",
    RECEIVED: "received",
};

export const ORDER_STATUS_DESCRIPTION = {
    [ORDER_STATUS.AWAITING_PAYMENT]: "The order is still not paid. Awaiting payment...",
    [ORDER_STATUS.PAID]: "The order is paid. Now it's awaiting to be processed...",
    [ORDER_STATUS.SHIPPED]: "The order has already shipped.",
    [ORDER_STATUS.RECEIVED]: "The order has been successfully received.",
};

export const INITIAL_FILTER_PARTIAL_STATE = {
    brandsAvailableForSelect: [],
    tagsAvailableForSelect: [],
    minimumRating: 0,
    brand: '',
    tags: [],
    productName: '',
};

export const TABS = {
    SHOP: 'shop',
    SHOPPING_CART: 'shopping_cart',
};