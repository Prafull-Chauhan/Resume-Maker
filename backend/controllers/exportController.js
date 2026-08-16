const db = require('../config/db');

exports.exportApplicationData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM applications WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    const application = result.rows[0];
    const exportPayload = {
      id: application.id,
      title: application.title,
      status: application.status,
      data: application.data,
      exportedAt: new Date().toISOString()
    };

    res.setHeader('Content-Disposition', `attachment; filename=application_${id}.json`);
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(exportPayload, null, 2));
  } catch (error) {
    next(error);
  }
};