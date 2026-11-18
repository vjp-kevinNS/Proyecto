// Convierte AAAA-MM-DD en una fecha a medianoche en la hora local.
export function crearFecha(texto) {
    return new Date(texto + "T00:00:00");
}

// Formatea la fecha en español para mostrarla en la tarjeta.
export function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Calcula la diferencia en milisegundos y la redondea hacia abajo al pasarla a días.
export function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;
    const diferencia = Date.now() - crearFecha(texto).getTime();
    return Math.floor(diferencia / MS_DIA);
}
