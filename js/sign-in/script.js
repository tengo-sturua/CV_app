if (checkAuthStatus()) {
    window.location.href = '../../landingPage/landing.html';
}

// DOM Elements
const signInForm = document.getElementById('sign-up-form');

// Functions
async function signIn(e) {
    e.preventDefault();

    // Get input data
    const formData = new FormData(signInForm);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    // Email Validation
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Enter a valid email address.');
        return;
    }

    // Password Validation (Ensure it's not empty or just spaces)
    if (!password || password.replace(/\s/g, '').length === 0) {
        alert('Password cannot be empty or just spaces.');
        return;
    }

    // Retrieve users data from storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists
    const existingUser = users.find(user => user.email === email);

    if (!existingUser) {
        alert('Could not find any user related to the email. Try again.');
        return;
    }

    // Check if the password is correct
    const hashedPassword = await encryptStr(password);

    if (existingUser.password === hashedPassword) {
        sessionStorage.setItem('session', "session");
        window.location.href = '../../landingPage/landing.html';
    } else {
        alert('Incorrect password.');
    }
}

// Event listener bindings
signInForm.addEventListener('submit', signIn);
