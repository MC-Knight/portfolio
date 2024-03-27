function showToaster(message, seconds = 3000) {
  const toastP = document.getElementById("login-toast");
  toastP.innerText = message;
  toastP.classList.add("login-toast");

  setTimeout(() => {
    toastP.innerText = "";
    toastP.classList.remove("login-toast");
  }, seconds);
}

async function ValidateForm() {
  return new Promise((resolve, reject) => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const form = document.forms["login-continue-form"];

    const emailValue = form["email"].value;
    const passwordValue = form["password"].value;

    if (emailValue === "" && passwordValue === "") {
      email.style.border = "1px solid #FF4820";
      password.style.border = "1px solid #FF4820";
      reject("All fields are required");
    }

    if (emailValue === "") {
      email.style.border = "1px solid #FF4820";
      reject("Email is required");
    }

    if (passwordValue === "") {
      password.style.border = "1px solid #FF4820";
      reject("Password is required");
    }

    const useData = {
      email: emailValue,
      password: passwordValue,
    };

    resolve(useData);
  }).catch((error) => {
    showToaster(error);
  });
}

const loginHandler = async (e) => {
  e.preventDefault();
  const data = await ValidateForm();

  if (data === undefined) return;

  const url =
    "https://portfolioapi-production-ec62.up.railway.app/api/users/login";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (response.ok) {
      const data = await response.json();
      showToaster(data.message);
      localStorage.setItem("dauth", data.access);
      localStorage.setItem("dref", data.refresh);
      setTimeout(() => {
        window.location.href = "/dashboard/dashboard.html";
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", loginHandler);

const checkUserToken = () => {
  const token = localStorage.getItem("dauth");

  if (token) {
    window.location.href = "/dashboard/dashboard.html";
  }
};
checkUserToken();
