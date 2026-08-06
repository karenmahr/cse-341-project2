const router = require('express').Router();
const passport = require('passport');

// 1. Documentación Swagger en /api-docs
router.use('/api-docs', require('./swagger'));

// 2. Ruta raíz
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    if (req.session.user === undefined) {
        res.send(`Logged in as ${req.session.user.displayName || req.session.user.username}`);
    } else {
        res.send('Logged out');
    }
});
router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// 3. Rutas para Teams
router.use('/teams', require('./teams'));
router.use('/arg_wc', require('./arg_wc'));

module.exports = router;