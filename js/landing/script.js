document.addEventListener("DOMContentLoaded", () => {
    const authBtns = document.getElementById("auth-btns");
    const signOutBtn = document.getElementById("sign-out-btn");
    const getStartedBtn = document.getElementById("get-started-btn");

    if (checkAuthStatus()) {
        authBtns.style.display = "none";
        signOutBtn.style.display = "block";
        getStartedBtn.href = "../../landingPage/landing.html";
    } else {
        authBtns.style.display = "block";
        signOutBtn.style.display = "none";
        getStartedBtn.href = "./sign-in.html";
    }
});

// DOM Elements
const signOutBtn = document.getElementById('sign-out-btn');

signOutBtn.addEventListener('click', signOut)
