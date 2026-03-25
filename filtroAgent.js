const urlApi = "https://script.google.com/macros/s/AKfycbyvhLl62hjOk_Mc5GXfLpknDm9P9HQLdqPxkr3F3k7igjRY02v2HkGu5XZxeXIOlc4b/exec";

let datosGlobal = [];

async function cargarAgentes(){

try{

const respuesta = await fetch(urlApi + "?t=" + new Date().getTime());
const datos = await respuesta.json();

datosGlobal = datos;

cargarSelect(datosGlobal);
mostrarTabla(datosGlobal);
mostrarFecha();

}catch(error){

console.log("Error:", error);

}

}



function cargarSelect(datos){

const select = document.getElementById("selectDistrito");

select.innerHTML = `
<option value="">TODOS LOS AGENTES</option>
`;

const agentes = [...new Set(datos.map(d => d.AGENTES))];

agentes.sort();

agentes.forEach(agente => {

const option = document.createElement("option");

option.value = agente;
option.textContent = agente;

select.appendChild(option);

});


select.addEventListener("change", function(){

const agente = this.value;

if(agente == ""){
mostrarTabla(datosGlobal);
return;
}

const filtrado = datosGlobal.filter(d => d.AGENTES == agente);

mostrarTabla(filtrado);

});

}



function mostrarTabla(datos){

const body = document.getElementById("bodyTabla");
body.innerHTML = "";

datos.forEach(d => {

let cumplimientoInstaladas = "";
let valorInst = Number(d["CUMPLIMIENTO INSTALADAS"]);

if(!isNaN(valorInst)){
    cumplimientoInstaladas = (valorInst * 100).toFixed(1) + "%";
}else{
    cumplimientoInstaladas = d["CUMPLIMIENTO INSTALADAS"];
}


let cumplimientoDigitadas = "";
let valorDig = Number(d["CUMPLIMIENTO DIGITADAS"]);

if(!isNaN(valorDig)){
    cumplimientoDigitadas = (valorDig * 100).toFixed(1) + "%";
}else{
    cumplimientoDigitadas = d["CUMPLIMIENTO DIGITADAS"];
}

const tr = document.createElement("tr");

tr.innerHTML = `
<td>${limpiar(d["AGENTES"])}</td>
<td>${limpiar(d["ZONA"])}</td>
<td>${limpiar(d["DISTRITO"])}</td>
<td>${limpiar(d["METAS INSTALADAS"])}</td>
<td>${limpiar(d["INSTALADAS"])}</td>
<td>${limpiar(d["PROYECCION INSTALADAS"])}</td>
<td class="porcentaje">${cumplimientoInstaladas}</td>
<td>${limpiar(d["DEBERIA LLEVAR"])}</td>
<td>${limpiar(d["DIFERENCIA"])}</td>
<td>${limpiar(d["METAS DIGITADAS"])}</td>
<td>${limpiar(d["DIGITADAS"])}</td>
<td>${limpiar(d["PROYECCION DIGITADAS"])}</td>
<td class="porcentaje">${cumplimientoDigitadas}</td>
<td>${limpiar(d["DEBERIA LLEVAR"])}</td>
<td>${limpiar(d["DIFERENCIA"])}</td>
`;

body.appendChild(tr);

});

aplicarColores();
}


function limpiar(valor){

if(valor === undefined || valor === null) return "";

if(valor == "#¡DIV/0!") return "0";

return valor;

}



function aplicarColores(){

document.querySelectorAll(".porcentaje").forEach(td => {

let valor = parseFloat(td.textContent.replace("%",""));

if(isNaN(valor)) return;

if(valor < 70){

td.style.background = "#ff6b6b";
td.style.color = "white";

}
else if(valor < 100){

td.style.background = "#ffd93d";

}
else{

td.style.background = "#6bff95";

}

});

}



// 📅 mostrar fecha
function mostrarFecha(){

const fecha = new Date();

const opciones = {
year: 'numeric',
month: 'long',
day: 'numeric'
};

document.getElementById("fechaHoy").textContent =
"Actualizado: " + fecha.toLocaleDateString("es-ES", opciones);

}



function formatearPorcentaje(valor){

if(valor === "" || valor === null) return "";

if(valor == "#¡DIV/0!" || valor == "#DIV/0!") return "0%";

let texto = valor.toString().trim();

// si ya viene con %
if(texto.includes("%")){
return texto;
}

let numero = parseFloat(texto);

if(isNaN(numero)) return "";

// si viene como decimal (0.94)
if(numero <= 1){
numero = numero * 100;
}

return numero.toFixed(0) + "%";

}



window.onload = cargarAgentes;