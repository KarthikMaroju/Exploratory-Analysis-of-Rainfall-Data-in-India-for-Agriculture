let token = localStorage.getItem("token");

async function register(){
const username=document.getElementById("ruser").value;
const password=document.getElementById("rpass").value;
const role=document.getElementById("role").value;

await fetch("/api/auth/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password,role})
});
alert("Registered");
window.location="index.html";
}

async function login(){
const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

const res=await fetch("/api/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
});

const data=await res.json();
if(data.token){
localStorage.setItem("token",data.token);
window.location="dashboard.html";
}else{
document.getElementById("error").innerText="Invalid Login";
}
}

function logout(){
localStorage.removeItem("token");
window.location="index.html";
}

async function addData(){
await fetch("/api/rainfall/add",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":localStorage.getItem("token")
},
body:JSON.stringify({
year:document.getElementById("year").value,
amount:document.getElementById("amount").value
})
});
loadData();
}

async function loadData(){
const res=await fetch("/api/rainfall",{
headers:{"Authorization":localStorage.getItem("token")}
});
const data=await res.json();

let total=0;
let table=document.getElementById("table");
table.innerHTML="";

data.forEach(d=>{
total+=d.amount;
table.innerHTML+=`
<tr>
<td>${d.year}</td>
<td>${d.amount}</td>
<td>
<button onclick="deleteData('${d._id}')">Delete</button>
</td>
</tr>`;
});

document.getElementById("analytics").innerHTML="Total Rainfall: "+total;

new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:data.map(d=>d.year),
datasets:[{label:"Rainfall",data:data.map(d=>d.amount)}]
}
});
}

async function deleteData(id){
await fetch(`/api/rainfall/delete/${id}`,{
method:"DELETE",
headers:{"Authorization":localStorage.getItem("token")}
});
loadData();
}

function exportCSV(){
let rows=document.querySelectorAll("table tr");
let csv=[];
rows.forEach(row=>{
let cols=row.querySelectorAll("td,th");
let rowData=[];
cols.forEach(col=>rowData.push(col.innerText));
csv.push(rowData.join(","));
});
let blob=new Blob([csv.join("\n")]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="rainfall.csv";
a.click();
}

if(window.location.pathname.includes("dashboard")){
loadData();
}
