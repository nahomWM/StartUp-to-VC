const express = require('express');
const vcController = require('../controllers/vcController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/me', vcController.getMe);
router.patch('/updateMe', vcController.updateMe);
router.delete('/deleteMe', vcController.deleteMe);

router.get('/', vcController.getAllVCs);
router.get('/:id', vcController.getVC);
router.patch('/:id', vcController.updateVC);
router.delete('/:id', vcController.deleteVC);

module.exports = router;
