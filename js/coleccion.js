// ==================================================
// CLASE GESTORA DE PLANTAS
// ==================================================


import {
    anadirPlanta,
    eliminarPorId,
    buscarPorTexto
} from "./logica.js";

import { Planta } from "./planta.js";

/**
 * Gestiona la colección de plantas y permite realizar operaciones sobre ella.
 */
export class ColeccionPlantas {

    /**
     * Crea una colección a partir de un array de plantas.
     * @param {Planta[]} plantas - Array de plantas de la colección.
     */
    constructor(plantas) {
        this._plantas = plantas;
    }

    /**
     * Devuelve el número total de plantas de la colección.
     * @returns {number} Cantidad de plantas.
     */
    get total() {
        return this._plantas.length;
    }

    /**
     * Devuelve una copia del array de plantas.
     * @returns {Planta[]} Copia de la colección.
     */
    listar() {
        return [...this._plantas];
    }

    /**
     * Añade una planta nueva a la colección.
     * @param {Planta} planta - Planta que se quiere añadir.
     * @returns {number|null} ID de la planta añadida o null si falla.
     */
    anadir(planta) {
        return anadirPlanta(this._plantas, planta);
    }

    /**
     * Busca plantas que coincidan con el texto indicado.
     * @param {string} texto - Texto que se quiere buscar.
     * @returns {Planta[]} Plantas que coinciden con la búsqueda.
     */
    buscar(texto) {
        return buscarPorTexto(this._plantas, texto);
    }

    /**
     * Elimina una planta utilizando su identificador.
     * @param {number} id - Identificador de la planta.
     * @returns {boolean} true si se elimina y false si no existe.
     */
    eliminar(id) {
        return eliminarPorId(this._plantas, id);
    }

    /**
     * Crea una colección de plantas a partir de los datos iniciales.
     * @param {Object[]} datos - Array con los datos de las plantas.
     * @returns {ColeccionPlantas} Nueva colección de plantas.
     */
    static desdeDatos(datos) {
        const plantas = [];

        for (const dato of datos) {
            plantas.push(new Planta(dato));
        }

        return new ColeccionPlantas(plantas);
    }
}
