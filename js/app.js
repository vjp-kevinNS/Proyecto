// =====================================================
// PROYECTO: MIS PLANTAS
// =====================================================

// 1. CONSTANTES Y DATOS

const NOMBRE_APP = "Mis Plantas";
const LIMITE_ALTURA = 50;

const plantas = [
    { id: 1, nombre: "Monstera", especie: "Monstera deliciosa", fecha_adquisicion: "2026-10-05", altura: 80, ubicacion: "Salon", estado: "Saludable" },
    { id: 2, nombre: "Poto", especie: "Epipremnum aureum", fecha_adquisicion: "2026-09-21", altura: 45, ubicacion: "Dormitorio", estado: "Saludable" },
    { id: 3, nombre: "Cactus", especie: "Cactaceae", fecha_adquisicion: "2026-08-15", altura: 20, ubicacion: "Balcon", estado: "Saludable" },
    { id: 4, nombre: "Aloe Vera", especie: "Aloe barbadensis", fecha_adquisicion: "2026-07-10", altura: 35, ubicacion: "Cocina", estado: "Saludable" },
    { id: 5, nombre: "Lavanda", especie: "Lavandula angustifolia", fecha_adquisicion: "2026-06-18", altura: 30, ubicacion: "Balcon", estado: "Necesita agua" },
    { id: 6, nombre: "Rosal", especie: "Rosa", fecha_adquisicion: "2026-05-22", altura: 60, ubicacion: "Jardin", estado: "Saludable" },
    { id: 7, nombre: "Bonsai", especie: "Ficus retusa", fecha_adquisicion: "2026-04-12", altura: 25, ubicacion: "Salon", estado: "Saludable" },
    { id: 8, nombre: "Helecho", especie: "Nephrolepis exaltata", fecha_adquisicion: "2026-03-08", altura: 40, ubicacion: "Dormitorio", estado: "Necesita cuidados" },
    { id: 9, nombre: "Orquidea", especie: "Phalaenopsis", fecha_adquisicion: "2026-02-14", altura: 50, ubicacion: "Salon", estado: "Saludable" },
    { id: 10, nombre: "Tomatera", especie: "Solanum lycopersicum", fecha_adquisicion: "2026-01-20", altura: 70, ubicacion: "Huerto", estado: "Saludable" }
];

console.log(`${NOMBRE_APP}: ${plantas.length} plantas cargadas`);
console.table(plantas);

// =====================================================
// 2. FUNCIONES DE LISTADO Y FILTRO (Consola)
// =====================================================

function listarTodos(lista) {
    console.log("--- Todas las plantas ---");
    for (const planta of lista) {
        const etiqueta = planta.altura <= LIMITE_ALTURA ? "Pequeña" : "Grande";
        console.log(`${planta.id}: ${planta.nombre} - ${planta.altura} cm - ${etiqueta}`);
    }
}

function filtrar(lista, limite) {
    let encontrados = 0;
    console.log(`--- Plantas de ${limite} cm o mas y saludables ---`);
   
    for (const planta of lista) {
        if (planta.altura >= limite && planta.estado === "Saludable") {
            console.log(`${planta.nombre}: ${planta.altura} cm - ${planta.estado}`);
            encontrados++;
        }
    }
    return encontrados;
}

function listar(lista) {
    console.log("--- Lista de plantas ---");
    if (lista.length === 0) {
        console.log("No hay plantas en la coleccion.");
        return [];
    }
    for (const planta of lista) {
        console.log(`${planta.id}: ${planta.nombre} - ${planta.altura} cm - ${planta.ubicacion}`);
    }
    return lista;
}

// =====================================================
// 3. BUSQUEDA, AÑADIR Y ELIMINAR
// =====================================================

function buscarPorTexto(lista, texto) {
    if (typeof texto !== "string" || texto.trim() === "") {
        console.log("Introduce un texto para realizar la búsqueda.");
        return [];
    }

    const normalizar = valor => valor
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const buscado = normalizar(texto.trim());
    const resultado = [];

    for (const planta of lista) {
        const textoPlanta = normalizar(
            `${planta.nombre} ${planta.especie} ${planta.ubicacion} ${planta.estado}`
        );
        if (textoPlanta.includes(buscado)) resultado.push(planta);
    }
    if (resultado.length === 0) {
        console.log("No se encontraron plantas.");
    }
    return resultado;
}

