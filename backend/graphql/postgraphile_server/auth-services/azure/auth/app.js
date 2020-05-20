const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const bunyan = require('bunyan');
const config = require('./config');
const aad = require('azure-ad-jwt');

const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

const log = bunyan.createLogger({
    name: 'Microsoft OIDC Example Web Application'
});

passport.serializeUser(function (user, done) {
    done(null, user.oid);
});

passport.deserializeUser(function (oid, done) {
    findByOid(oid, function (err, user) {
        done(err, user);
    });
});

const users = [];

const findByOid = function (oid, fn) {
    for (let i = 0, len = users.length; i < len; i++) {
        const user = users[i];
        log.info('we are using user: ', user);
        if (user.oid === oid) {
            return fn(null, user);
        }
    }
    return fn(null, null);
};

passport.use(new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
    },
    function (iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
            return done(new Error("No oid found"), null);
        }
        process.nextTick(function () {
            findByOid(profile.oid, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    users.push(profile);
                    return done(null, profile);
                }
                return done(null, user);
            });
        });
    }
));

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + '/../../public'));


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function loginHandler(req, res, next) {
    passport.authenticate('azuread-openidconnect',
        {
            response: res,
            resourceURL: config.resourceURL,
            failureRedirect: '/'
        }
    )(req, res, next);
}

function registerHandler(req, res, next) {
    res.redirect('https://signup.live.com/?lic=1');
}

app.get('/register', registerHandler);

app.get('/login',
    loginHandler,
    (req, res) => {
        res.redirect('/');
    });

app.post('/auth/openid/return',
    function (req, res, next) {
        console.log(`ID token = ` + req.body.id_token);
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        console.log(`ID token = ` + req.body.id_token);
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        req.logOut();
        res.redirect(config.destroySessionUrl);
    });
});

function validateToken(token, callback) {
    aad.verify(token, null, function (err, result) {
        if (result) {
            console.log("JWT is valid");
            callback(result, null);
        } else {
            console.log("JWT is invalid: " + err);
            callback(null, err);
        }
    });
}

module.exports = {
    register: registerHandler,
    login: loginHandler,
    validateToken,
};
