function LoginPage() {
    const userLogin = {};
    let form = document.getElementById("loginForm");

    userLogin.togglerPassword = () => {
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

    userLogin.login = () => {
        if (JSON.parse(sessionStorage.getItem("user"))) {
            window.location.replace("/posts");
        }

        let loginButton = document.getElementById("loginButton");
        let errorMsg = document.getElementById("loginErrorMsg");

        loginButton.addEventListener("click", async () => {
            loginButton.classList.add("disabled");

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
    };
    return userLogin;
}

const user = LoginPage();
user.togglerPassword();
user.login();

export default LoginPage();
