let allApplications = [];
let allDocuments = [];

function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    if (tabId === 'dashboard' || tabId === 'applications') loadApplications();
    if (tabId === 'documents') loadDocuments();
    if (tabId === 'template-builder') updateLivePreview();
}

async function loadMetrics() {
    try {
        const res = await fetch('/api/applications/metrics', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        const resData = await res.json();
        if (resData.success && resData.data) {
            const d = resData.data;
            document.getElementById('statTotalApps').innerText = d.total_apps || 0;
            document.getElementById('statApproved').innerText = d.approved_apps || 0;
            document.getElementById('statPending').innerText = (parseInt(d.in_review_apps || 0) + parseInt(d.submitted_apps || 0));
            document.getElementById('statDocs').innerText = d.total_docs || 0;
        }
    } catch (e) {}
}

async function loadApplications() {
    try {
        const res = await fetch('/api/applications', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        const resData = await res.json();
        allApplications = resData.data || [];
        renderApplicationsTable(allApplications);
        renderRecentTable(allApplications.slice(0, 5));
    } catch (e) {}
}

function renderApplicationsTable(apps) {
    const tbody = document.getElementById('appTableBody');
    if (!tbody) return;
    tbody.innerHTML = apps.map(app => `
        <tr>
            <td><strong>#${app.id}</strong></td>
            <td>${app.title}</td>
            <td>${app.category}</td>
            <td><span class="badge">${app.priority}</span></td>
            <td><span class="badge badge-${app.status}">${app.status}</span></td>
            <td>${new Date(app.created_at).toLocaleDateString()}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteApp(${app.id})">Delete</button></td>
        </tr>
    `).join('');
}

function renderRecentTable(apps) {
    const tbody = document.querySelector('#dashboardRecentTable tbody');
    if (!tbody) return;
    tbody.innerHTML = apps.map(app => `
        <tr>
            <td><strong>#${app.id}</strong></td>
            <td>${app.title}</td>
            <td>${app.category}</td>
            <td>${app.applicant_name || 'User'}</td>
            <td><span class="badge badge-${app.status}">${app.status}</span></td>
            <td>${new Date(app.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

async function loadDocuments() {
    try {
        const res = await fetch('/api/documents', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        const resData = await res.json();
        allDocuments = resData.data || [];
        const tbody = document.getElementById('docTableBody');
        if (!tbody) return;
        tbody.innerHTML = allDocuments.map(doc => `
            <tr>
                <td><strong>DOC-${doc.id}</strong></td>
                <td>${doc.title}</td>
                <td>${doc.doc_type}</td>
                <td>${doc.template_name || 'Custom'}</td>
                <td>${doc.creator_name || 'System'}</td>
                <td>${new Date(doc.created_at).toLocaleDateString()}</td>
                <td><a href="/api/exports/document/${doc.id}/html" target="_blank" class="btn btn-outline btn-sm">Print</a></td>
            </tr>
        `).join('');
    } catch (e) {}
}

function updateLivePreview() {
    const raw = document.getElementById('tplBody')?.value || '';
    const sample = { applicant_name: 'Jane Doe', skill_name: 'Engineering', award_date: '2026-08-16' };
    let out = raw;
    for (const [k, v] of Object.entries(sample)) {
        out = out.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v);
    }
    const box = document.getElementById('livePreviewBox');
    if (box) box.innerHTML = out;
}

function openNewAppModal() { document.getElementById('newAppModal').style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

async function submitNewApp(e) {
    e.preventDefault();
    const payload = {
        title: document.getElementById('newAppTitle').value,
        category: document.getElementById('newAppCategory').value,
        form_data: { applicant_name: document.getElementById('newAppApplicant').value }
    };
    const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        closeModal('newAppModal');
        loadApplications();
        loadMetrics();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const user = getAuthUser();
    if (user) {
        document.getElementById('userName').innerText = user.full_name || user.email;
        document.getElementById('userRole').innerText = user.role || 'user';
        document.getElementById('userAvatar').innerText = (user.full_name || 'U')[0].toUpperCase();
    }
    loadMetrics();
    loadApplications();
});