const {validateToken: validateTokenAws, register: registerAws, login: loginAws} = require("./auth-services/aws/auth-service-aws");
const {validateToken: validateTokenGcp, register: registerGcp, login: loginGcp} = require("./auth-services/gcp/auth-service-gcp");
const {validateToken: validateTokenAzure, register: registerAzure, login: loginAzure} = require("./auth-services/azure/auth/app");

const {upload: uploadAws} = require("./storage-services/aws/storage-service-aws");
const {upload: uploadGcp} = require("./storage-services/gcp/storage-service-gcp");
const {upload: uploadAzure} = require("./storage-services/azure/storage-service-azure");

const {sendEmail: sendEmailAws} = require("./email-services/aws/email-service-aws");
const {sendEmail: sendEmailGcp} = require("./email-services/gcp/email-service-gcp");
const {sendEmail: sendEmailAzure} = require("./email-services/azure/email-service-azure");

const {sendLog: sendLogAws} = require("./logging-services/aws/logging-service-aws");
const {sendLog: sendLogGcp} = require("./logging-services/gcp/logging-service-gcp");
const {sendLog: sendLogAzure} = require("./logging-services/azure/logging-service-azure");



const Platform = Object.freeze({
    "aws": "aws",
    "gcp": "gcp",
    "azure": "azure",
    "local": "local",
});

const usedPlatform = Platform.local;


const connectionStringsMapping = {
    [Platform.local]: 'postgres://postgres:admin@localhost:5432/postgres',
    [Platform.aws]: 'postgres://postgres:sadowski608@database-2.cvbvtxjktmxu.eu-central-1.rds.amazonaws.com:5432/postgres',
    [Platform.gcp]: 'postgres://postgres:postgres@35.198.161.68:5432/postgres',
    [Platform.azure]: 'postgres://postgres%40praca-mgr-db:Bimber123%40@praca-mgr-db.postgres.database.azure.com:5432/postgres'
};

const DB_CONNECTION_STRING = connectionStringsMapping[usedPlatform];


function getTokenValidationFunction() {
    const functionMap = {
        [Platform.local]: (token, callback) => {callback(null, true)},
        [Platform.aws]: validateTokenAws,
        [Platform.gcp]: validateTokenGcp,
        [Platform.azure]: validateTokenAzure,
    };

    return functionMap[usedPlatform];
}

function getRegisterFunction() {
    const functionMap = {
        [Platform.local]: (body, callback) => {callback(null, true)},
        [Platform.aws]: registerAws,
        [Platform.gcp]: registerGcp,
        [Platform.azure]: registerAzure,
    };

    return functionMap[usedPlatform];
}

function getLoginFunction() {
    const functionMap = {
        [Platform.local]: (body, callback) => {callback(null, true)},
        [Platform.aws]: loginAws,
        [Platform.gcp]: loginGcp,
        [Platform.azure]: loginAzure,
    };

    return functionMap[usedPlatform];
}

function getUploadFunction() {
    const functionMap = {
        [Platform.local]: (response, request) => {response.status(200).send([]);},
        [Platform.aws]: uploadAws,
        [Platform.gcp]: uploadGcp,
        [Platform.azure]: uploadAzure,
    };

    return functionMap[usedPlatform];
}

function getSendEmailFunction() {
    const functionMap = {
        [Platform.local]: (toAddresses, subject, bodyText, bodyHtml) => {},
        [Platform.aws]: sendEmailAws,
        [Platform.gcp]: sendEmailGcp,
        [Platform.azure]: sendEmailAzure,
    };

    return functionMap[usedPlatform];
}

function getLoggingFunction() {
    const functionMap = {
        [Platform.local]: (message, level='info') => {console.log(`${level}: message`)},
        [Platform.aws]: sendLogAws,
        [Platform.gcp]: sendLogGcp,
        [Platform.azure]: sendLogAzure,
    };

    return functionMap[usedPlatform];
}

module.exports = {
    AWS_REGION: 'eu-central-1',
    SOURCE_EMAIL: 'szymonsadowski3@gmail.com',
    DB_CONNECTION_STRING: DB_CONNECTION_STRING,
    getTokenValidationFunction,
    getRegisterFunction,
    getLoginFunction,
    getUploadFunction,
    getSendEmailFunction,
    getLoggingFunction,
};

