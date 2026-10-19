// =====================================================
// PROYECTO: MIS PLANTAS
// DWEC - SPRINT 0
// =====================================================


// 1. CONSTANTES

const NOMBRE_APP = "Mis Plantas";
const LIMITE_ALTURA = 50;


// 2. DATOS DE LAS PLANTAS

const plantas = [
    {
        id: 1,
        nombre: "Monstera",
        especie: "Monstera deliciosa",
        fecha_adquisicion: "2026-10-05",
        altura: 80,
        ubicacion: "Salón",
        estado: "Saludable"
    },
    {
        id: 2,
        nombre: "Poto",
        especie: "Epipremnum aureum",
        fecha_adquisicion: "2026-09-21",
        altura: 45,
        ubicacion: "Dormitorio",
        estado: "Saludable"
    },
    {
        id: 3,
        nombre: "Cactus",
        especie: "Cactaceae",
        fecha_adquisicion: "2026-08-15",
        altura: 20,
        ubicacion: "Balcón",
        estado: "Saludable"
    },
    {
        id: 4,
        nombre: "Aloe Vera",
        especie: "Aloe barbadensis",
        fecha_adquisicion: "2026-07-10",
        altura: 35,
        ubicacion: "Cocina",
        estado: "Saludable"
    },
    {
        id: 5,
        nombre: "Lavanda",
        especie: "Lavandula angustifolia",
        fecha_adquisicion: "2026-06-18",
        altura: 30,
        ubicacion: "Balcón",
        estado: "Necesita agua"
    },
    {
        id: 6,
        nombre: "Rosal",
        especie: "Rosa",
        fecha_adquisicion: "2026-05-22",
        altura: 60,
        ubicacion: "Jardín",
        estado: "Saludable"
    },
    {
        id: 7,
        nombre: "Bonsái",
        especie: "Ficus retusa",
        fecha_adquisicion: "2026-04-12",
        altura: 25,
        ubicacion: "Salón",
        estado: "Saludable"
    },
    {
        id: 8,
        nombre: "Helecho",
        especie: "Nephrolepis exaltata",
        fecha_adquisicion: "2026-03-08",
        altura: 40,
        ubicacion: "Dormitorio",
        estado: "Necesita cuidados"
    },
    {
        id: 9,
        nombre: "Orquídea",
        especie: "Phalaenopsis",
        fecha_adquisicion: "2026-02-14",
        altura: 50,
        ubicacion: "Salón",
        estado: "Saludable"
    },
    {
        id: 10,
        nombre: "Tomatera",
        especie: "Solanum lycopersicum",
        fecha_adquisicion: "2026-01-20",
        altura: 70,
        ubicacion: "Huerto",
        estado: "Saludable"
    }
];

console.log(`${NOMBRE_APP}: ${plantas.length} plantas cargadas`);
console.table(plantas);


// =====================================================
// 3. LISTAR TODAS LAS PLANTAS CON SU TAMAÑO
// =====================================================

function listarTodos(lista) {
    console.log("--- Todas las plantas ---");

    for (const planta of lista) {
        const etiqueta = planta.altura <= LIMITE_ALTURA
            ? "Pequeña"
            : "Grande";

        console.log(
            `${planta.id}: ${planta.nombre} - ` +
            `${planta.altura} cm - ${etiqueta}`
        );
    }
}

// LLAMADA:
// listarTodos(plantas);


// =====================================================
// 4. FILTRAR POR ALTURA Y ESTADO
// =====================================================

function filtrar(lista, limite) {
    let encontrados = 0;

    console.log(`--- Plantas de ${limite} cm o más y saludables ---`);

    for (const planta of lista) {
        if (planta.altura >= limite &&
            planta.estado === "Saludable") {

            console.log(
                `${planta.nombre}: ${planta.altura} cm - ${planta.estado}`
            );

            encontrados++;
        }
    }

    return encontrados;
}

// LLAMADAS:
// filtrar(plantas, 50);
// filtrar(plantas, 60);


// =====================================================
// 5. CONTAR PLANTAS POR CATEGORÍA
// =====================================================

function contarPorCategoria(lista) {
    let saludables = 0;
    let necesitanAgua = 0;
    let necesitanCuidados = 0;

    for (const planta of lista) {
        switch (planta.estado) {
            case "Saludable":
                saludables++;
                break;

            case "Necesita agua":
                necesitanAgua++;
                break;

            case "Necesita cuidados":
                necesitanCuidados++;
                break;

            default:
                console.log(`Estado inesperado: ${planta.estado}`);
        }
    }

    console.log(`Saludables: ${saludables}`);
    console.log(`Necesitan agua: ${necesitanAgua}`);
    console.log(`Necesitan cuidados: ${necesitanCuidados}`);
}

// LLAMADA:
// contarPorCategoria(plantas);


// =====================================================
// 6. LISTAR PLANTAS
// =====================================================

