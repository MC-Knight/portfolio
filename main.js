// ============================================================
// NAVBAR — scroll effect
// ============================================================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ============================================================
// MOBILE NAV — open / close
// ============================================================
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const mobileNav = document.getElementById("mobile-nav");
const navOverlay = document.getElementById("nav-overlay");

function openMobileNav() {
  mobileNav.classList.add("open");
  navOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  navOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

navOpen.addEventListener("click", openMobileNav);
navClose.addEventListener("click", closeMobileNav);
navOverlay.addEventListener("click", closeMobileNav);

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// ============================================================
// AGE CALCULATION
// ============================================================
const ageSpan = document.getElementById("ageSpan");
if (ageSpan) {
  ageSpan.textContent = new Date().getFullYear() - 2000;
}

// ============================================================
// FOOTER YEAR
// ============================================================
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ============================================================
// CONTACT FORM — Google Sheets
// ============================================================
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz00IMAUfMt0LyM3OJ2dOxJeNeWY9XgKG7XHvJ45to9tDTiq2FgIi5pzvvlaKNM2gCSDg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        msg.textContent = "Message sent successfully";
        form.reset();
        setTimeout(() => {
          msg.textContent = "";
        }, 4000);
      })
      .catch(() => {
        msg.textContent = "Something went wrong. Please try again.";
        setTimeout(() => {
          msg.textContent = "";
        }, 4000);
      });
  });
}

// ============================================================
// ACTIVE NAV LINK on scroll (Intersection Observer)
// ============================================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(
          `.navbar-links a[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => sectionObserver.observe(section));

// ============================================================
// 3D TILT EFFECT — mouse-tracked card tilt
// ============================================================
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
});
