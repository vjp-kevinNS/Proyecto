# Mis Plantas

## Descripción

Mis Plantas es una aplicación sencilla de JavaScript para consultar y gestionar una colección de plantas. La información se guarda en un array en memoria. La página muestra las plantas en tarjetas, estadísticas de altura, un buscador y controles para ordenar la colección. También es posible probar las funciones desde la consola del navegador.

La aplicación permite listar plantas, filtrarlas por altura y estado, contar sus categorías, buscar por texto, añadir y eliminar plantas y consultar estadísticas sobre sus alturas.

## Sprint 1

Durante el Sprint 1 se ha ampliado la aplicación Mis Plantas, pasando de trabajar principalmente desde la consola a disponer de una interfaz web interactiva.

Las funcionalidades incorporadas son:

- Visualización de las plantas mediante tarjetas dinámicas.
- Estadísticas de altura en la página.
- Buscador en tiempo real.
- Ordenación por nombre, altura y fecha de adquisición.
- Persistencia del último criterio de ordenación mediante cookies.
- Visualización de fechas en formato legible.
- Identificación de las plantas adquiridas durante los últimos 30 días.
- Formulario para añadir nuevas plantas.
- Validación del nombre mediante expresiones regulares (Regex), impidiendo añadir nombres que no cumplen el patrón.

Se han utilizado HTML, CSS y JavaScript, aplicando manipulación del DOM, eventos, arrays, funciones, objetos Date, cookies y expresiones regulares.

## Sprint 2

Durante el Sprint 2 se ha incorporado una clase gestora para centralizar las operaciones de la colección de plantas. El objetivo es trabajar con un objeto que controle la colección, en lugar de gestionar directamente el array desde la interfaz.

Las funcionalidades incorporadas son:

- Creación de la clase `ColeccionPlantas` en el módulo `js/coleccion.js`.
- Constructor que recibe y almacena la colección de plantas.
- Getter `total`, que devuelve el número de plantas.
- Método `listar()`, que devuelve una copia de la colección para evitar modificar directamente el array interno.
- Método `anadir(planta)`, que permite añadir una planta utilizando la función de lógica existente.
- Método `buscar(texto)`, que permite buscar plantas por texto.
- Método `eliminar(id)`, que elimina una planta mediante su identificador.
- Método estático `desdeDatos(datos)`, que crea las instancias de `Planta` a partir de los datos iniciales y devuelve una nueva `ColeccionPlantas`.
- Integración de la clase gestora en `interfaz.js`, que utiliza sus métodos para listar, buscar y añadir plantas, y consulta `coleccion.total` para obtener el total.

De esta forma, la interfaz trabaja con la instancia `coleccion` y la clase `ColeccionPlantas` centraliza el acceso a los datos. Se mantienen las funcionalidades del Sprint 1, como las tarjetas, la búsqueda, la ordenación, las estadísticas, las cookies y el formulario.

Se han realizado comprobaciones desde la consola del navegador creando una colección independiente con `ColeccionPlantas.desdeDatos()`, consultando su total, buscando plantas y probando la eliminación con identificadores existentes y no existentes.

### Documentación de las clases con JSDoc (Parte C)

Se han documentado las dos clases principales del proyecto mediante comentarios JSDoc, colocados encima de cada clase y de sus métodos. Esta documentación permite conocer qué hace cada elemento y consultar la ayuda directamente desde Visual Studio Code.

En `js/coleccion.js` se han documentado la clase `ColeccionPlantas`, su constructor, el getter `total` y los métodos `listar()`, `anadir()`, `buscar()`, `eliminar()` y `desdeDatos()`.

En `js/planta.js` se han documentado la clase `Planta`, su constructor, el getter y setter `altura`, y los métodos `descripcion()` y `esReciente()`.

Los comentarios incluyen una descripción breve y las etiquetas `@param` y `@returns` cuando corresponde, indicando los tipos de los parámetros y de los valores devueltos. Se ha comprobado en Visual Studio Code que la documentación aparece al situar el cursor sobre los métodos y al consultar la información de sus parámetros.

## Estructura del proyecto

