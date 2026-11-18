const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

export class Planta {
    #altura;

    constructor({ id, nombre, especie, fecha_adquisicion, altura, ubicacion, estado }) {
        this.altura = altura;

        if (typeof nombre !== "string" || !PATRON_NOMBRE.test(nombre)) {
            throw new TypeError("El nombre de la planta no es válido.");
        }

        for (const dato of [especie, fecha_adquisicion, ubicacion, estado]) {
            if (typeof dato !== "string" || dato.trim() === "") {
                throw new TypeError("La planta nueva debe incluir todos sus datos.");
            }
        }

        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.fecha_adquisicion = fecha_adquisicion;
        this.ubicacion = ubicacion;
        this.estado = estado;
    }

    get altura() {
        return this.#altura;
    }

    set altura(valor) {
        if (!Number.isFinite(valor) || valor < 0) {
            throw new RangeError("La altura debe ser un número finito mayor o igual que cero.");
        }
        this.#altura = valor;
    }

    descripcion() {
        return `${this.especie} · ${this.altura} cm · ${this.ubicacion}`;
    }
}
