const express = require('express');
const router = express.Router();

const arg_wcController = require('../controllers/arg_wc');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Obtener todos y obtener por ID
router.get('/', arg_wcController.getAll);

router.get('/:id', arg_wcController.getSingle);
// Crear, actualizar y eliminar
router.post('/', isAuthenticated, validation.saveWc, arg_wcController.createWc);

router.put('/:id', isAuthenticated, validation.saveWc, arg_wcController.updateWc);

router.delete('/:id', isAuthenticated, arg_wcController.deleteWc);

module.exports = router;