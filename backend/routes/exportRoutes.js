const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/document/:id/html', exportController.exportDocumentHTML);

router.use(authenticateToken);
router.get('/applications/csv', exportController.exportApplicationsCSV);
router.get('/:type/:id/json', exportController.exportJSON);

module.exports = router;