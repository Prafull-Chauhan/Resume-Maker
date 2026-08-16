const express = require('express');
const router = express.Router();
const appController = require('../controllers/applicationController');
const { authenticateToken, requireReviewerOrAdmin } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/metrics', appController.getDashboardStats);
router.get('/', appController.getAllApplications);
router.get('/:id', appController.getApplicationById);
router.post('/', appController.createApplication);
router.patch('/:id/status', requireReviewerOrAdmin, appController.updateApplicationStatus);
router.delete('/:id', appController.deleteApplication);

module.exports = router;