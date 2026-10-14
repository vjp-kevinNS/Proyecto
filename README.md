# mis-plantas

## Descripción

Mis Plantas es una aplicación sencilla para gestionar información sobre diferentes plantas.
La aplicación contiene una colección de plantas y permite consultarla y modificarla mediante funciones de JavaScript. Los resultados se muestran en la consola del navegador.

## Campos

Cada planta contiene los siguientes campos:

- `id`: identificador único de la planta. Es un número.
- `nombre`: nombre común de la planta. Es un texto.
- `especie`: especie de la planta. Es un texto.
- `fecha_adquisicion`: fecha en la que se adquirió la planta. Es una fecha.
- `altura`: altura de la planta en centímetros. Es un número.
- `ubicacion`: lugar donde se encuentra la planta. Es un texto.
- `estado`: estado actual de la planta. Es un texto.

## Ejecución

Para ejecutar la aplicación:

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto con Visual Studio Code.
3. Abrir el archivo `index.html` en un navegador.
4. Abrir las herramientas de desarrollador con F12.
5. Entrar en la pestaña Console. La colección se llama `plantas` y se muestra al cargar la página.

## Funciones de la colección

Las funciones están en `js/app.js` y se pueden probar desde la consola del navegador:

- `listar(plantas)`: muestra las plantas de la colección.
- `buscarPorTexto(plantas, "salón")`: busca coincidencias en el nombre, especie, ubicación o estado. La búsqueda no distingue entre mayúsculas y minúsculas.
- `anadirPlanta(plantas, nuevaPlanta)`: añade una planta. Si no se proporciona un `id`, se asigna uno a partir del último elemento de la colección.
- `eliminarPorId(plantas, 3)`: elimina de la colección la planta cuyo `id` coincide con el indicado.

Ejemplo para añadir una planta y comprobarla:

```js
anadirPlanta(plantas, {
    nombre: "Menta",
    especie: "Mentha",
    fecha_adquisicion: "2026-10-14",
    altura: 15,
    ubicacion: "Cocina",
    estado: "Saludable"
});
listar(plantas);
```

Para eliminar una planta, se puede llamar a `eliminarPorId(plantas, 3)` y luego a `listar(plantas)` para ver la colección actualizada.

## Tecnologías utilizadas

- HTML5
- JavaScript
- Git
- GitHub

## Uso de IA

Se ha utilizado inteligencia artificial como apoyo para resolver dudas,
generar ejemplos de datos y revisar el código JavaScript.