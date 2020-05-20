const {getTokenValidationFunction} = require("./cfg");

function checkJwt(req, res, next) {
    const authHeader = req.headers['Authorization'];
    const jwtToken = authHeader? authHeader.replace('Bearer ', ''): '';
    const tokenValidationFunction = getTokenValidationFunction();
    tokenValidationFunction(jwtToken, function(error, result) {
        const isTokenCorrect = (result !== null) && (error === null);
        if(!isTokenCorrect) {
            return next({
                'type':'error',
                'httpCode':400,
                'message': {
                    'errCode': 'e400',
                    'text': `Not a valid bearer token! Details: ${error}`
                }
            });
        } else {
            return next();
        }
    });
}

function setCorsHeaders(response) {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = {
    checkJwt,
    setCorsHeaders,
};