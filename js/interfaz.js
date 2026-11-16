import { plantas } from "./datos.js";
import { buscarPorTexto, ordenar, estadisticas, anadirPlanta, fechaLegible, diasDesde } from "./logica.js";

// 1. CONSTANTES Y ESTADO DE LA INTERFAZ
const NOMBRE_APP = "Mis Plantas";
const DIAS_RECIENTE = 30;
let textoBuscado = "";
let criterio = "ninguno";

// 2. COOKIES
function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;

    const texto = encodeURIComponent(valor);

    document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave, valor] = parte.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

// 3. PINTAR Y ACTUALIZAR LA PÁGINA

function crearTarjeta(elemento) {
    const tarjeta = document.createElement("article");

    tarjeta.classList.add("tarjeta");

    // Asigna una clase según el estado de la planta.
    const claseEstado = "tarjeta-" + elemento.estado.toLowerCase().replace(/\s+/g, "-");

    tarjeta.classList.add(claseEstado);

    // Creamos el título.
    const titulo = document.createElement("h3");
    titulo.textContent = elemento.nombre;

    // Creamos los datos de la planta.
    const datos = document.createElement("p");
    datos.textContent = `${elemento.especie} · ${elemento.altura} cm · ${elemento.ubicacion}`;

    // Creamos el párrafo con la fecha de adquisición.
    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(elemento.fecha_adquisicion);

    // Comprobamos si la planta es reciente.
    const dias = diasDesde(elemento.fecha_adquisicion);
    if (dias >= 0 && dias <= DIAS_RECIENTE) {
        tarjeta.classList.add("reciente");
    }

    // Añadimos todos los elementos a la tarjeta.
    tarjeta.append(titulo, datos, fecha);

    return tarjeta;
}

function pintar(lista) {
    const listado = document.querySelector("#listado");

    // Vacía el listado antes de crear las nuevas tarjetas.
    listado.replaceChildren();

    for (const elemento of lista) {
        listado.append(crearTarjeta(elemento));
    }

    const resumen = document.querySelector("#resumen");

    resumen.textContent = `${lista.length} plantas`;
}

function pintarEstadisticas(lista) {
    const resultado = estadisticas(lista);
    const elemento = document.querySelector("#estadisticas");

    if (resultado === null) {
        elemento.textContent = "No hay plantas para calcular estadísticas.";
        return;
    }

    elemento.textContent = `Altura total: ${resultado.total} cm | Altura media: ${resultado.media.toFixed(1)} cm | Más alta: ${resultado.maximo.nombre} (${resultado.maximo.altura} cm) | Más baja: ${resultado.minimo.nombre} (${resultado.minimo.altura} cm)`;
}

function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {
        resumen.textContent = `Mostrando ${mostrados} de ${plantas.length} plantas`;

    } else {
        resumen.textContent = `No hay plantas que contengan "${textoBuscado}"`;
    }
}

function actualizar() {
    let resultado = plantas;

    // Primero aplicamos el buscador.
    if (textoBuscado.trim() !== "") {
        resultado = buscarPorTexto(plantas, textoBuscado);
    }

    // Después aplicamos el orden seleccionado.
    resultado = ordenar(resultado, criterio);

    // Finalmente actualizamos la página.
    pintar(resultado);
    pintarEstadisticas(resultado);
    pintarResumen(resultado.length);
}

function elegirOrden(nuevo) {
    criterio = nuevo;

    // Guardamos el último orden durante 30 días.
    guardarCookie("orden", criterio, 30);

    actualizar();
}

// =====================================================
// 4. EVENTOS
// =====================================================

// Buscador: se ejecuta cuando escribimos.
document.querySelector("#buscador").addEventListener("input", function () {
    textoBuscado = this.value;

    actualizar();
});

// Botón para ordenar por nombre.
document.querySelector("#ordenNombre")
    .addEventListener("click", () => elegirOrden("nombre"));

// Botón para ordenar por altura.
document.querySelector("#ordenNumero")
    .addEventListener("click", () => elegirOrden("altura"));

// Botón para ordenar por fecha de adquisición.
document.querySelector("#ordenFecha")
    .addEventListener("click", () => elegirOrden("fecha"));

document.querySelector("#formulario")
    .addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nuevaPlanta = {
            nombre: document.querySelector("#nombrePlanta").value.trim(),
            especie: document.querySelector("#especiePlanta").value.trim(),
            fecha_adquisicion: document.querySelector("#fechaPlanta").value,
            altura: Number(document.querySelector("#alturaPlanta").value),
            ubicacion: document.querySelector("#ubicacionPlanta").value.trim(),
            estado: document.querySelector("#estadoPlanta").value
        };

        const aviso = document.querySelector("#avisoFormulario");

        // Intentamos añadir la planta.
        const resultado = anadirPlanta(plantas, nuevaPlanta);

        if (resultado === null) {
            aviso.textContent = "El nombre no es válido o faltan datos. Revisa el formulario.";
            aviso.style.color = "red";
            return;
        }

        aviso.textContent = "¡Planta añadida correctamente!";
        aviso.style.color = "green";

        // Actualizamos las tarjetas y estadísticas.
        actualizar();

        // Limpiamos el formulario.
        this.reset();
    });

// =====================================================
// 5. INICIO
// =====================================================

console.log(`${NOMBRE_APP}: ${plantas.length} plantas cargadas`);
console.table(plantas);

// Recuperamos el último orden guardado durante 30 días.
const ordenGuardado = leerCookie("orden");
criterio = ordenGuardado ?? "ninguno";
actualizar();

