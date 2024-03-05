const loginBtn: HTMLElement | null = document.getElementById("login");
const loginForm: HTMLFormElement | null = document.forms.namedItem(
  "login-continue-form"
);

if (loginForm !== null) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "./dashboard.html";
  });
}
