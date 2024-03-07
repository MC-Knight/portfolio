const loginBtn = document.getElementById("login");
const form = document.forms["login-continue-form"];

loginBtn.addEventListener("click", () => {
  window.location.href = "/dashboard/dashboard.html";
});
