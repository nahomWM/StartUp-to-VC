const express = require('express');
const vcController = require('../controllers/vcController');
const authMiddleware = require('../middleware/auth');

const vcValidator = require('../validators/vcValidator');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/top-5-vcs', vcController.aliasTopVCs, vcController.getAllVCs);
router.get('/vc-stats', vcController.getVCStats);

router.get('/me', vcController.getMe);
router.patch('/updateMe', vcValidator.updateVCValidator, vcController.updateMe);
router.delete('/deleteMe', vcController.deleteMe);

router.get('/', vcController.getAllVCs);
router.get('/:id', vcController.getVC);
router.patch('/:id', vcValidator.updateVCValidator, vcController.updateVC);
router.delete('/:id', vcController.deleteVC);

module.exports = router;
