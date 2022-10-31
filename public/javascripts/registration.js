// By Zhiyi Jin
function RegisterPage() {
    const registerUser = {};
    const form = document.getElementById("signUpForm");

    registerUser.register = () => {
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

            let formData = new FormData(form);
            let data = {};
            formData.forEach((val, key) => {
                data[key] = val;
            });
            let json = JSON.stringify(data);

            let post = await fetch("/api/users/signup", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: json,
            });
            console.log("post: ", post);
            if (post.ok) {
                let result = await post.json();
                sessionStorage.setItem("user", JSON.stringify(result.user));
                window.location.replace("/posts");
            }
            signUpButton.classList.remove("disabled");
        });
    };

    registerUser.togglerPassword = () => {
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

    return registerUser;
}

const user = RegisterPage();
user.togglerPassword();
user.register();

export default RegisterPage();
