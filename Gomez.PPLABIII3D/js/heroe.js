import Personaje from "./personaje.js";

export class Heroe extends Personaje {
  constructor(id, nombre, alias, editorial, fuerza, arma) {
    super(id, nombre, fuerza);
    this.alias = alias;
    this.editorial = editorial;
    this.arma = arma;
  }
}

const crearHeroes = (data) => {
  if (!Array.isArray(data)) return null;
  const heroes = document.createElement("heroes");
  data.forEach((element) => {
    heroes.appendChild(crearHeroe(element));
  });
  return heroes;
};

const crearHeroe = (data) => {
  const article = document.createElement("article");
  const p = document.createElement("p");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");
  const imgFuerza = document.createElement("img");
  const imgArma = document.createElement("img");

  imgFuerza.src = "./img/fuerza.png";
  imgArma.src = "./img/arma.png";

  p3.appendChild(imgFuerza);
  p4.appendChild(imgArma);
  p.textContent = "Alias: " + data.alias;
  p1.textContent = "Nombre: " + data.nombre;
  p2.textContent = "Editorial: " + data.editorial;
  p5.textContent = "Fuerza: " + data.fuerza;
  p6.textContent = "Arma: " + data.arma;
  p3.appendChild(p5);
  p4.appendChild(p6);

  article.appendChild(p);
  article.appendChild(p1);
  article.appendChild(p2);
  article.appendChild(p3);
  article.appendChild(p4);

  return article;
};

export const actualizarHeroes = (contenedor, data) => {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  contenedor.appendChild(crearHeroes(data));
};