```text
Proyecto/
├── index.html
├── README.md
├── css/
│   └── estilos.css
└── js/
    ├── datos.js
    ├── fechas.js
    ├── logica.js
    ├── planta.js
    ├── coleccion.js
    └── interfaz.js
```

El archivo `index.html` carga `js/interfaz.js` mediante la etiqueta `<script type="module" src="js/interfaz.js"></script>` y los estilos desde `css/estilos.css`.

## Cómo ejecutar la aplicación

1. Abre la carpeta del proyecto en tu editor de código.
2. Abre `index.html` utilizando Live Server desde Visual Studio Code.
3. La aplicación se abrirá en el navegador mediante una dirección HTTP, por ejemplo `http://127.0.0.1:5500`.
4. La página muestra las tarjetas, las estadísticas, el buscador y los botones de ordenación.
5. Para probar las funciones, abre las herramientas de desarrollador con `F12` y entra en la pestaña Console.

Se recomienda utilizar Live Server para que las cookies funcionen correctamente. No es recomendable abrir directamente el archivo mediante `file://`.

No necesita una base de datos.

## Datos de la colección

El módulo `datos.js` exporta la constante `datosPlantas`, que contiene los diez registros iniciales. Cada objeto tiene los siguientes campos:

| Campo | Descripción | Tipo |
|---|---|---|
| `id` | Identificador de la planta. | Número |
| `nombre` | Nombre común de la planta. | Texto |
| `especie` | Nombre científico de la planta. | Texto |
| `fecha_adquisicion` | Fecha de adquisición en formato `AAAA-MM-DD`. | Texto |
| `altura` | Altura de la planta en centímetros. | Número |
| `ubicacion` | Lugar donde se encuentra la planta. | Texto |
| `estado` | Estado actual de la planta. | Texto |

Los estados utilizados en los datos iniciales son `Saludable`, `Necesita agua` y `Necesita cuidados`.

La constante `NOMBRE_APP` contiene el nombre de la aplicación (`Mis Plantas`). La constante `LIMITE_ALTURA` establece el límite de 50 cm utilizado por `listarTodos` para clasificar las plantas como pequeñas o grandes. En la interfaz, los datos iniciales se convierten en instancias de `Planta` y se gestionan mediante una instancia de `ColeccionPlantas`.

Al cargar la página, los datos iniciales se muestran mediante `console.table()`.

La cookie únicamente guarda el criterio de ordenación. No almacena los cambios realizados en la colección, por lo que al recargar la página se recuperan los diez datos iniciales.

## Búsqueda, orden y colores en la página

El campo «Buscar planta...» filtra las tarjetas mientras escribes. Busca en el nombre, la especie, la ubicación y el estado; no distingue entre mayúsculas, minúsculas ni tildes. Si no hay coincidencias, no se muestran tarjetas. Al borrar el texto, se muestran de nuevo todas las plantas.

Los botones permiten ordenar las tarjetas por nombre (A-Z), por altura de menor a mayor y por fecha de adquisición, mostrando primero las plantas más recientes. La búsqueda y el orden se pueden combinar: el orden se aplica a los resultados de la búsqueda. Las funciones `buscarPorTexto(lista, texto)` y `ordenar(lista, criterio)` realizan estas operaciones por separado; `actualizar()` las combina para refrescar las tarjetas y las estadísticas. El ordenamiento trabaja sobre una copia, por lo que no modifica el array original de la colección.

La leyenda de colores identifica el estado de cada planta mediante el borde de su tarjeta:

| Color | Estado |
|---|---|
| Verde | Saludable |
| Naranja | Necesita agua |
| Rojo | Necesita cuidados |

### Gestión de fechas de adquisición

Se ha incorporado la gestión de fechas de adquisición de las plantas con las siguientes funcionalidades:

- Conversión de fechas al formato legible español (día, mes y año).
- Cálculo de los días transcurridos desde la adquisición.
- Identificación visual de las plantas adquiridas durante los últimos 30 días mediante un borde verde adicional.
- Incorporación de la fecha de adquisición en cada tarjeta.
- Nuevo criterio de ordenación para mostrar primero las plantas más recientes.
- Persistencia del criterio de ordenación mediante cookies, incluso después de recargar la página.

