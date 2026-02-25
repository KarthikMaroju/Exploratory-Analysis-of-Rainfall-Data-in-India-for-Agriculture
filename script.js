// Dark Mode Toggle
const toggle = document.getElementById("themeToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

// Login Validation
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (username === "admin" && password === "1234") {
        window.location.href = "dashboard.html";
    } else {
        error.textContent = "Invalid Username or Password!";
    }
}

function logout() {
    window.location.href = "index.html";
}
