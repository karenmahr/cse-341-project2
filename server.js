require('dotenv').config();
const dns = require('node:dns');
dns.setServers(["1.1.1.1", "1.0.0.1"]);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

const PORT = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))

    .use(passport.initialize())
    .use(passport.session())

    .use((req, res, next) => {
        res.setHeader("Access-Controll-Allow-Origin", "*");
        res.setHeader(
            "Access-Controll-Allow-Headers",
            "Origin,X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/')
    });

// Carga las rutas desde /routes/index.js

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Database is listening and node running on port ${PORT}`);
        });
    }
});