const express = require('express');
const router = express.Router();
const docController = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/templates', docController.getTemplates);
router.get('/templates/:id', docController.getTemplateById);
router.post('/templates', docController.createTemplate);

router.get('/', docController.getAllDocuments);
router.get('/:id', docController.getDocumentById);
router.post('/', docController.createDocument);
router.delete('/:id', docController.deleteDocument);

module.exports = router;