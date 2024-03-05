"use strict";
const loginBtn = document.getElementById("login");
const loginForm = document.forms.namedItem("login-continue-form");
if (loginForm !== null) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = "./dashboard.html";
    });
}
