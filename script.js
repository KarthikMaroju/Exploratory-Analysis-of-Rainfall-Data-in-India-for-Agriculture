// Check login status
window.onload = function() {
    if(localStorage.getItem("loggedIn") === "true") {
        showApp();
    }
}

// LOGIN FUNCTION
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "LTVIP2026TMIDS43284" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        showApp();
    } else {
        alert("Invalid Credentials");
    }
}

// SHOW APP
function showApp() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    getRainfall();
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

// ADD DATA
function addRainfall() {
    const state = document.getElementById("state").value;
    const year = document.getElementById("year").value;
    const rainfall = document.getElementById("rainfall").value;

    let data = JSON.parse(localStorage.getItem("rainfallData")) || [];

    data.push({ state, year, rainfall });

    localStorage.setItem("rainfallData", JSON.stringify(data));

    getRainfall();
}

// DISPLAY DATA
function getRainfall() {
    let data = JSON.parse(localStorage.getItem("rainfallData")) || [];

    const container = document.getElementById("dataContainer");
    container.innerHTML = "";

    data.forEach(item => {
        container.innerHTML += `
            <p>${item.state} - ${item.year} - ${item.rainfall} mm</p>
        `;
    });
}
