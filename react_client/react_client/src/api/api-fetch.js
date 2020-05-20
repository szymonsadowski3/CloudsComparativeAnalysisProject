import 'whatwg-fetch';
import {loginUrl, registerUrl, sendEmailUrl} from "../config/cfg";
import {getJwtToken} from "../common/session";


function getCommonHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Sec-Fetch-Site", "same-site");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Accept-Language", "en-US,en;q=0.9");

    return myHeaders;
}

export function register(email, name, password) {
    const bodyJson = {
        name, email, password
    };

    const myHeaders = getCommonHeaders();
    const raw = JSON.stringify(bodyJson);

    const requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
    };

    return window.fetch(registerUrl, requestOptions)
        .then(response => response.json());
}

export function login(name, password) {
    const myHeaders = getCommonHeaders();

    const rawBody = JSON.stringify({name, password});

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawBody,
    };

    return window.fetch(loginUrl, requestOptions)
        .then(response => response.json());
}

// export function checkJwtToken() {
//     const jwtToken = getJwtToken();
//
//     const myHeaders = getCommonHeaders();
//     const rawBody = JSON.stringify({name, password});
//
//     const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: rawBody,
//     };
//
//     return window.fetch(loginUrl, requestOptions)
//         .then(response => response.json());
// }

export function sendEmail(ccAddresses, toAddresses, subject, bodyText, bodyHtml) {
    const myHeaders = getCommonHeaders();

    const rawBody = JSON.stringify({ccAddresses, toAddresses, subject, bodyText, bodyHtml});

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawBody,
    };

    return window.fetch(sendEmailUrl, requestOptions);
}
