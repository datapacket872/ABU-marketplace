// Sample Credentials (Change here)
const credentials = {
    user: { password: 'pass123', role: 'user' },
    admin: { password: 'admin123', role: 'admin' }
};

// Login Page Logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        if (credentials[username] && credentials[username].password === password) {
            localStorage.setItem('role', credentials[username].role);
            window.location.href = `${credentials[username].role}.html`;
        } else {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
}

// Session Check on User/Admin Pages
if (window.location.pathname.includes('user.html') || window.location.pathname.includes('admin.html')) {
    const role = localStorage.getItem('role');
    if (!role || (window.location.pathname.includes('user.html') && role !== 'user') || (window.location.pathname.includes('admin.html') && role !== 'admin')) {
        window.location.href = 'index.html';
    }
}

// Logout Button
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    });
}