Para implementar estas funcionalidades se han utilizado objetos `Date`, el método `toLocaleDateString()`, operaciones con fechas y clases CSS dinámicas.

### Validación de datos mediante expresiones regulares

Se ha incorporado una validación mediante Regex para comprobar
que el nombre de las plantas contiene únicamente letras,
espacios, guiones y apóstrofes.

- Se utiliza el patrón `PATRON_NOMBRE`.
- Se comprueba el nombre mediante el método `.test()`.
- Si el nombre no cumple el patrón, se muestra un mensaje
  de error y se impide añadir la planta.

## Funciones de orden de la página

### `ordenar(lista, criterio)`

Devuelve una copia ordenada de la lista sin modificar el array original.

Admite tres criterios:

- `"nombre"`: orden alfabético de A a Z.
- `"altura"`: orden numérico de menor a mayor.
- `"fecha"`: orden cronológico, de la fecha de adquisición más reciente a la más antigua.

Ejemplos:

```javascript
ordenar(plantas, "nombre");
ordenar(plantas, "altura");
ordenar(plantas, "fecha");
```

### `actualizar()`

Lee el texto actual del buscador y el criterio de ordenación seleccionado.

Realiza las siguientes operaciones:

1. Aplica la búsqueda mediante `buscarPorTexto()`, si se ha introducido algún texto.
2. Ordena los resultados mediante `ordenar()`.
3. Actualiza las tarjetas de plantas mediante `pintar()`.
4. Actualiza las estadísticas mediante `pintarEstadisticas()`.
5. Actualiza el resumen de resultados mediante `pintarResumen()`.

Se ejecuta automáticamente al escribir en el buscador, pulsar los botones de ordenación y al iniciar la aplicación.

### `guardarCookie(nombre, valor, dias)`

Guarda información en una cookie del navegador.

Recibe tres parámetros:

- `nombre`: nombre de la cookie.
- `valor`: información que queremos guardar.
- `dias`: duración de la cookie en días.

Utiliza `document.cookie` para almacenar la información. En este proyecto se utiliza para guardar el último criterio de ordenación seleccionado durante 30 días.

### `leerCookie(nombre)`

Permite recuperar el valor de una cookie almacenada.

Lee las cookies del navegador, busca la que coincide con el nombre indicado y devuelve su valor. Si no encuentra la cookie, devuelve `null`.

### `elegirOrden(nuevo)`

Gestiona el criterio de ordenación seleccionado por el usuario.

1. Actualiza la variable `criterio`.
2. Guarda el criterio seleccionado mediante `guardarCookie()`.
3. Llama a `actualizar()` para mostrar las plantas ordenadas.

Los criterios utilizados son `nombre`, `altura` y `fecha`.

### Persistencia del orden

La aplicación recuerda el último orden seleccionado mediante una cookie llamada `orden`.

Cuando se carga la página, se utiliza `leerCookie("orden")` para recuperar el criterio guardado. Si no existe ninguna cookie, se utiliza el criterio `ninguno`.

La cookie tiene una duración de 30 días. De esta forma, al recargar la página se mantiene el orden seleccionado anteriormente.

## Funciones

Las funciones de lógica pueden probarse desde la consola del navegador. Primero ejecuta estas dos instrucciones una sola vez por recarga; después funcionan los ejemplos de lógica de este README:

```javascript
const { plantas } = await import("./js/interfaz.js");
const { listarTodos, filtrar, listar, quitarTildes, buscarPorTexto, anadirPlanta, eliminarPorId, contarPorCategoria, mostrarEstadisticas, estadisticas, ordenar } = await import("./js/logica.js");
```

Las funciones de interfaz (pintar, actualizar, cookies y elegirOrden) son internas al módulo: se ejecutan mediante los eventos de la página. Para probarlas individualmente, pon un punto de interrupción dentro de `interfaz.js` y usa la consola mientras la ejecución esté pausada en ese módulo. Añadir o eliminar desde la consola cambia los datos; para repintarlos sin recargar, escribe o borra texto en el buscador.

### 1. `listarTodos(lista)`

