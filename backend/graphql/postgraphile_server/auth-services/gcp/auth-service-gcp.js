const {getUserId, acknowledgeUser} = require("../../pg-integration");

const firebase = require('firebase');

const config = {
    apiKey: "<API_KEY>",
    authDomain: "primeval-aspect-274221.firebaseapp.com",
};
firebase.initializeApp(config);


function register(body, callback) {
    let name = body.name;
    let email = body.email;
    let password = body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            function (error) {
                console.error(error.code);
                console.error(error.message);
            }
        );

    acknowledgeUser(email, (id) => {
        const responseBody = {
            name: name,
            email: email,
            assignedId: id,
        };
        callback(null, responseBody);
    });
}

function login(body, callback) {
    let userName = body.name;
    let password = body.password;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdTokenResult().then(token => {
                getUserId(userName, (userId) => {
                    const enhancedResult = {
                        userId,
                        jwtToken: token,
                        userName
                    };
                    callback(null, enhancedResult);
                });
            });
        } else {
            console.log('No user signed in.');
        }
    });

    firebase.auth().signInWithEmailAndPassword(userName, password).catch(function (error) {
        console.log(error.message);
    });
}

function validateToken(token, callback) {
    firebase.auth().verifyIdToken(token)
        .then(function (decodedToken) {
            callback(null, decodedToken);
        })
        .catch(function (error) {
            callback(error);
        });
}

module.exports = {
    register,
    login,
    validateToken,
};