// onscroll navigation bar
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("onscroll-navbar");
  if (navbar) {
    if (window.innerWidth >= 956) {
      if (window.scrollY > 40) {
        navbar.style.display = "flex";
      } else {
        navbar.style.display = "none";
      }
    } else {
      navbar.style.display = "none";
    }
  }
});

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
  if (form["name"].value == null || form["name"].value == "") {
    alert("please enter your name.");
    return;
  }

  if (form["email"].value == null || form["email"].value == "") {
    alert("please enter your email.");
    return;
  }

  if (form["Message"].value == null || form["Message"].value == "") {
    alert("please enter your Message.");
    return;
  }
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 3000);
      form.reset();
      console.log(response);
    })
    .catch((error) => console.error("Error!", error.message));
});

//open and close menu in small screen
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("open");
const menu = document.getElementById("small-screens");

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

function openMenu() {
  menu.style.right = "0";
}

function closeMenu() {
  menu.style.right = "-200px";
}
