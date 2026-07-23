const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');

// Obtener todos y obtener por ID
router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);
// Crear, actualizar y eliminar
router.post('/', validation.saveTeam, teamsController.createTeam);

router.put('/:id', validation.saveTeam, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

module.exports = router;