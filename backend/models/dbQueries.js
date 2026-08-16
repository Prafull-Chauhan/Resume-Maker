const db = require('../config/db');

const DBQueries = {
    findUserByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    findUserById: async (id) => {
        const [rows] = await db.query('SELECT id, full_name, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    createUser: async ({ full_name, email, password_hash, role = 'user' }) => {
        const [result] = await db.query(
            'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [full_name, email, password_hash, role]
        );
        return result.insertId;
    },

    getApplications: async ({ userId = null, role = 'user', status = null, search = null }) => {
        let sql = `
            SELECT a.*, u.full_name as applicant_name
            FROM applications a
            JOIN users u ON a.user_id = u.id
            WHERE 1=1
        `;
        const params = [];

        if (role === 'user' && userId) {
            sql += ' AND a.user_id = ?';
            params.push(userId);
        }

        if (status && status !== 'all') {
            sql += ' AND a.status = ?';
            params.push(status);
        }

        if (search) {
            sql += ' AND (a.title LIKE ? OR a.category LIKE ? OR u.full_name LIKE ?)';
            const q = `%${search}%`;
            params.push(q, q, q);
        }

        sql += ' ORDER BY a.created_at DESC';
        const [rows] = await db.query(sql, params);
        return rows;
    },

    getApplicationById: async (id) => {
        const sql = `
            SELECT a.*, u.full_name as applicant_name
            FROM applications a
            JOIN users u ON a.user_id = u.id
            WHERE a.id = ?
        `;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },

    createApplication: async ({ user_id, title, category, priority = 'medium', form_data }) => {
        const formDataStr = typeof form_data === 'object' ? JSON.stringify(form_data) : form_data;
        const [result] = await db.query(
            'INSERT INTO applications (user_id, title, category, priority, form_data, status) VALUES (?, ?, ?, ?, ?, "submitted")',
            [user_id, title, category, priority, formDataStr]
        );
        return result.insertId;
    },

    updateApplicationStatus: async ({ id, status, reviewer_notes, reviewed_by }) => {
        const [result] = await db.query(
            'UPDATE applications SET status = ?, reviewer_notes = ?, reviewed_by = ?, reviewed_at = NOW() WHERE id = ?',
            [status, reviewer_notes, reviewed_by, id]
        );
        return result.affectedRows > 0;
    },

    deleteApplication: async (id) => {
        const [result] = await db.query('DELETE FROM applications WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    getDocuments: async ({ userId = null, role = 'user' }) => {
        let sql = `
            SELECT d.*, u.full_name as creator_name, t.name as template_name
            FROM documents d
            JOIN users u ON d.user_id = u.id
            LEFT JOIN templates t ON d.template_id = t.id
        `;
        const params = [];
        if (role === 'user' && userId) {
            sql += ' WHERE d.user_id = ?';
            params.push(userId);
        }
        sql += ' ORDER BY d.created_at DESC';
        const [rows] = await db.query(sql, params);
        return rows;
    },

    getDocumentById: async (id) => {
        const sql = `
            SELECT d.*, u.full_name as creator_name, t.name as template_name
            FROM documents d
            JOIN users u ON d.user_id = u.id
            LEFT JOIN templates t ON d.template_id = t.id
            WHERE d.id = ?
        `;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },

    createDocument: async ({ application_id, template_id, user_id, title, doc_type, content_body, metadata_json }) => {
        const metaStr = metadata_json ? JSON.stringify(metadata_json) : null;
        const [result] = await db.query(
            'INSERT INTO documents (application_id, template_id, user_id, title, doc_type, content_body, metadata_json) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [application_id || null, template_id || null, user_id, title, doc_type || 'General', content_body, metaStr]
        );
        return result.insertId;
    },

    deleteDocument: async (id) => {
        const [result] = await db.query('DELETE FROM documents WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    getTemplates: async () => {
        const [rows] = await db.query('SELECT * FROM templates WHERE is_active = 1 ORDER BY created_at DESC');
        return rows;
    },

    getTemplateById: async (id) => {
        const [rows] = await db.query('SELECT * FROM templates WHERE id = ?', [id]);
        if (!rows[0]) return null;
        const [fields] = await db.query('SELECT * FROM template_fields WHERE template_id = ? ORDER BY order_index ASC', [id]);
        rows[0].fields = fields;
        return rows[0];
    },

    createTemplate: async ({ name, category, description, layout_template, created_by, fields = [] }) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const [tResult] = await connection.query(
                'INSERT INTO templates (name, category, description, layout_template, created_by) VALUES (?, ?, ?, ?, ?)',
                [name, category || 'General', description || '', layout_template, created_by]
            );
            const templateId = tResult.insertId;

            for (let i = 0; i < fields.length; i++) {
                const f = fields[i];
                await connection.query(
                    'INSERT INTO template_fields (template_id, field_name, field_label, field_type, is_required, default_value, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [templateId, f.field_name, f.field_label, f.field_type || 'text', f.is_required ? 1 : 0, f.default_value || '', i + 1]
                );
            }

            await connection.commit();
            return templateId;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    },

    getDashboardMetrics: async () => {
        const [apps] = await db.query(`
            SELECT 
                COUNT(*) as total_apps,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_apps,
                SUM(CASE WHEN status = 'in_review' THEN 1 ELSE 0 END) as in_review_apps,
                SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as submitted_apps,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_apps
            FROM applications
        `);
        const [docs] = await db.query('SELECT COUNT(*) as total_docs FROM documents');
        return { ...apps[0], total_docs: docs[0].total_docs };
    }
};

module.exports = DBQueries;