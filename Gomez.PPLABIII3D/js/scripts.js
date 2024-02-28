import { actualizarTabla } from "./tabla.js";
import { Heroe } from "./heroe.js";
const $seccionTabla = document.getElementById("tabla");
const $formulario = document.getElementById("formulario");
const $selectArmas = document.getElementById("selectArma");
const $botonEliminar = document.getElementById("botonEliminar");
const $botonCancelar = document.getElementById("botonCancelar");
const $loader = document.getElementById("loader-section");
const armasLocal = ["Armadura", "Espada", "Martillo", "Escudo", "Arma de Fuego", "Flechas", "Musculos", "Lazo"];

const armas = JSON.parse(localStorage.getItem("armas")) || localStorage.setItem("armas", JSON.stringify(armasLocal));

$botonEliminar.style.display = "none";
$botonCancelar.style.display = "none";

$loader.style.display = "none";

const heroes = JSON.parse(localStorage.getItem("heroes")) || [];
console.log(heroes);
actualizarTabla($seccionTabla, heroes);

armas.forEach((element) => {
  const option = document.createElement("option");
  option.textContent = element;
  option.value = element;
  $selectArmas.appendChild(option);
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.dataset.id;
    const selectedHeroe = heroes.find((hero) => hero.id == id);

    cargarFormHeroes($formulario, selectedHeroe);
    $botonEliminar.style.display = "inline-block";
    $botonCancelar.style.display = "inline-block";
  } else if (e.target.matches("input[value='Eliminar']")) {
    if ($formulario.txtId.value !== "") {
      handlerDelete(parseInt($formulario.txtId.value));
      $botonEliminar.style.display = "none";
    }
  } else if (e.target.matches("input[value='Cancelar']")) {
    actualizarFormulario();
  }
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const { txtId, txtNombre, txtAlias, rdoEditorial, inputFuerza, selectArma } =
    $formulario;
  if (txtId.value === "") {
    //anuncio nuevo
    const newHeroe = new Heroe(
      Date.now(),
      txtNombre.value,
      parseInt(inputFuerza.value),
      txtAlias.value,
      rdoEditorial.value,
      selectArma.value
    );
    handlerCreate(newHeroe);
  } else {
    const updatedHeroe = new Heroe(
      parseInt(txtId.value),
      txtNombre.value,
      parseInt(inputFuerza.value),
      txtAlias.value,
      rdoEditorial.value,
      selectArma.value
    );
    handlerUpdate(updatedHeroe);
  }
  actualizarFormulario();
});

function handlerCreate(nuevoHeroe) {
  heroes.push(nuevoHeroe);
  actualizarStorage("heroes", heroes);
  actualizarTabla($seccionTabla, heroes);
}
function handlerUpdate(editHeroe) {
  let index = heroes.findIndex((hero) => hero.id == editHeroe.id);
  heroes.splice(index, 1, editHeroe);
  actualizarStorage("heroes", heroes);
  actualizarTabla($seccionTabla, heroes);
}
function handlerDelete(id) {
  let index = heroes.findIndex((hero) => hero.id == id);
  heroes.splice(index, 1);
  actualizarStorage("heroes", heroes);
  actualizarTabla($seccionTabla, heroes);
  actualizarFormulario();
}

function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}

function cargarFormHeroes(formulario, heroe) {
  formulario.txtId.value = heroe.id;
  formulario.txtNombre.value = heroe.nombre;
  formulario.txtAlias.value = heroe.alias;
  formulario.rdoEditorial.value = heroe.editorial;
  formulario.inputFuerza.value = heroe.fuerza;
  formulario.selectArma.value = heroe.arma;
}

function actualizarFormulario() {
  $loader.style.display = "flex";
  setTimeout(function () {
    $formulario.reset();
    $formulario.txtId.value = "";
    $botonEliminar.style.display = "none";
    $botonCancelar.style.display = "none";
    $loader.style.display = "none";
  }, 2000);
}
