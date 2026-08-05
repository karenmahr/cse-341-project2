const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


const options = {
    swaggerOptions: {
        withCredentials: true
    }
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;