import {getLoggingFunction, getSendEmailFunction} from "./cfg";

const {getLoginFunction, getRegisterFunction, getUploadFunction} = require("./cfg");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');
const {setCorsHeaders, checkJwt} = require('./common');
const app = express();
const CFG = require('./cfg');

global.fetch = require('node-fetch');

function setPlatformSpecificLogging() {
    console.log = getLoggingFunction();
}

setPlatformSpecificLogging();

app.use(cors());
app.use(bodyParser.json());

app.use("/graphql", checkJwt);

app.use(
    postgraphile(CFG.DB_CONNECTION_STRING, "public", {
        appendPlugins: [
            ConnectionFilterPlugin,
            PostGraphileNestedMutations,
        ],
        graphiql: true,
        enhanceGraphiql: true,
        pgSettings: req => {
            const settings = {};
            if (req.user) {
                settings["user.permissions"] = req.user.scopes;
            }
            return settings;
        },
    })
);

app.post('/register/', function(request, response) {
    setCorsHeaders(response);

    const {
        name,
        email,
        password
    } = request.body;

    const registerFunction = getRegisterFunction();

    registerFunction({
        name: name,
        email: email,
        password: password
    }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else {
            return response.status(200).send(result);
        }
    });
});

app.post('/login/', function(request, response) {
    setCorsHeaders(response);

    const {
        name,
        password
    } = request.body;

    const loginFunction = getLoginFunction();

    loginFunction({
        name: name,
        password: password
    }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else {
            const jwtToken = result.accessToken.jwtToken;

            return response.status(200).send({
                result,
                jwtToken
            });
        }
    });
});

app.post('/upload/', function(request, response) {
    setCorsHeaders(response);
    const uploadFunction = getUploadFunction();
    uploadFunction(request, response);
});

app.post('/send_email/', function(request, response) {
    setCorsHeaders(response);

    const {
        toAddresses,
        subject,
        bodyText,
        bodyHtml
    } = request.body;

    const sendEmailFunction = getSendEmailFunction();

    sendEmailFunction(
        toAddresses,
        subject,
        bodyText,
        bodyHtml
    ).then((data) => {
        console.log(data);
        return response.status(200).send("OK");
    }).catch((err) => {
        console.error(err, err.stack);
        return response.status(500).send(JSON.stringify(err));
    });
});

app.listen(3001);