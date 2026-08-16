function exportCSV() { window.open(`/api/exports/applications/csv?token=${getAuthToken()}`, '_blank'); }
function exportJSONData() { window.open(`/api/exports/application/1/json?token=${getAuthToken()}`, '_blank'); }

async function deleteApp(appId) {
    if (!confirm(`Delete application #${appId}?`)) return;
    const res = await fetch(`/api/applications/${appId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    if (res.ok) { loadApplications(); loadMetrics(); }
}