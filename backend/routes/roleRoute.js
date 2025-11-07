const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, roleController.getAllRoles);

router.get('/:id', authenticateToken, roleController.getRoleById);

router.post('/', authenticateToken, isAdmin, roleController.createRole);

router.put('/:id', authenticateToken, isAdmin, roleController.updateRole);

router.delete('/:id', authenticateToken, isAdmin, roleController.deleteRole);

module.exports = router;
