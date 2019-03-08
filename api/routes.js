const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path');

const allShows = require('./data/tvshows');
const allMovies = require("./data/movies");
const config = require("./config");

const router = express.Router(); 

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://${config.tony-lab.auth0.com}/.well-known/jwks.json'
    }),
    audience: [config.AUDIENCE],
    issuer: 'https://${config.tony-lab.auth0.com}/',
    algorithm: "RS256"
});