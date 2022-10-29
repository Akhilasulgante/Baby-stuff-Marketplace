// Akhila
import { validateEmail, registerPasswordToggler } from "./utils.js";

registerPasswordToggler();
let form = document.getElementById("loginForm");
let emailIsValid = false;

// AJAX form submit
(() => {
  if (JSON.parse(sessionStorage.getItem("user"))) {
    window.location.replace("/posts");
  }

  let loginButton = document.getElementById("loginButton");
  let errorMsg = document.getElementById("loginErrorMsg");

  loginButton.addEventListener("click", async () => {
    loginButton.classList.add("disabled");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      loginButton.classList.remove("disabled");
      return;
    }

    if (!emailIsValid) {
      loginButton.classList.remove("disabled");
      return;
    }

    let formData = new FormData(form);
    let data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });
    let json = JSON.stringify(data);

    let post = await fetch("/api/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: json,
    });
    if (post.ok) {
      let result = await post.json();

      sessionStorage.setItem("user", JSON.stringify(result.user));
      window.location.replace("/posts");
    } else {
      let error = await post.json();
      errorMsg.classList.remove("visually-hidden");
      errorMsg.innerText = error.message;
    }
    loginButton.classList.remove("disabled");
  });
})();

// check email format
(() => {
  let email = document.getElementById("email");
  let errorMsg = document.getElementById("emailErrorMsg");
  const checkFormat = () => {
    form.classList.remove("was-validated");
    if (email.value === "") {
      email.classList.add("is-invalid");
      errorMsg.innerText = "Please input email";
    } else if (!validateEmail(email.value)) {
      email.classList.add("is-invalid");
      errorMsg.innerText = "Email format incorrect";
    } else {
      emailIsValid = true;
      email.classList.remove("is-invalid");
    }
  };
  email.onkeyup = () => {
    emailIsValid = false;
    checkFormat();
  };
})();
