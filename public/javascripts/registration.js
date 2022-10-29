import { debounce, validateEmail, registerPasswordToggler } from "./util.js";

registerPasswordToggler();

let emailIsValid = false;
let form = document.getElementById("signUpForm");
console.log(form)(
  // AJAX form submit
  () => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      window.location.replace("/posts");
    }

    let signUpButton = document.getElementById("signUpButton");
    signUpButton.addEventListener("click", async () => {
      console.log("clicking");
      signUpButton.classList.add("disabled");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        signUpButton.classList.remove("disabled");
        return;
      }
      if (!emailIsValid) {
        signUpButton.classList.remove("disabled");
        return;
      }

      let formData = new FormData(form);
      let data = {};
      formData.forEach((val, key) => {
        data[key] = val;
      });
      let json = JSON.stringify(data);

      let post = await fetch("/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      });
      if (post.ok) {
        let result = await post.json();
        sessionStorage.setItem("user", JSON.stringify(result.user));
        window.location.replace("/posts");
      }
      signUpButton.classList.remove("disabled");
      // else {
      //   let error = await post.json();
      // }
    });
  }
)();

// check email format and availability
(() => {
  let email = document.getElementById("email");
  let errorMsg = document.getElementById("emailErrorMsg");
  const checkAvailable = async () => {
    form.classList.remove("was-validated");
    if (!validateEmail(email.value)) {
      email.classList.add("is-invalid");
      errorMsg.innerText = "Email format incorrect";
    } else {
      let check = await fetch("/api/users/is-email-available", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      });
      if (check.ok) {
        let res = await check.json();
        if (!res.isAvailable) {
          email.classList.add("is-invalid");
          errorMsg.innerText = "Email is already in use";
        } else {
          emailIsValid = true;
        }
      }
    }
    if (emailIsValid) {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
    }
  };
  email.onkeyup = () => {
    emailIsValid = false;
    debounce(checkAvailable, 1000)();
  };
})();