Recorre la colección y muestra el identificador, el nombre, la altura y una etiqueta según el tamaño de cada planta.

- `Pequeña`: altura menor o igual a 50 cm.
- `Grande`: altura superior a 50 cm.

Ejemplo:

```javascript
listarTodos(plantas);
```

### 2. `filtrar(lista, limite)`

Muestra las plantas que cumplen dos condiciones: su altura es igual o superior al límite indicado y su estado es `Saludable`.

Devuelve el número de plantas que cumplen ambas condiciones.

Ejemplos:

```javascript
filtrar(plantas, 50);
filtrar(plantas, 60);
```

Para guardar y mostrar el número de resultados:

```javascript
const cantidad = filtrar(plantas, 50);
console.log(cantidad);
```

### 3. `contarPorCategoria(lista)`

Cuenta las plantas de cada categoría utilizando una estructura `switch` y muestra los resultados por consola.

Las categorías son:

- Saludables.
- Necesitan agua.
- Necesitan cuidados.

Si encuentra un estado diferente de los contemplados, muestra un aviso.

Ejemplo:

```javascript
contarPorCategoria(plantas);
```

### 4. `listar(lista)`

Muestra el identificador, el nombre, la altura y la ubicación de cada planta.

Devuelve la lista recibida. Si la lista está vacía, muestra un mensaje y devuelve un array vacío.

Ejemplo:

```javascript
listar(plantas);
```

### 5. `buscarPorTexto(lista, texto)`

Busca un texto en el nombre, la especie, la ubicación y el estado de las plantas.

La búsqueda no distingue entre mayúsculas ni tildes y elimina los espacios al principio y al final del texto introducido.

Devuelve un array con las plantas encontradas. Si el texto está vacío o no hay coincidencias, muestra un mensaje y devuelve un array vacío.

Ejemplos:

```javascript
buscarPorTexto(plantas, "MONSTERA");
buscarPorTexto(plantas, "salón");
buscarPorTexto(plantas, "cactus");
```

Para guardar los resultados:

```javascript
const resultados = buscarPorTexto(plantas, "salón");
console.table(resultados);
```

### `pintarResumen(mostrados)`

Muestra un resumen de los resultados que aparecen en la página.

Recibe el número de plantas mostradas y comprueba si existen resultados.

- Si hay plantas, muestra cuántas se están mostrando respecto al total de la colección.
- Si no hay resultados, muestra un mensaje indicando que no existen plantas que contengan el texto buscado.

Ejemplos de mensajes:

- `Mostrando 4 de 10 plantas`.
- `No hay plantas que contengan "xyz"`.

Esta función actualiza el elemento HTML con el identificador `resumen`.

### 6. `anadirPlanta(lista, nuevaPlanta)`

Añade una planta nueva a la colección.

Acepta los datos de la planta o una instancia de `Planta`, asigna el siguiente ID y añade la instancia a la colección. Devuelve el ID asignado.

Si el elemento no es válido, muestra un mensaje y devuelve `null`.

Ejemplo:

```javascript
anadirPlanta(plantas, {
    nombre: "Menta",
    especie: "Mentha",
    fecha_adquisicion: "2026-10-19",
    altura: 15,
    ubicacion: "Cocina",
    estado: "Saludable"
});
```

Para comprobar el resultado:

```javascript
listar(plantas);
```

La función asigna automáticamente el ID, por lo que no es necesario escribirlo en el objeto.

### 7. `eliminarPorId(lista, id)`

Busca una planta por su identificador y elimina el elemento correspondiente mediante `splice()`.

- Devuelve `true` si encuentra y elimina la planta.
- Devuelve `false` si el identificador no existe.

Ejemplos:

```javascript
eliminarPorId(plantas, 3);
eliminarPorId(plantas, 99);
```

Para guardar el resultado:

```javascript
const eliminada = eliminarPorId(plantas, 3);
console.log(eliminada);
```

El primer ejemplo elimina la planta con ID 3 si existe. El segundo comprueba qué sucede cuando no se encuentra el identificador.

### 8. `mostrarEstadisticas(lista)`

Calcula y muestra estadísticas sobre la altura de las plantas.

