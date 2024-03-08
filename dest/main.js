"use strict";
// onscroll navigation bar
if (document.getElementById("onscroll-navbar")) {
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("onscroll-navbar");
        if (navbar !== null) {
            if (window.innerWidth >= 956) {
                if (window.scrollY > 40) {
                    navbar.style.display = "flex";
                }
                else {
                    navbar.style.display = "none";
                }
            }
            else {
                navbar.style.display = "none";
            }
        }
    });
}
//age span
const span = document.getElementById("ageSpan");
const currentYear = new Date().getFullYear();
const birthYear = 2000;
const age = currentYear - birthYear;
if (span !== null) {
    span.innerHTML = age.toString();
}
//footer year
const yearSpan = document.getElementById("footer-year");
if (yearSpan !== null) {
    yearSpan.innerHTML = currentYear.toString();
}
const scriptURL = "https://script.google.com/macros/s/AKfycbz00IMAUfMt0LyM3OJ2dOxJeNeWY9XgKG7XHvJ45to9tDTiq2FgIi5pzvvlaKNM2gCSDg/exec";
const form = document.forms.namedItem("submit-to-google-sheet");
const msg = document.getElementById("msg");
if (form !== null) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameField = form["name"];
        const emailField = form["email"];
        const messageField = form["Message"];
        if (nameField.value.trim() === "") {
            alert("Please enter your name.");
            return;
        }
        if (emailField.value.trim() === "") {
            alert("Please enter your email.");
            return;
        }
        if (messageField.value.trim() === "") {
            alert("Please enter your message.");
            return;
        }
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => {
            if (msg !== null)
                msg.innerHTML = "Message sent successfully";
            setTimeout(() => {
                if (msg !== null)
                    msg.innerHTML = "";
            }, 3000);
            form.reset();
            console.log(response);
        })
            .catch((error) => console.error("Error!", error.message));
    });
}
//open and close menu in small screen
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("open");
const menu = document.getElementById("small-screens");
if (openBtn !== null)
    openBtn.addEventListener("click", openMenu);
if (closeBtn !== null)
    closeBtn.addEventListener("click", closeMenu);
function openMenu() {
    if (menu !== null)
        menu.style.right = "0";
}
function closeMenu() {
    if (menu !== null)
        menu.style.right = "-200px";
}
// ensure not to reset current blogs localStorage state
if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify([]));
}
const loadLastTwoBlogs = () => {
    // get blogs from local storage
    let blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const blogContainer = document.querySelector(".blog-container");
    if (blogs.length === 0) {
        const noBlogs = document.createElement("p");
        noBlogs.classList.add("no-blog");
        noBlogs.textContent = "no blogs at the moment";
        if (blogContainer !== null)
            blogContainer.appendChild(noBlogs);
    }
    else {
        let lastTwoBlogs = blogs.slice(-2);
        for (let i = 0; i < lastTwoBlogs.length; i++) {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-content");
            const likedHeart = `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 13.2222C19.49 11.6 21 9.65556 21 7.11111C21 5.49034 20.4205 3.93596 19.3891 2.7899C18.3576 1.64385 16.9587 1 15.5 1C13.74 1 12.5 1.55556 11 3.22222C9.5 1.55556 8.26 1 6.5 1C5.04131 1 3.64236 1.64385 2.61091 2.7899C1.57946 3.93596 1 5.49034 1 7.11111C1 9.66667 2.5 11.6111 4 13.2222L11 21L18 13.2222Z" fill="#F70000" stroke="#F70000" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
            const notLikedHeart = `
        <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.3 10.1667C17.641 8.95 19 7.49167 19 5.58333C19 4.36776 18.4785 3.20197 17.5502 2.34243C16.6219 1.48289 15.3628 1 14.05 1C12.466 1 11.35 1.41667 10 2.66667C8.65 1.41667 7.534 1 5.95 1C4.63718 1 3.37813 1.48289 2.44982 2.34243C1.52152 3.20197 1 4.36776 1 5.58333C1 7.5 2.35 8.95833 3.7 10.1667L10 16L16.3 10.1667Z"
          stroke="black"
          stroke-opacity="0.6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;
            blogCard.innerHTML = `
        <img src="../posters/${lastTwoBlogs[i].poster}" alt="" />
        <p class="blog-date">${lastTwoBlogs[i].date}</p>
        <p class="blog-title">${lastTwoBlogs[i].title}</p>
        <p class="blog-text">
          ${lastTwoBlogs[i].content.split(" ").slice(0, 5).join(" ")} ...
        </p>
  
        <div class="blog-buttons">
          <div class="blog-like">
            <div>
              ${lastTwoBlogs[i].isLiked ? likedHeart : notLikedHeart}
              ${lastTwoBlogs[i].likes}
            </div>
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              ${lastTwoBlogs[i].views}
            </div>
          </div>
          <a href="./pages/blog.html?id=${lastTwoBlogs[i].id}">
            Read More
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 7.5H12.6667"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 3.125L12.6667 7.5L8 11.875"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>`;
            if (blogContainer !== null)
                blogContainer.appendChild(blogCard);
        }
    }
};
loadLastTwoBlogs();
