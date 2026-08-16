const loginForm = document.getElementById('loginForm');
const alertBox = document.getElementById('alertBox');

function fillDemo(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alertBox.style.display = 'none';

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed.');

            setAuthSession(data.token, data.user);
            alertBox.className = 'alert-msg alert-success';
            alertBox.innerText = 'Login successful!';
            alertBox.style.display = 'block';
            setTimeout(() => window.location.href = 'index.html', 800);
        } catch (err) {
            alertBox.className = 'alert-msg alert-danger';
            alertBox.innerText = err.message;
            alertBox.style.display = 'block';
        }
    });
}