Muestra:

- La altura total de todas las plantas, en centímetros.
- La altura media, con un decimal.
- El nombre y la altura de la planta más alta.

Si la lista está vacía, muestra un aviso y termina sin realizar los cálculos.

Ejemplo:

```javascript
mostrarEstadisticas(plantas);
```

Con los datos iniciales, el resultado es:

- Altura total: 455 cm.
- Altura media: 45,5 cm.
- Planta más alta: Monstera, con 80 cm.

## Ejemplos de uso desde la consola

Las siguientes instrucciones permiten probar las funciones de forma individual:

```javascript
// Listar todas las plantas con su clasificación por altura
listarTodos(plantas);

// Filtrar plantas saludables de 50 cm o más
filtrar(plantas, 50);

// Contar las plantas por categoría
contarPorCategoria(plantas);

// Mostrar la lista de plantas
listar(plantas);

// Buscar plantas por texto
buscarPorTexto(plantas, "salón");

// Ordenar plantas sin cambiar el array original
ordenar(plantas, "nombre");
ordenar(plantas, "altura");

// Mostrar estadísticas
mostrarEstadisticas(plantas);
```

Para probar las operaciones que modifican la colección, ejecuta estas instrucciones por separado:

```javascript
// Añadir una planta
anadirPlanta(plantas, {
    nombre: "Menta",
    especie: "Mentha",
    fecha_adquisicion: "2026-10-19",
    altura: 15,
    ubicacion: "Cocina",
    estado: "Saludable"
});

// Comprobar la colección
listar(plantas);
```

```javascript
// Eliminar una planta por su ID
eliminarPorId(plantas, 3);

// Comprobar la colección
listar(plantas);

```

Los cambios se mantienen mientras la página esté abierta. Al recargarla, se recuperan los diez datos iniciales.

```javascript

// Comprobar el resumen de resultados
pintarResumen(plantas.length);

// Consultar las cookies del navegador
document.cookie;

// Recuperar el último criterio de ordenación
leerCookie("orden");

// Guardar un criterio de ordenación
guardarCookie("orden", "altura", 30);
```

### Tecnologías utilizadas

- HTML5.
- JavaScript.
- Consola del navegador.
- Git y GitHub para el control de versiones y la publicación del proyecto.

### Uso de inteligencia artificial

Se ha utilizado ChatGPT como apoyo para revisar y organizar el código, resolver errores y mejorar la documentación del proyecto.

## Reparto del trabajo

El proyecto Mis Plantas se ha desarrollado conjuntamente por Kevin Núñez Sánchez y Javier Becerro Batuecas.

### Kevin Núñez Sánchez

Tareas realizadas:

- Creación de la colección inicial de plantas mediante un array de objetos.
- Implementación del listado de plantas y clasificación según su altura.
- Desarrollo de funciones de filtrado por altura y estado.
- Implementación del buscador por nombre, especie, ubicación y estado.
- Desarrollo de las funciones para añadir y eliminar plantas.
- Implementación de estadísticas: altura total, media, planta más alta y más baja.
- Creación de tarjetas dinámicas para mostrar las plantas en la interfaz web.
- Aplicación de estilos visuales según el estado de cada planta.
- Implementación de la ordenación alfabética y por altura.
- Gestión de cookies para guardar y recuperar el último criterio de ordenación.
- Incorporación de fechas de adquisición en las tarjetas.
- Identificación visual de las plantas adquiridas durante los últimos 30 días.
- Implementación de la ordenación por fecha de adquisición.
- Incorporación de validación mediante expresiones regulares (Regex) para comprobar los nombres de las plantas.
- Creación de la clase `ColeccionPlantas` en `js/coleccion.js` para centralizar la gestión de la colección.
- Implementación del constructor y del getter `total` para almacenar la colección y consultar el número de plantas.
- Implementación de los métodos `listar()`, `anadir()`, `buscar()` y `eliminar()` para gestionar las operaciones de la colección reutilizando la lógica existente.
- Implementación del método estático `desdeDatos()` para crear instancias de `Planta` a partir de los datos iniciales.
- Integración de `ColeccionPlantas` en `interfaz.js`, sustituyendo el acceso directo a la colección por los métodos de la clase gestora.
- Pruebas desde la consola del navegador para comprobar la creación de la colección, la búsqueda, el total y la eliminación de plantas.
- Documentación JSDoc de las clases `Planta` y `ColeccionPlantas`, incluyendo sus constructores, propiedades y métodos, con descripciones, parámetros y valores de retorno.
- Comprobación de la ayuda contextual de JSDoc en Visual Studio Code al situar el cursor sobre los métodos y consultar sus parámetros.

