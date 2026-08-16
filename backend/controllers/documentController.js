const DBQueries = require('../models/dbQueries');

function renderTemplate(templateHtml, data) {
    let output = templateHtml;
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        output = output.replace(regex, value !== undefined && value !== null ? value : '');
    }
    return output;
}

exports.getAllDocuments = async (req, res, next) => {
    try {
        const documents = await DBQueries.getDocuments({
            userId: req.user.id,
            role: req.user.role
        });
        res.json({ success: true, count: documents.length, data: documents });
    } catch (error) {
        next(error);
    }
};

exports.getDocumentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const document = await DBQueries.getDocumentById(id);

        if (!document) return res.status(404).json({ success: false, message: 'Document not found.' });
        if (req.user.role === 'user' && document.user_id !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized access.' });
        }

        res.json({ success: true, data: document });
    } catch (error) {
        next(error);
    }
};

exports.createDocument = async (req, res, next) => {
    try {
        const { application_id, template_id, title, doc_type, payload } = req.body;
        let contentBody = req.body.content_body || '';

        if (template_id) {
            const template = await DBQueries.getTemplateById(template_id);
            if (!template) return res.status(404).json({ success: false, message: 'Template not found.' });
            contentBody = renderTemplate(template.layout_template, payload || {});
        }

        if (!title || !contentBody) {
            return res.status(400).json({ success: false, message: 'Title and content are required.' });
        }

        const docId = await DBQueries.createDocument({
            application_id,
            template_id,
            user_id: req.user.id,
            title,
            doc_type: doc_type || 'Certificate',
            content_body: contentBody,
            metadata_json: payload
        });

        res.status(201).json({ success: true, message: 'Document created successfully.', documentId: docId });
    } catch (error) {
        next(error);
    }
};

exports.deleteDocument = async (req, res, next) => {
    try {
        const { id } = req.params;
        await DBQueries.deleteDocument(id);
        res.json({ success: true, message: 'Document removed successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.getTemplates = async (req, res, next) => {
    try {
        const templates = await DBQueries.getTemplates();
        res.json({ success: true, data: templates });
    } catch (error) {
        next(error);
    }
};

exports.getTemplateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await DBQueries.getTemplateById(id);
        if (!template) return res.status(404).json({ success: false, message: 'Template not found.' });
        res.json({ success: true, data: template });
    } catch (error) {
        next(error);
    }
};

exports.createTemplate = async (req, res, next) => {
    try {
        const { name, category, description, layout_template, fields } = req.body;

        if (!name || !layout_template) {
            return res.status(400).json({ success: false, message: 'Name and layout template are required.' });
        }

        const templateId = await DBQueries.createTemplate({
            name,
            category,
            description,
            layout_template,
            created_by: req.user.id,
            fields: fields || []
        });

        res.status(201).json({ success: true, message: 'Template saved.', templateId });
    } catch (error) {
        next(error);
    }
};