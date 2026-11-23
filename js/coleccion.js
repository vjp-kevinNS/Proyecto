// ==================================================
// CLASE GESTORA DE PLANTAS
// ==================================================

import { buscarPorTexto, anadirPlanta, eliminarPorId } from "./logica.js";
import { Planta } from "./planta.js";

export class ColeccionPlantas {
  // Guarda la lista de plantas.
  constructor(plantas) {
    this._plantas = plantas;
  }

  // Crea la colección a partir de los datos iniciales.
  static desdeDatos(datos) {
    const plantas = [];

    // Convertimos cada registro en un objeto Planta.
    for (const dato of datos) {
      plantas.push(new Planta(dato));
    }

    // Devolvemos una nueva colección de plantas.
    return new ColeccionPlantas(plantas);
  }

  // Devuelve cuántas plantas hay.
  get total() {
    return this._plantas.length;
  }

  // Devuelve una copia de la lista.
  listar() {
    return [...this._plantas];
  }

  // Añade una planta y devuelve su nuevo ID.
  anadir(elemento) {
    return anadirPlanta(this._plantas, elemento);
  }

  // Elimina una planta por su ID.
  eliminar(id) {
    return eliminarPorId(this._plantas, id);
  }

  // Busca plantas por texto.
  buscar(texto) {
    return buscarPorTexto(this._plantas, texto);
  }
}