### Javier Becerro Batuecas

Colaboración en las restantes tareas de desarrollo del proyecto:

- Desarrollo de funcionalidades complementarias.
- Colaboración en la estructura y organización de la aplicación.
- Revisión y comprobación del funcionamiento general.
- Integración de los diferentes apartados del proyecto.
- Elaboración y actualización de la documentación.
- Revisión de las correcciones del profesor y de los temas aportados.
- Sustitución de las construcciones señaladas por bucles y comprobaciones básicas.
- Organización del código por responsabilidades.
- Corrección de incoherencias y del formato de los ejemplos del README, manteniendo la información y el reparto anterior.
- Separación del proyecto en `datos.js`, `logica.js` e `interfaz.js`, con `export` e `import`, y carga de la interfaz desde el HTML mediante `type="module"`.
- Implementación y prueba de las funciones `maximo`, `unir`, `conTiempo` y `contarSi` en la carpeta `../retos-s14`.
- Creación de la clase `Planta` con validación del nombre y de los campos de texto obligatorios, y un setter que comprueba que la altura sea un número finito mayor o igual que cero.
- Conversión de los diez registros iniciales y de las nuevas plantas del formulario en instancias de `Planta`.
- Integración de `descripcion()` en las tarjetas para mostrar la especie, la altura y la ubicación, y de `esReciente(30)` para resaltar las plantas adquiridas en los últimos 30 días.
- Comprobaciones automatizadas de la lógica, las importaciones y los eventos con un DOM simulado, incluidas las altas válidas y el rechazo de alturas inválidas.


La aplicación está organizada en módulos con responsabilidades separadas:

- `js/datos.js`: exporta únicamente el array `datosPlantas`, con sus diez registros originales.
- `js/logica.js`: contiene las funciones de búsqueda, altas, bajas, listados, categorías, estadísticas, ordenación y fechas. No accede al DOM.
- `js/planta.js`: contiene la clase `Planta`, que representa cada planta y valida sus datos.
- `js/coleccion.js`: contiene la clase `ColeccionPlantas`, que gestiona la colección mediante sus métodos y crea la colección inicial con `desdeDatos()`.
- `js/interfaz.js`: importa los módulos necesarios; contiene el pintado de tarjetas, las cookies, los eventos, el formulario y el inicio de la aplicación. Utiliza la instancia `coleccion` para acceder a las plantas.

El HTML carga un único script con `type="module"`. Es necesario abrir el proyecto con Live Server; los módulos no se ejecutan abriendo el HTML con doble clic.

El reto 1 está en `../retos-s14`, fuera del repositorio del proyecto. Incluye `maximo`, `unir`, `conTiempo` y `contarSi`, con pruebas y comentarios sobre sus resultados esperados. No se han añadido los ejercicios opcionales.


`interfaz.js` convierte los diez registros iniciales en instancias de `Planta`. El formulario también crea instancias. La clase comprueba el nombre y los campos de texto obligatorios. El setter `altura` exige un número finito mayor o igual que cero.

Cada tarjeta usa `descripcion()` para mostrar la especie, la altura y la ubicación. `esReciente(dias)` calcula los días transcurridos desde `this.fecha_adquisicion`. La página llama a `esReciente(30)` para aplicar la clase CSS `reciente`.

### Trabajo en equipo

Ambos integrantes han colaborado en las pruebas, la resolución de errores y la evolución del proyecto.



Para comprobar el error de validación en la consola del navegador:

```javascript
const { Planta } = await import("./js/planta.js");
new Planta({ nombre: "X", altura: -3 }); // Error: la altura no es válida
```
