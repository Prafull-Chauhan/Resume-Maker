function getAuthToken() { return localStorage.getItem('token'); }
function getAuthUser() { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; }
function setAuthSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}
function clearAuthSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
function logout() {
    clearAuthSession();
    window.location.href = 'login.html';
}

(function checkRouteAuth() {
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
    const token = getAuthToken();
    if (!token && !isAuthPage) window.location.href = 'login.html';
    else if (token && isAuthPage) window.location.href = 'index.html';
})();