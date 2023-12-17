//age span
const span = document.getElementById("ageSpan");
const currentYear = new Date().getFullYear();
const birthYear = 2000;
const age = currentYear - birthYear;
span.textContent = age;

//footer yera
const yearSpan = document.getElementById("footer-year");
yearSpan.textContent = currentYear;

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz00IMAUfMt0LyM3OJ2dOxJeNeWY9XgKG7XHvJ45to9tDTiq2FgIi5pzvvlaKNM2gCSDg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
