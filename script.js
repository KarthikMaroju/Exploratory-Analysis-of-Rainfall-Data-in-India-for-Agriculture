let chart;

// Add Data
async function addData(){
    const year = document.getElementById("year").value;
    const amount = document.getElementById("amount").value;

    await fetch("/api/rainfall/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({year,amount})
    });

    loadData();
}

// Load All Data
async function loadData(){
    const res = await fetch("/api/rainfall");
    const data = await res.json();

    const table = document.getElementById("tableData");
    table.innerHTML = "";

    let total = 0;
    let highest = 0;
    let lowest = data[0] ? data[0].amount : 0;

    data.forEach(d=>{
        total += d.amount;
        if(d.amount > highest) highest = d.amount;
        if(d.amount < lowest) lowest = d.amount;

        table.innerHTML += `
            <tr>
                <td>${d.year}</td>
                <td>${d.amount}</td>
                <td>
                    <button onclick="editData('${d._id}',${d.year},${d.amount})">Edit</button>
                    <button onclick="deleteData('${d._id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    const avg = data.length ? (total/data.length).toFixed(2) : 0;

    document.getElementById("total").innerText = total;
    document.getElementById("average").innerText = avg;
    document.getElementById("highest").innerText = highest;
    document.getElementById("lowest").innerText = lowest;

    loadChart(data);
}

// Edit Data
async function editData(id,year,amount){
    const newYear = prompt("Edit Year:",year);
    const newAmount = prompt("Edit Amount:",amount);

    await fetch(`/api/rainfall/update/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({year:newYear,amount:newAmount})
    });

    loadData();
}

// Delete Data
async function deleteData(id){
    await fetch(`/api/rainfall/delete/${id}`,{
        method:"DELETE"
    });

    loadData();
}

// Chart
function loadChart(data){
    const years = data.map(d=>d.year);
    const amounts = data.map(d=>d.amount);

    if(chart) chart.destroy();

    chart = new Chart(document.getElementById("rainChart"),{
        type:"bar",
        data:{
            labels:years,
            datasets:[{
                label:"Rainfall Analytics",
                data:amounts,
                backgroundColor:"rgba(54,162,235,0.6)"
            }]
        }
    });
}

if(window.location.pathname.includes("dashboard")){
    loadData();
}