function anadirPlanta(lista, nuevaPlanta) {
    if (!nuevaPlanta || typeof nuevaPlanta !== "object" || Array.isArray(nuevaPlanta)) {
        console.error("La planta nueva no es valida.");
        return null;
    }

    const camposTexto = ["nombre", "especie", "fecha_adquisicion", "ubicacion", "estado"];
    const plantaValida = camposTexto.every(campo =>
        typeof nuevaPlanta[campo] === "string" && nuevaPlanta[campo].trim() !== ""
    ) && Number.isFinite(nuevaPlanta.altura) && nuevaPlanta.altura >= 0;

    if (!plantaValida) {
        console.error("La planta nueva debe incluir sus datos y una altura válida.");
        return null;
    }

    let mayorId = 0;
    for (const planta of lista) {
        if (Number.isFinite(planta.id) && planta.id > mayorId) {
            mayorId = planta.id;
        }
    }

    const plantaConId = { ...nuevaPlanta, id: mayorId + 1 };
    lista.push(plantaConId);
    console.log(`Planta añadida: ${plantaConId.nombre} (ID: ${plantaConId.id})`);
   
    return plantaConId.id;
}

function eliminarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            const eliminada = lista.splice(i, 1)[0];
            console.log(`Planta eliminada: ${eliminada.nombre}`);
            return true;
        }
    }
    console.log(`No existe ninguna planta con ID ${id}.`);
    return false;
}

// =====================================================
// 4. ESTADISTICAS Y CATEGORIAS
// =====================================================

function contarPorCategoria(lista) {
    const recuento = new Map([
        ["Saludable", 0],
        ["Necesita agua", 0],
        ["Necesita cuidados", 0]
    ]);

    for (const planta of lista) {
        switch (planta.estado) {
            case "Saludable":
            case "Necesita agua":
            case "Necesita cuidados":
                recuento.set(planta.estado, recuento.get(planta.estado) + 1);
                break;
            default:
                console.warn(`Estado no reconocido: ${planta.estado}`);
        }
    }
   
    console.log("--- Recuento por estado ---");
    for (const [estado, cantidad] of recuento) {
        console.log(`${estado}: ${cantidad}`);
    }
    return recuento;
}

function mostrarEstadisticas(lista) {
    const resultado = estadisticas(lista);
    if (resultado === null) {
        console.log("No hay plantas para calcular estadísticas.");
        return;
    }

    console.log(`Altura total: ${resultado.total} cm`);
    console.log(`Altura media: ${resultado.media.toFixed(1)} cm`);
    console.log(`Planta más alta: ${resultado.maximo.nombre} (${resultado.maximo.altura} cm)`);
}

function estadisticas(lista) {
    if (lista.length === 0) {
        return null;
    }
   
    let suma = 0;
    let maximo = lista[0];
    let minimo = lista[0];

    for (const planta of lista) {
        suma += planta.altura;
        if (planta.altura > maximo.altura) {
            maximo = planta;
        }
        if (planta.altura < minimo.altura) {
            minimo = planta;
        }
    }

    return {
        total: suma,
        media: suma / lista.length,
        maximo: maximo,
        minimo: minimo
    };
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

// =====================================================
// 5. PINTAR EN LA PAGINA (DOM)
// =====================================================

function crearTarjeta(elemento) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");
   
    // Asigna una clase específica según el estado para el borde de color
    const claseEstado = "tarjeta-" + elemento.estado.toLowerCase().replace(/\s+/g, "-");
    tarjeta.classList.add(claseEstado);

    const titulo = document.createElement("h3");
    titulo.textContent = elemento.nombre;

    const datos = document.createElement("p");
    datos.textContent = `${elemento.especie} · ${elemento.altura} cm · ${elemento.ubicacion}`;

    tarjeta.append(titulo, datos);
    return tarjeta;
}

function pintar(lista) {
    const listado = document.querySelector("#listado");
   
    // Vacía el contenedor antes de pintar para evitar duplicados
    listado.replaceChildren();

    for (const elemento of lista) {
        listado.append(crearTarjeta(elemento));
    }

    const resumen = document.querySelector("#resumen");
    resumen.textContent = `${lista.length} plantas`;
}

// =====================================================
// 6. INICIALIZACION
// =====================================================

pintar(plantas);
pintarEstadisticas(plantas);