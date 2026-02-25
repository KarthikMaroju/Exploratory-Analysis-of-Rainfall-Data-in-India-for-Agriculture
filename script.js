const API_URL = "http://localhost:5000/api/rainfall";

async function addRainfall() {
    const state = document.getElementById("state").value;
    const year = document.getElementById("year").value;
    const rainfall = document.getElementById("rainfall").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, year, rainfall })
    });

    getRainfall();
}

async function getRainfall() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const container = document.getElementById("dataContainer");
    container.innerHTML = "";

    data.forEach(item => {
        container.innerHTML += `
            <p>${item.state} - ${item.year} - ${item.rainfall} mm</p>
        `;
    });
}

getRainfall();
