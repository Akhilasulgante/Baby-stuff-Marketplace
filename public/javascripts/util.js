// Utility functions
const debounce = (callback, delay) => {
  let timeout = null;
  return (...params) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback.call(null, ...params);
    }, delay);
  };
};

// From stack overflow
const validateEmail = () => {
  return true;
};

const registerPasswordToggler = () => {
  let passwordToggler = document.getElementById("passwordToggler");
  let passwordInput = document.getElementById("passwordInput");
  passwordToggler.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
};

export { debounce, validateEmail, registerPasswordToggler };
