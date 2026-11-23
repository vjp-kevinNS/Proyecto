
import { diasDesde } from "./fechas.js";

// El nombre usa letras y admite espacios, guiones o apóstrofes entre palabras.
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

/**
 * Representa una planta con sus datos y operaciones.
 */
export class Planta {

    /**
     * Crea una planta a partir de un objeto con sus datos.
     * @param {Object} datos - Datos de la planta.
     */
    constructor(datos) {
        this.altura = datos.altura;

        if (typeof datos.nombre !== "string" || !PATRON_NOMBRE.test(datos.nombre)) {
            throw new Error("El nombre de la planta no es válido.");
        }

        for (const dato of [datos.especie, datos.fecha_adquisicion, datos.ubicacion, datos.estado]) {
            if (typeof dato !== "string" || dato.trim() === "") {
                throw new Error("La planta nueva debe incluir todos sus datos.");
            }
        }

        this.id = datos.id;
        this.nombre = datos.nombre;
        this.especie = datos.especie;
        this.fecha_adquisicion = datos.fecha_adquisicion;
        this.ubicacion = datos.ubicacion;
        this.estado = datos.estado;
    }

    /**
     * Devuelve la altura de la planta.
     * @returns {number} Altura en centímetros.
     */
    get altura() {
        return this._altura;
    }

    /**
     * Valida y establece la altura de la planta.
     * @param {number} valor - Altura en centímetros.
     */
    set altura(valor) {
        if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0 || valor === Infinity) {
            throw new Error("La altura debe ser un número finito mayor o igual que cero.");
        }
        this._altura = valor;
    }

    /**
     * Genera una descripción de la planta.
     * @returns {string} Descripción con especie, altura y ubicación.
     */
    descripcion() {
        return `${this.especie} · ${this.altura} cm · ${this.ubicacion}`;
    }

    /**
     * Comprueba si la planta fue adquirida dentro del número de días indicado.
     * @param {number} dias - Número máximo de días para considerar reciente la planta.
     * @returns {boolean} true si es reciente y false si no lo es.
     */
    esReciente(dias) {
        const transcurridos = diasDesde(this.fecha_adquisicion);
        return transcurridos >= 0 && transcurridos <= dias;
    }
}
