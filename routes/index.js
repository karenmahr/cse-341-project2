const router = require('express').Router();

// 1. Documentación Swagger en /api-docs
router.use('/api-docs', require('./swagger'));

// 2. Ruta raíz
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

// 3. Rutas para Teams
router.use('/teams', require('./teams'));

module.exports = router;