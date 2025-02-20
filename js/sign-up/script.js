if (checkAuthStatus()) {
    window.location.href = '/CV_APP/index.html';
}

// DOM Elements
const signUpForm = document.getElementById('sign-up-form');

// Functions
async function signUp(e) {
    e.preventDefault();

    // Get input data
    const formData = new FormData(signUpForm);
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    // Username Validation
    if (!username || username.replace(/\s/g, '').length === 0) {
        alert('Username is required and cannot be just spaces.');
        return;
    }

    // Email Validation
    if (!email || email.replace(/\s/g, '').length === 0 ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Enter a valid email address.');
        return;
    }

    // Password Validation
    if (!password || password.replace(/\s/g, '').length === 0) {
        alert('Password cannot be empty or just spaces.');
        return;
    }
    if (password.length < 4) {
        alert('Password must be at least 4 characters long.');
        return;
    }
    if (!/\d/.test(password)) {
        alert('Password must contain at least one number.');
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert('Password must contain at least one uppercase letter.');
        return;
    }

    // Encrypt password
    const encryptedPassword = await encryptStr(password);

    // Create new user object
    const newUser = {
        id: randomId(),
        username,
        email,
        password: encryptedPassword
    };

    // Retrieve existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email is already registered
    if (users.some(user => user.email === newUser.email)) {
        alert('This email is already registered. Try again with a different one.');
        return;
    }

    // Store new user and start session
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('session', "session");

    // Redirect to homepage
    window.location.href = 'index.html';
}

// Event listener bindings
signUpForm.addEventListener('submit', signUp);
