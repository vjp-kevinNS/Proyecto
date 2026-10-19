# Mis Plantas

## Descripción

Mis Plantas es una aplicación sencilla de JavaScript para consultar y gestionar una colección de plantas. La información se guarda en un array en memoria y las operaciones y resultados se muestran en la consola del navegador.

La aplicación permite listar plantas, filtrarlas por altura y estado, contar sus categorías, buscar por texto, añadir y eliminar plantas y consultar estadísticas sobre sus alturas.

No hay una interfaz para gestionar las plantas ni una base de datos. Los cambios realizados durante la sesión se pierden al recargar la página.

## Estructura del proyecto

```text
Proyecto/
├── index.html
├── README.md
└── js/
    └── app.js
```

El archivo `index.html` carga `js/app.js` mediante la etiqueta `<script src="js/app.js" defer></script>`.

## Cómo ejecutar la aplicación

1. Abre la carpeta del proyecto en tu editor de código.
2. Abre `index.html` en un navegador, por ejemplo, mediante doble clic o utilizando Live Server.
3. Abre las herramientas de desarrollador con `F12`.
4. Entra en la pestaña Console para ver los resultados y probar las funciones.

La aplicación funciona desde la consola del navegador. No necesita una base de datos ni una interfaz gráfica.

## Datos de la colección

La constante `plantas` contiene inicialmente diez plantas. Cada objeto tiene los siguientes campos:

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

La constante `NOMBRE_APP` contiene el nombre de la aplicación (`Mis Plantas`). La constante `LIMITE_ALTURA` establece el límite de 50 cm utilizado por `listarTodos` para clasificar las plantas como pequeñas o grandes.

Al cargar la página, los datos iniciales se muestran mediante `console.table()`.

## Funciones

Todas las funciones pueden probarse desde la consola del navegador. Para utilizarlas, escribe la llamada correspondiente y pulsa Intro.

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

La búsqueda no distingue entre mayúsculas y minúsculas y elimina los espacios al principio y al final del texto introducido.

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

### 6. `anadir(lista, elemento)`

Añade una planta nueva a la colección.

Calcula el identificador siguiente al mayor ID existente, crea el objeto de la nueva planta, lo incorpora al array mediante `push()` y devuelve el ID asignado.

Si el elemento no es válido, muestra un mensaje y devuelve `null`.

Ejemplo:

```javascript
anadir(plantas, {
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

// Mostrar estadísticas
mostrarEstadisticas(plantas);
```

Para probar las operaciones que modifican la colección, ejecuta estas instrucciones por separado:

```javascript
// Añadir una planta
anadir(plantas, {
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

## Tecnologías utilizadas

- HTML5.
- JavaScript.
- Consola del navegador.
- Git y GitHub para el control de versiones y la publicación del proyecto.

## Uso de inteligencia artificial

Se ha utilizado ChatGPT como apoyo para revisar y organizar el código, resolver errores y mejorar la documentación del proyecto.

