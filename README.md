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

Las cuatro funciones están en `js/app.js` y se pueden probar desde la consola del navegador:

- `listar(lista)`: recorre y muestra todas las plantas con su id, nombre, altura y ubicación. Para probarla:

  ```js
  listar(plantas);
  ```

- `buscarPorTexto(lista, texto)`: busca el texto en el nombre, especie, ubicación o estado. No distingue entre mayúsculas y minúsculas. Por ejemplo:

  ```js
  buscarPorTexto(plantas, "salón");
  ```

- `anadirPlanta(lista, nuevaPlanta)`: añade una planta. Si no se proporciona un `id`, se asigna uno a partir del último id de la colección. Ejemplo:

  ```js
  anadirPlanta(plantas, {
      nombre: "Menta",
      especie: "Mentha",
      fecha_adquisicion: "2026-10-14",
      altura: 15,
      ubicacion: "Cocina",
      estado: "Saludable"
  });
  ```

- `eliminarPorId(lista, id)`: elimina de la colección la planta cuyo id coincide con el indicado. Por ejemplo, para eliminar la planta con id `3` y después mostrar la colección actualizada:

  ```js
  eliminarPorId(plantas, 3);
  listar(plantas);
  ```

Los cambios al añadir o eliminar plantas solo se mantienen mientras la página siga abierta; al recargarla, se vuelve a cargar la colección inicial.

## Tecnologías utilizadas

- HTML5
- JavaScript
- Git
- GitHub

## Uso de IA

Se ha utilizado inteligencia artificial como apoyo para resolver dudas,
generar ejemplos de datos y revisar el código JavaScript.