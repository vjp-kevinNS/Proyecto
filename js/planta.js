import { diasDesde } from "./fechas.js";

// El nombre usa letras y admite espacios, guiones o apóstrofes entre palabras.
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

export class Planta {
    // Construye una planta a partir de un registro. Asignar la altura activa su setter.
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

    // El getter devuelve el valor guardado en _altura cuando se lee planta.altura.
    get altura() {
        return this._altura;
    }

    // El setter valida el valor antes de guardarlo. Cero sí es una altura válida.
    set altura(valor) {
        if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0 || valor === Infinity) {
            throw new Error("La altura debe ser un número finito mayor o igual que cero.");
        }
        this._altura = valor;
    }

    // Devuelve el texto que la interfaz coloca en la tarjeta.
    descripcion() {
        return `${this.especie} · ${this.altura} cm · ${this.ubicacion}`;
    }

    // Devuelve true desde el día de adquisición hasta el límite indicado. Excluye fechas futuras.
    esReciente(dias) {
        const transcurridos = diasDesde(this.fecha_adquisicion);
        return transcurridos >= 0 && transcurridos <= dias;
    }
}
