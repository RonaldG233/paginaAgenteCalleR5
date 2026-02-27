// URL de Google Apps Script
const urlApi =
"https://script.googleusercontent.com/macros/echo?user_content_key=AY5xjrS-6Px3dYm6qVw1b1n5-TeVORnNu9UwD0xglPUmhDnRUB6wkDDDXR-VlhkI_x8S-BcVQTH1EwBG4lVxV74AKgoxby53ncXVhqNmtGW86exRL-0hS2fkVVz2siu4woNzc1C8ITK_KNvlyla_AUbpGdH06PH2DeWTaGHqSIFFHIWts5xwKkdbNqduhgZwgjoMw7rzow_AwHaEbgvIwAO07fEZh6Q71Loi-NliqDaOgtioXd1GuDUGLy6p1tgwCqIsYah8LsMWj9jOWEnuQA_6x7ANEBC4MjAFw9GW5nuh&lib=MCIxAao-8S6Z2zmHhGskQNBzzZoSwmMA3";


async function cargarDistritos() {

try {

const respuesta = await fetch(urlApi);

const datos = await respuesta.json();


// Ordenar
datos.sort((a,b)=>
a.localeCompare(b,'es',{sensitivity:'base'})
);


const select =
document.getElementById("selectDistrito");


// Limpiar
select.innerHTML =
'<option value="">Seleccione un distrito</option>';


// Agregar opciones
datos.forEach(distrito=>{

const opcion =
document.createElement("option");

opcion.value=distrito;

opcion.textContent=distrito;

select.appendChild(opcion);

});


// ✅ EVENTO CUANDO CAMBIA EL SELECT

select.addEventListener("change", function(){


const distritoSeleccionado =
select.value;


// Cambiar nombre arriba
document.querySelector(".nombreDistrito")
textContent =
distritoSeleccionado;


// Cambiar titulo ficha
document.querySelector(".titulo__fichaDistritoZona")
.textContent =
distritoSeleccionado;


});


}catch(error){

console.log("Error:");
console.log(error);

}

}


window.onload=cargarDistritos;