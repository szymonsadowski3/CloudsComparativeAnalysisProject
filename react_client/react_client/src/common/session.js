import * as LocalStorage from "js-cookie";
import {apolloClient, isDemo} from "./apollo-client";
import {ORDERS_PER_USER_QUERY, ordersPerUserResponse} from "../mock/mocks";
import get from 'lodash/get';
import {newsletterRecipients} from "../config/cfg";

const CURRENT_USER_KEY = 'current_user';
const JWT_KEY = 'jwt';

export function setLocalStorageEntry(key, value) {
    LocalStorage.set(key, value);
}


export function getLocalStorageEntry(key) {
    const value = LocalStorage.getJSON(key);
    if(value) {
        return value;
    } else {
        return false;
    }
}

export function setCurrentUser(currentUser) {
    setLocalStorageEntry(CURRENT_USER_KEY, currentUser);
}

export function setJwtToken(jwtToken) {
    setLocalStorageEntry(JWT_KEY, jwtToken);
}

export function getCurrentUser() {
    return getLocalStorageEntry(CURRENT_USER_KEY);
}

export function getJwtToken() {
    getLocalStorageEntry(JWT_KEY);
}

export function setSession(loginResult) {
    console.dir(loginResult);

    const username = loginResult.username;

    console.dir(username);
    const id = loginResult.userId;
    const jwtToken = loginResult.jwtToken;

    setCurrentUser({
        username, id
    });

    setJwtToken(jwtToken);

    if(isDemo) {
        try {
            apolloClient.setRequestHandler(
                ORDERS_PER_USER_QUERY,
                () => Promise.resolve(ordersPerUserResponse)
            );
        } catch (e) {
            console.error(e);
        }
    }
}

export function logout() {
    LocalStorage.remove(CURRENT_USER_KEY);
}

export function doesUserHaveAdminAccess() {
    return !isDemo;
}

export function getNewsletterRecipients() {
    return newsletterRecipients;
}
