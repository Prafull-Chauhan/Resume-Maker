const DBQueries = require('../models/dbQueries');

exports.getAllApplications = async (req, res, next) => {
    try {
        const { status, search } = req.query;
        const applications = await DBQueries.getApplications({
            userId: req.user.id,
            role: req.user.role,
            status,
            search
        });

        res.json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        next(error);
    }
};

exports.getApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await DBQueries.getApplicationById(id);

        if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });
        if (req.user.role === 'user' && application.user_id !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized access.' });
        }

        res.json({ success: true, data: application });
    } catch (error) {
        next(error);
    }
};

exports.createApplication = async (req, res, next) => {
    try {
        const { title, category, priority, form_data } = req.body;

        if (!title || !form_data) {
            return res.status(400).json({ success: false, message: 'Title and form_data are required.' });
        }

        const newAppId = await DBQueries.createApplication({
            user_id: req.user.id,
            title,
            category: category || 'General Application',
            priority: priority || 'medium',
            form_data
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully.',
            applicationId: newAppId
        });
    } catch (error) {
        next(error);
    }
};

exports.updateApplicationStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, reviewer_notes } = req.body;

        const application = await DBQueries.getApplicationById(id);
        if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });

        await DBQueries.updateApplicationStatus({
            id,
            status,
            reviewer_notes: reviewer_notes || '',
            reviewed_by: req.user.id
        });

        res.json({ success: true, message: `Application #${id} updated to ${status}.` });
    } catch (error) {
        next(error);
    }
};

exports.deleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await DBQueries.getApplicationById(id);

        if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });
        if (req.user.role === 'user' && application.user_id !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete.' });
        }

        await DBQueries.deleteApplication(id);
        res.json({ success: true, message: 'Application deleted.' });
    } catch (error) {
        next(error);
    }
};

exports.getDashboardStats = async (req, res, next) => {
    try {
        const metrics = await DBQueries.getDashboardMetrics();
        res.json({ success: true, data: metrics });
    } catch (error) {
        next(error);
    }
};