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
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
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

// ensure not to reset current blogs localStorage state
if (!localStorage.getItem("blogs")) {
  localStorage.setItem("blogs", JSON.stringify([]));
}

// load last two blogs
const loadLastTwoBlogs = () => {
  // get blogs from local storage
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const blogContainer = document.querySelector(".blog-container");

  if (blogs.length === 0) {
    const noBlogs = document.createElement("p");
    noBlogs.classList.add("no-blog");
    noBlogs.textContent = "no blogs at the moment";
    blogContainer.appendChild(p);
  } else {
    let lastTwoBlogs = blogs.slice(-2);
    for (let i = 0; i < lastTwoBlogs.length; i++) {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-content");

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
            </svg>
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
        <a href="blog/blog.html?id=${lastTwoBlogs[i].id}">
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
      blogContainer.appendChild(blogCard);
    }
  }
};
loadLastTwoBlogs();
