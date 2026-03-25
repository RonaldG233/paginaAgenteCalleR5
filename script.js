const urlApi="https://script.google.com/macros/s/AKfycbyUEk9uVlx4b7oYJEIlKJbcFao1pRkZg_x0LEorv6p_Eh0wqrQVj6dTinAn84RkqUNkhA/exec";


let datosGlobal=[];

async function cargarZonas(){

try{

const respuesta = await fetch(urlApi);
const datos = await respuesta.json();

datosGlobal = datos;

const select = document.getElementById("selectDistrito");

select.innerHTML =
'<option value="">Seleccione una zona</option>' +
'<option value="TODOS">TODAS LAS ZONAS</option>';


// obtener zonas únicas

const zonas = [...new Set(datos.map(f=>f[0]))];

zonas.sort();

zonas.forEach(zona=>{

const opcion=document.createElement("option");

opcion.value=zona;
opcion.textContent=zona;

select.appendChild(opcion);

});


mostrarTabla(datosGlobal);


// evento filtro

select.addEventListener("change",function(){

const zonaSeleccionada = select.value;

if(zonaSeleccionada=="TODOS" || zonaSeleccionada==""){

mostrarTabla(datosGlobal);
return;

}

const filtrado =
datosGlobal.filter(f => f[0] == zonaSeleccionada);

mostrarTabla(filtrado);

});

}catch(error){

console.log(error);

}

}



function mostrarTabla(datos){

const body = document.getElementById("bodyTabla");
body.innerHTML="";

datos.forEach((fila,index)=>{

// alternar color por grupo
const claseGrupo = index % 2 === 0 ? "grupoA" : "grupoB";


// 🔹 FILA INSTALADAS
const tr1=document.createElement("tr");
tr1.classList.add(claseGrupo);

for(let i=0;i<=7;i++){

const td=document.createElement("td");

if(i==5){

let valor = Number(fila[5]);

if(!isNaN(valor)){

let porcentaje = valor*100;

td.textContent = porcentaje.toFixed(1)+"%";

if(porcentaje < 70){
td.classList.add("cumplimiento_bajo");
}
else if(porcentaje < 100){
td.classList.add("cumplimiento_medio");
}
else{
td.classList.add("cumplimiento_alto");
}

}else{
td.textContent = fila[5];
}

}else{

td.textContent = fila[i];

}

tr1.appendChild(td);

}

body.appendChild(tr1);


// 🔹 FILA DIGITADAS

const tr2=document.createElement("tr");
tr2.classList.add(claseGrupo);

const columnasDigitadas=[8,9,10,11,12,13];

const tdTitulo=document.createElement("td");
tdTitulo.textContent="DIGITADAS";
tdTitulo.style.fontWeight="bold";
tr2.appendChild(tdTitulo);

const tdVacio=document.createElement("td");
tdVacio.textContent="";
tr2.appendChild(tdVacio);

columnasDigitadas.forEach((indexCol)=>{

const td=document.createElement("td");

if(indexCol==11){

let valor=Number(fila[indexCol]);

if(!isNaN(valor)){

let porcentaje=valor*100;

td.textContent=porcentaje.toFixed(1)+"%";

if(porcentaje < 70){
td.classList.add("cumplimiento_bajo");
}
else if(porcentaje < 100){
td.classList.add("cumplimiento_medio");
}
else{
td.classList.add("cumplimiento_alto");
}

}else{
td.textContent=fila[indexCol];
}

}else{

td.textContent=fila[indexCol];

}

tr2.appendChild(td);

});

body.appendChild(tr2);

});

}
function mostrarFecha(){

const fecha = new Date();

const opciones = {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
};

const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

document.getElementById("fechaHoy").textContent = fechaFormateada;

}
window.onload = function(){
cargarZonas();
mostrarFecha();
}


