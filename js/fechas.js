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
