import { datosPlantas } from "./datos.js";
import { ordenar } from "./logica.js";
import { fechaLegible } from "./fechas.js";
import { Planta } from "./planta.js";
import { ColeccionPlantas } from "./coleccion.js";

// Creamos la colección de plantas a partir de los datos iniciales.
export const coleccion = ColeccionPlantas.desdeDatos(datosPlantas);

// 1. CONSTANTES Y ESTADO DE LA INTERFAZ
const NOMBRE_APP = "Mis Plantas";
const DIAS_RECIENTE = 30;
const CLASES_ESTADO = {
    Saludable: "tarjeta-saludable",
    "Necesita agua": "tarjeta-necesita-agua",
    "Necesita cuidados": "tarjeta-necesita-cuidados"
};
let textoBuscado = "";
let criterio = "ninguno";

// 2. COOKIES
// Guarda el criterio de orden con una duración expresada en segundos.
function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;

    const texto = encodeURIComponent(valor);

    document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

// Separa las cookies y devuelve el valor de la que coincide con el nombre.
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
    const claseEstado = CLASES_ESTADO[elemento.estado];
    if (typeof claseEstado === "string") {
        tarjeta.classList.add(claseEstado);
    }

    // Creamos el título.
    const titulo = document.createElement("h3");
    titulo.textContent = elemento.nombre;

    // Creamos los datos de la planta.
    const datos = document.createElement("p");
    datos.textContent = elemento.descripcion();

    // Creamos el párrafo con la fecha de adquisición.
    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(elemento.fecha_adquisicion);

    // Comprobamos si la planta es reciente.
    if (elemento.esReciente(DIAS_RECIENTE)) {
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

function pintarEstadisticas() {
    const resultado = coleccion.estadisticas();
    const panel = document.querySelector("#estadisticas");

    // Vaciamos el panel antes de volver a mostrar los datos.
    panel.replaceChildren();

    if (resultado === null) {
        const aviso = document.createElement("li");
        aviso.textContent = "No hay plantas para calcular estadísticas.";
        panel.append(aviso);
        return;
    }

    // Creamos una línea del panel por cada dato calculado.
    const lineas = [
        `Número de plantas: ${resultado.cantidad}`,
        `Altura total: ${resultado.alturaTotal} cm`,
        `Altura media: ${resultado.mediaAltura.toFixed(1)} cm`,
        `Altura máxima: ${resultado.mayorAltura} cm`,
        `Plantas de más de 50 cm: ${resultado.cantidadPlantasAltas}`,
        `Nombres: ${resultado.nombres.join(", ")}`
    ];

    for (const linea of lineas) {
        const elemento = document.createElement("li");
        elemento.textContent = linea;
        panel.append(elemento);
    }
}

function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {
        resumen.textContent = `Mostrando ${mostrados} de ${coleccion.total} plantas`;

    } else {
        resumen.textContent = `No hay plantas que contengan "${textoBuscado}"`;
    }
}

// La misma función actualiza la página al buscar, ordenar o añadir una planta.
function actualizar() {
    let resultado = coleccion.listar();

    // Primero aplicamos el buscador.
    if (textoBuscado.trim() !== "") {
        resultado = coleccion.buscar(textoBuscado);
    }

    // Después aplicamos el orden seleccionado.
    resultado = ordenar(resultado, criterio);

    // Finalmente actualizamos la página.
    pintar(resultado);
    pintarEstadisticas();
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

const campoNombre = document.querySelector("#nombrePlanta");
const campoEspecie = document.querySelector("#especiePlanta");
const campoFecha = document.querySelector("#fechaPlanta");
const campoAltura = document.querySelector("#alturaPlanta");
const campoUbicacion = document.querySelector("#ubicacionPlanta");
const campoEstado = document.querySelector("#estadoPlanta");

document.querySelector("#formulario")
    .addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Number convierte el texto a número. Si está vacío, usamos NaN para que falle la validación.
        const textoAltura = campoAltura.value.trim();
        const nuevaPlanta = {
            nombre: campoNombre.value.trim(),
            especie: campoEspecie.value.trim(),
            fecha_adquisicion: campoFecha.value,
            altura: textoAltura === "" ? NaN : Number(textoAltura),
            ubicacion: campoUbicacion.value.trim(),
            estado: campoEstado.value
        };

        const aviso = document.querySelector("#avisoFormulario");

        try {
            coleccion.anadir(new Planta(nuevaPlanta));
        } catch (error) {
            aviso.textContent = error.message;
            aviso.style.color = "red";
            return;
        }

        aviso.textContent = "¡Planta añadida correctamente!";
        aviso.style.color = "green";

        // Actualizamos las tarjetas y estadísticas.
        actualizar();

        // Limpiamos el formulario.
        campoNombre.value = "";
        campoEspecie.value = "";
        campoFecha.value = "";
        campoAltura.value = "";
        campoUbicacion.value = "";
        campoEstado.value = "Saludable";
    });

// =====================================================
// 5. INICIO
// =====================================================

console.log(`${NOMBRE_APP}: ${coleccion.total} plantas cargadas`);
console.table(coleccion.listar());

// Recuperamos el último orden guardado durante 30 días.
const ordenGuardado = leerCookie("orden");
criterio = ordenGuardado ?? "ninguno";
actualizar();

