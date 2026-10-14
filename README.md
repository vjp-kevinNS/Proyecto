# Mis Plantas

## Descripción

Mis Plantas es una aplicación sencilla de JavaScript para consultar y gestionar una colección de plantas. La información se guarda en un array en memoria y las operaciones y resultados se muestran en la consola del navegador.

No hay una interfaz para gestionar las plantas ni una base de datos: los cambios realizados durante la sesión se pierden al recargar la página.

## Estructura del proyecto

```text
Proyecto/
├── index.html
├── README.md
└── js/
    └── app.js
```

`index.html` carga `js/app.js` con el atributo `defer`, por lo que el código se ejecuta al abrir la página en un navegador.

## Cómo ejecutar la aplicación

1. Abre la carpeta `Proyecto` en tu editor de código.
2. Ejecuta `index.html` en un navegador (por ejemplo, con doble clic o desde una extensión como Live Server).
3. Abre la consola del navegador con `F12` para ver los mensajes y probar las funciones del proyecto.

> La aplicación no tiene interfaz gráfica para añadir o eliminar plantas; todo se hace desde la consola del navegador durante la sesión actual.

## Datos de la colección

La constante `plantas` contiene inicialmente diez plantas. Cada objeto tiene estos campos:

| Campo | Descripción | Tipo |
| --- | --- | --- |
| `id` | Identificador de la planta. | Número |
| `nombre` | Nombre común. | Texto |
| `especie` | Nombre de la especie. | Texto |
| `fecha_adquisicion` | Fecha de adquisición en formato `AAAA-MM-DD`. | Texto |
| `altura` | Altura en centímetros. | Número |
| `ubicacion` | Lugar donde está la planta. | Texto |
| `estado` | Estado de la planta. | Texto |

Los estados usados en los datos iniciales son `Saludable`, `Necesita agua` y `Necesita cuidados`.

La constante `NOMBRE_APP` contiene el nombre de la aplicación (`Mis Plantas`), y `LIMITE_ALTURA` establece en 50 cm el límite que utiliza `listarTodos` para etiquetar las plantas.

## Comportamiento al cargar la página

Al abrir `index.html`, el programa:

1. Muestra el nombre de la aplicación y el número de plantas cargadas.
2. Muestra la colección inicial en formato de tabla con `console.table`.
3. Ejecuta `listarTodos(plantas)`.
4. Filtra y muestra las plantas saludables que miden al menos 50 cm y, después, las que miden al menos 60 cm. También muestra el número de resultados de cada filtro.
5. Ejecuta `listar(plantas)` para mostrar el id, nombre, altura y ubicación de cada planta.

## Funciones

Las funciones se pueden probar desde la consola del navegador, en la pestaña **Console** de las herramientas de desarrollador (F12).

### `listarTodos(lista)`

Recorre la lista y muestra el id, nombre, altura y una etiqueta según la altura:

- `Pequeña` si mide 50 cm o menos.
- `Grande` si mide más de 50 cm.

```js
listarTodos(plantas);
```

### `filtrar(lista, limite)`

Muestra las plantas que cumplen ambas condiciones: su altura es igual o superior al límite indicado y su estado es `Saludable`. Devuelve el número de plantas que cumplen las condiciones.

```js
const cantidad = filtrar(plantas, 50);
console.log(cantidad);
```

### `contarPorCategoria(lista)`

Cuenta las plantas con estado `Saludable`, `Necesita agua` y `Necesita cuidados`, y muestra los tres totales. Si encuentra un estado distinto, muestra un aviso en la consola.

```js
contarPorCategoria(plantas);
```

Esta función está definida, pero no se ejecuta automáticamente al cargar la página.

### `listar(lista)`

Muestra el id, nombre, altura y ubicación de cada planta, y devuelve la lista. Si la lista está vacía, muestra un mensaje y devuelve un array vacío.

```js
listar(plantas);
```

### `buscarPorTexto(lista, texto)`

Busca el texto indicado en el nombre, la especie, la ubicación y el estado. La búsqueda no distingue entre mayúsculas y minúsculas y elimina los espacios al principio y al final del texto buscado. Muestra las coincidencias y devuelve un array con las plantas encontradas. Si el texto está vacío o no hay coincidencias, muestra el mensaje correspondiente.

```js
const resultados = buscarPorTexto(plantas, "salón");
```

### `anadirPlanta(lista, nuevaPlanta)`

Añade una planta a la lista y devuelve la lista actualizada. La planta debe ser un objeto válido. Si no se indica un `id` (o es `null`), asigna uno igual al id del último elemento más uno; si la lista está vacía, asigna el id `1`. Si la planta no es válida, muestra un mensaje y devuelve la lista sin añadirla.

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

La función no valida que el objeto incluya todos los campos ni que sus valores tengan un formato concreto.

### `eliminarPorId(lista, id)`

Elimina de la lista la primera planta cuyo id coincide exactamente con el indicado y devuelve la lista actualizada. Si no encuentra ese id, muestra un aviso y devuelve la lista sin cambios.

```js
eliminarPorId(plantas, 3);
listar(plantas);
```

## Ejecución

```js
// Mostrar todas las plantas con una etiqueta según su altura
listarTodos(plantas);

// Mostrar plantas saludables que midan al menos 50 cm
// El resultado también devuelve la cantidad encontrada
filtrar(plantas, 50);

// Contar las plantas según su estado
contarPorCategoria(plantas);

// Mostrar id, nombre, altura y ubicación
listar(plantas);

// Buscar por nombre, especie, ubicación o estado
buscarPorTexto(plantas, "salón");
buscarPorTexto(plantas, "monstera");

// Añadir una planta y mostrar la colección actualizada
anadirPlanta(plantas, {
    nombre: "Menta",
    especie: "Mentha",
    fecha_adquisicion: "2026-10-14",
    altura: 15,
    ubicacion: "Cocina",
    estado: "Saludable"
});
listar(plantas);

// Eliminar la planta con id 3 y mostrar la colección actualizada
eliminarPorId(plantas, 3);
listar(plantas);
```

Los comandos que añaden o eliminan plantas modifican la colección mientras la página está abierta. Al recargarla, se recuperan los datos iniciales. Si quieres probar el ejemplo de eliminación sin perder una planta durante la sesión, puedes recargar la página después.

## Tecnologías

- HTML5
- JavaScript
