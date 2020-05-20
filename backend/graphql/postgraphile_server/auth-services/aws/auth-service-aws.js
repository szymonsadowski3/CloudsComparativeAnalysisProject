const {acknowledgeUser, getUserId} = require("../../pg-integration");
const CFG = require('../../cfg');

global.fetch = require('node-fetch');
global.navigator = () => null;
const pool_region = CFG.AWS_REGION;

const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region: pool_region});
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {
    UserPoolId : "<USER_POOL_ID>",
    ClientId : "<CLIENT_ID>"
};

AWS.config.update({region: pool_region});

const EMAIL_KEY = "email";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function register(body, callback) {
    let name = body.name;
    let email = body.email;
    let password = body.password;
    let attributeList = [];

    const emailData = { Name: EMAIL_KEY, Value: email };

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(emailData));
    userPool.signUp(name, password, attributeList, null, function (err, result) {
        if (err) {
            callback(err);
        } else {
            let event = {
                request: {
                    "userAttributes": {
                        [EMAIL_KEY]: email
                    },
                    "validationData": emailData
                },
                response: {
                    autoVerifyEmail: true
                }
            };

            let cognitoUser = result.user;

            let confirmParams = {
                UserPoolId: poolData.UserPoolId,
                Username: name,
            };
            cognitoidentityserviceprovider.adminConfirmSignUp(confirmParams, function(err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                    callback(err);
                }

                if (event.request.userAttributes.hasOwnProperty(EMAIL_KEY)) {
                    event.response.autoVerifyEmail = 'true';
                }

                cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());

                acknowledgeUser(name, (id) => {
                    console.log(`assignedId: ${id}`);

                    const responseBody = {
                        ...result,
                        assignedId: id,
                    };
                    callback(null, responseBody);
                });
            });
        }
    })
}

function login(body, callback) {
    let userName = body.name;
    let password = body.password;
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: userName,
        Password: password
    });
    let userData = {
        Username: userName,
        Pool:  new AmazonCognitoIdentity.CognitoUserPool(poolData),
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            getUserId(userName, (userId) => {
                const username = result.idToken.payload["cognito:username"];
                const enhancedResult = {
                    username,
                    ...result,
                    userId
                };
                callback(null, enhancedResult);
            });
        },
        onFailure: (function (err) {
            console.dir(err);
            callback(err);
        })
    })
}

function validateToken(token, callback) {
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let pems = {};
            let keys = body['keys'];
            for(let i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                let key_id = keys[i].kid;
                let modulus = keys[i].n;
                let exponent = keys[i].e;
                let key_type = keys[i].kty;
                let jwk = { kty: key_type, n: modulus, e: exponent};
                pems[key_id] = jwkToPem(jwk);
            }

            let decodedJwt = jwt.decode(token, {complete: true});
            if (!decodedJwt) {
                const errorMsg = "Not a valid JWT token";
                console.log(errorMsg);
                callback(errorMsg);
            }

            let kid = decodedJwt.header.kid;
            let pem = pems[kid];
            if (!pem) {
                const errorMsg = 'Invalid token';
                console.log(errorMsg);
                callback(errorMsg);
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    callback(err);
                } else {
                    console.log("Valid Token.");
                    callback(null, payload);
                }
            });
        } else {
            const errorMsg = "Error! Unable to download JWKs";
            console.log(errorMsg);
            callback(errorMsg);
        }
    });
}

function renew(refreshTokenFromPreviousRequest, username) {
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: refreshTokenFromPreviousRequest});

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
            console.log(err);
        } else {
            let retObj = {
                "access_token": session.accessToken.jwtToken,
                "id_token": session.idToken.jwtToken,
                "refresh_token": session.refreshToken.token,
            };
            console.log(retObj);
        }
    })
}

module.exports = {
    register,
    login,
    validateToken,
};