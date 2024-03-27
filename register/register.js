function showToaster(message, seconds = 3000) {
  const toastP = document.getElementById("register-toast");
  toastP.innerText = message;
  toastP.classList.add("register-toast");

  setTimeout(() => {
    toastP.innerText = "";
    toastP.classList.remove("register-toast");
  }, seconds);
}

async function ValidateForm() {
  return new Promise((resolve, reject) => {
    const fname = document.getElementById("fName");
    const lname = document.getElementById("lName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const form = document.forms["register-continue-form"];

    const firstName = form["firstName"].value;
    const lastName = form["lastName"].value;
    const emailValue = form["email"].value;
    const passwordValue = form["password"].value;

    if (
      firstName === "" &&
      lastName === "" &&
      emailValue === "" &&
      passwordValue === ""
    ) {
      fname.style.border = "1px solid #FF4820";
      lname.style.border = "1px solid #FF4820";
      email.style.border = "1px solid #FF4820";
      password.style.border = "1px solid #FF4820";
      reject("All fields are required");
    }

    if (firstName === "") {
      fname.style.border = "1px solid #FF4820";
      reject("First Name is required");
    }

    if (lastName === "") {
      lname.style.border = "1px solid #FF4820";
      reject("Last Name is required");
    }

    if (emailValue === "") {
      email.style.border = "1px solid #FF4820";
      reject("Email is required");
    }

    if (passwordValue === "") {
      password.style.border = "1px solid #FF4820";
      reject("Password is required");
    }

    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;

    if (!PASSWORD_REGEX.test(passwordValue)) {
      password.style.border = "1px solid #FF4820";
      reject(
        "Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }

    const useData = {
      firstName: firstName,
      lastName: lastName,
      email: emailValue,
      password: passwordValue,
    };

    resolve(useData);
  }).catch((error) => {
    showToaster(error);
  });
}

const registerBtn = document.getElementById("register");
const registerHandler = async (e) => {
  e.preventDefault();
  const data = await ValidateForm();

  if (data === undefined) return;

  const url =
    "https://portfolioapi-production-ec62.up.railway.app/api/users/register";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const isLoading = document.createElement("div");
  isLoading.classList.add("loader");
  registerBtn.innerHTML = "";
  registerBtn.appendChild(isLoading);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      registerBtn.innerHTML = "Login";
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (response.ok) {
      registerBtn.innerHTML = "Login";
      const data = await response.json();
      showToaster(data.message);
      setTimeout(() => {
        window.location.href = "/login/login.html";
      }, 3000);
    }
  } catch (error) {
    registerBtn.innerHTML = "Login";
    console.log(error);
  }
};

registerBtn.addEventListener("click", registerHandler);

const checkUserToken = () => {
  const token = localStorage.getItem("dauth");

  if (token) {
    window.location.href = "/dashboard/dashboard.html";
  }
};
checkUserToken();
