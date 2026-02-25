function addRainfall() {
    const state = document.getElementById("state").value;
    const year = document.getElementById("year").value;
    const rainfall = document.getElementById("rainfall").value;

    let data = JSON.parse(localStorage.getItem("rainfallData")) || [];

    data.push({ state, year, rainfall });

    localStorage.setItem("rainfallData", JSON.stringify(data));

    getRainfall();
}

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

getRainfall();