function listar(lista) {
    console.log("--- Lista de plantas ---");

    if (lista.length === 0) {
        console.log("No hay plantas en la colección.");
        return [];
    }

    for (const planta of lista) {
        console.log(
            `${planta.id}: ${planta.nombre} - ` +
            `${planta.altura} cm - ${planta.ubicacion}`
        );
    }

    return lista;
}

// LLAMADA:
// listar(plantas);


// =====================================================
// 7. BUSCAR PLANTAS POR TEXTO
// =====================================================

function buscarPorTexto(lista, texto) {
    const resultados = [];

    if (typeof texto !== "string" || texto.trim() === "") {
        console.log("Debes escribir algo para buscar.");
        return resultados;
    }

    const textoBuscado = texto.toLowerCase().trim();

    console.log(`--- Búsqueda: ${texto} ---`);

    for (const planta of lista) {
        const resumen = (
            `${planta.nombre} ${planta.especie} ` +
            `${planta.ubicacion} ${planta.estado}`
        ).toLowerCase();

        if (resumen.includes(textoBuscado)) {
            resultados.push(planta);

            console.log(
                `${planta.id}: ${planta.nombre} - ${planta.especie}`
            );
        }
    }

    if (resultados.length === 0) {
        console.log("No se encontraron coincidencias.");
    }

    return resultados;
}

// LLAMADAS:
// buscarPorTexto(plantas, "MONSTERA");
// buscarPorTexto(plantas, "salón");
// buscarPorTexto(plantas, "cactus");


// =====================================================
// 8. AÑADIR UNA PLANTA
// =====================================================

function anadirPlanta(lista, nuevaPlanta) {
    console.log("--- Añadir planta ---");

    if (
        !nuevaPlanta ||
        typeof nuevaPlanta !== "object" ||
        Array.isArray(nuevaPlanta)
    ) {
        console.log("La planta nueva no es válida.");
        return null;
    }

    const mayorId = lista.reduce(
        (mayor, planta) => Math.max(mayor, planta.id),
        0
    );

    const plantaConId = {
        ...nuevaPlanta,
        id: mayorId + 1
    };

    lista.push(plantaConId);

    console.log(`Planta añadida: ${plantaConId.nombre}`);
    console.log(`ID asignado: ${plantaConId.id}`);

    return plantaConId.id;
}

// LLAMADA DESDE LA CONSOLA:
// anadirPlanta(plantas, {
//     nombre: "Menta",
//     especie: "Mentha",
//     fecha_adquisicion: "2026-10-19",
//     altura: 15,
//     ubicacion: "Cocina",
//     estado: "Saludable"
// });


// =====================================================
// 9. ELIMINAR UNA PLANTA POR ID
// =====================================================

function eliminarPorId(lista, id) {
    console.log("--- Eliminar planta ---");

    const indice = lista.findIndex(
        planta => planta.id === id
    );

    if (indice === -1) {
        console.log(`No existe ninguna planta con ID ${id}.`);
        return false;
    }

    const eliminada = lista.splice(indice, 1)[0];

    console.log(`Planta eliminada: ${eliminada.nombre}`);

    return true;
}

// LLAMADAS:
// eliminarPorId(plantas, 10);
// eliminarPorId(plantas, 99);


// =====================================================
// 10. MOSTRAR ESTADÍSTICAS
// =====================================================

function mostrarEstadisticas(lista) {
    console.log("--- Estadísticas de las plantas ---");

    if (lista.length === 0) {
        console.log("No hay plantas para calcular estadísticas.");
        return;
    }

    let totalAltura = 0;
    let plantaMasAlta = lista[0];

    for (const planta of lista) {
        totalAltura += planta.altura;

        if (planta.altura > plantaMasAlta.altura) {
            plantaMasAlta = planta;
        }
    }

    const mediaAltura = totalAltura / lista.length;

    console.log(`Altura total: ${totalAltura} cm`);
    console.log(`Altura media: ${mediaAltura.toFixed(1)} cm`);

    console.log(
        `Planta más alta: ${plantaMasAlta.nombre} ` +
        `(${plantaMasAlta.altura} cm)`
    );
}

// LLAMADA:
// mostrarEstadisticas(plantas);


// =====================================================
// FIN DEL PROGRAMA
// =====================================================



// =====================================================
// RESUMEN DE FUNCIONES
// =====================================================

/* listarTodos(plantas);

filtrar(plantas, 50);
filtrar(plantas, 60);

contarPorCategoria(plantas);

listar(plantas);
listar([]);

buscarPorTexto(plantas, "MONSTERA");
buscarPorTexto(plantas, "salón");
buscarPorTexto(plantas, "cactus");
buscarPorTexto(plantas, "dragón");
buscarPorTexto(plantas, "");

mostrarEstadisticas(plantas);
mostrarEstadisticas([]); */