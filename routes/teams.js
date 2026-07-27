const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Obtener todos y obtener por ID
router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);
// Crear, actualizar y eliminar
router.post('/', isAuthenticated, validation.saveTeam, teamsController.createTeam);

router.put('/:id', isAuthenticated, validation.saveTeam, teamsController.updateTeam);

router.delete('/:id', isAuthenticated, teamsController.deleteTeam);

module.exports = router;