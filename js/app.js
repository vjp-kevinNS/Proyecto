const NOMBRE_APP = "Mis Plantas";

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


// FUNCIÓN 1: LISTAR TODOS

const LIMITE_ALTURA = 50;

function listarTodos(lista) {
    console.log("--- Todas las plantas ---");

    for (const planta of lista) {
        const etiqueta = planta.altura <= LIMITE_ALTURA
            ? "Pequeña"
            : "Grande";

        console.log(
            `${planta.id}: ${planta.nombre} - ${planta.altura} cm - ${etiqueta}`
        );
    }
}


// FUNCIÓN 2: FILTRAR

function filtrar(lista, limite) {
    let encontrados = 0;

    console.log(`--- Plantas de ${limite} cm o más y saludables ---`);

    for (const planta of lista) {
        if (planta.altura >= limite && planta.estado === "Saludable") {
            console.log(
                `${planta.nombre}: ${planta.altura} cm - ${planta.estado}`
            );

            encontrados++;
        }
    }

    return encontrados;
}


// FUNCIÓN 3: CONTAR POR CATEGORÍA

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


// LLAMADAS

listarTodos(plantas);

const resultado50 = filtrar(plantas, 50);
console.log(`Resultado con límite 50: ${resultado50}`);

const resultado60 = filtrar(plantas, 60);
console.log(`Resultado con límite 60: ${resultado60}`);
