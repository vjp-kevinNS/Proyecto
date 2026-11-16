// Funciones que trabajan con los datos, sin acceder al DOM.

const LIMITE_ALTURA = 50;
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

export function listarTodos(lista) {
    console.log("--- Todas las plantas ---");

    for (const planta of lista) {
        const etiqueta = planta.altura <= LIMITE_ALTURA ? "Pequeña" : "Grande";

        console.log(`${planta.id}: ${planta.nombre} - ${planta.altura} cm - ${etiqueta}`);
    }
}

export function filtrar(lista, limite) {
    let encontrados = 0;

    console.log(`--- Plantas de ${limite} cm o más y saludables ---`);

    for (const planta of lista) {
        if (planta.altura >= limite && planta.estado === "Saludable") {
            console.log(`${planta.nombre}: ${planta.altura} cm - ${planta.estado}`);
            encontrados++;
        }
    }

    return encontrados;
}

export function listar(lista) {
    console.log("--- Lista de plantas ---");

    if (lista.length === 0) {
        console.log("No hay plantas en la colección.");
        return [];
    }

    for (const planta of lista) {
        console.log(`${planta.id}: ${planta.nombre} - ${planta.altura} cm - ${planta.ubicacion}`);
    }

    return lista;
}

export function quitarTildes(texto) {
    const originales = "áéíóúüñàèìòùäëïöâêîôûãõç";
    const equivalentes = "aeiouunaeiouaeioaeiouaoc";
    const minusculas = texto.toLowerCase();
    let resultado = "";

    for (const letra of minusculas) {
        const posicion = originales.indexOf(letra);
        if (posicion === -1) {
            resultado += letra;
        } else {
            resultado += equivalentes[posicion];
        }
    }
    return resultado;
}

export function buscarPorTexto(lista, texto) {
    if (typeof texto !== "string" || texto.trim() === "") {
        console.log("Introduce un texto para realizar la búsqueda.");
        return [];
    }

    const buscado = quitarTildes(texto.trim());
    const resultado = [];

    for (const planta of lista) {
        const textoPlanta = quitarTildes(
            `${planta.nombre} ${planta.especie} ${planta.ubicacion} ${planta.estado}`
        );

        if (textoPlanta.includes(buscado)) {
            resultado.push(planta);
        }
    }

    if (resultado.length === 0) {
        console.log("No se encontraron plantas.");
    }

    return resultado;
}

export function anadirPlanta(lista, nuevaPlanta) {
    if (!nuevaPlanta || typeof nuevaPlanta !== "object") {
        console.error("La planta nueva no es válida.");
        return null;
    }

    // Comprobamos que el nombre cumple el patrón Regex.
    if (!PATRON_NOMBRE.test(nuevaPlanta.nombre)) {
        console.error("El nombre de la planta no es válido.");
        return null;
    }

    const camposTexto = [
        "nombre",
        "especie",
        "fecha_adquisicion",
        "ubicacion",
        "estado"
    ];

    let plantaValida = true;
    for (const campo of camposTexto) {
        if (typeof nuevaPlanta[campo] !== "string" || nuevaPlanta[campo].trim() === "") {
            plantaValida = false;
        }
    }
    if (typeof nuevaPlanta.altura !== "number" || Number.isNaN(nuevaPlanta.altura) ||
        nuevaPlanta.altura < 0 || nuevaPlanta.altura === Infinity) {
        plantaValida = false;
    }

    if (!plantaValida) {
        console.error("La planta nueva debe incluir sus datos y una altura válida.");
        return null;
    }

    let mayorId = 0;

    for (const planta of lista) {
        if (typeof planta.id === "number" && !Number.isNaN(planta.id) && planta.id !== Infinity && planta.id > mayorId) {
            mayorId = planta.id;
        }
    }

    const plantaConId = {
        id: mayorId + 1,
        nombre: nuevaPlanta.nombre,
        especie: nuevaPlanta.especie,
        fecha_adquisicion: nuevaPlanta.fecha_adquisicion,
        altura: nuevaPlanta.altura,
        ubicacion: nuevaPlanta.ubicacion,
        estado: nuevaPlanta.estado
    };

    lista.push(plantaConId);

    console.log(`Planta añadida: ${plantaConId.nombre} (ID: ${plantaConId.id})`);

    return plantaConId.id;
}

export function eliminarPorId(lista, id) {
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

export function contarPorCategoria(lista) {
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
                recuento.set(
                    planta.estado,
                    recuento.get(planta.estado) + 1
                );
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

export function mostrarEstadisticas(lista) {
    const resultado = estadisticas(lista);

    if (resultado === null) {
        console.log("No hay plantas para calcular estadísticas.");
        return;
    }

    console.log(`Altura total: ${resultado.total} cm`);
    console.log(`Altura media: ${resultado.media.toFixed(1)} cm`);
    console.log(`Planta más alta: ${resultado.maximo.nombre} (${resultado.maximo.altura} cm)`);
}

export function estadisticas(lista) {
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

export function ordenar(lista, criterio) {
    // Creamos una copia para no modificar el array original.
    const resultado = [...lista];

    if (criterio === "nombre") {
        // Orden alfabético.
        resultado.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
        );

    } else if (criterio === "altura") {
        // Orden numérico de menor a mayor.
        resultado.sort((a, b) => a.altura - b.altura);

    } else if (criterio === "fecha") {
        // Orden por fecha, de más reciente a más antigua.
        resultado.sort((a, b) =>
            crearFecha(b.fecha_adquisicion) - crearFecha(a.fecha_adquisicion)
        );
    }

    return resultado;
}

export function crearFecha(texto) {
    return new Date(texto + "T00:00:00");
}

export function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;

    const diferencia = Date.now() - crearFecha(texto).getTime();

    return Math.floor(diferencia / MS_DIA);
}
