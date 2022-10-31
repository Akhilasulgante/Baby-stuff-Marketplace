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
const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
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
