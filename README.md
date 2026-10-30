# Catálogo de series

Proyecto de la unidad 3 de Desarrollo Web en Entorno Cliente.

## Qué es
He hecho una web que gestiona un catálogo de 10 series. La idea es que sirva para decidir qué serie ver: primero se ve el catálogo, luego las mejor valoradas, después puedo filtrar por género con un desplegable, buscar una serie escribiendo su id o su título y ver cómo es su ficha.

## Temática
Series de televisión de comedia, drama, ciencia ficción y thriller.

## Datos
Cada serie es un objeto con estas propiedades:
- `id` y `titulo`: textos únicos
- `genero` y `plataforma`: textos que se repiten y sirven para clasificar
- `temporadas`: número entero
- `nota`: número decimal

## Captura
![Captura de la web](img/captura.png)

## Archivos
- `index.html`
- `styles/styles.css`
- `js/datos.js`: el array de series
- `js/funciones.js`: las funciones, exportadas
- `js/app.js`: el programa principal, que importa los datos y las funciones
- `img/captura.png`: captura de la web

## Métodos que he usado
`forEach` en las medias, `sort` para ordenar, `some` y `every` en las comprobaciones, `filter` para filtrar, `find` y `findIndex` para buscar, y `Object.keys`, `Object.entries` y `Object.fromEntries` para trabajar con la ficha de una serie. También `map` para hacer las tarjetas.

## Cómo abrirlo
Hay que abrirlo con Live Server en VS Code (clic derecho en `index.html` y "Open with Live Server"), porque los módulos no funcionan abriendo el archivo con doble clic.

Rafael Osuna Ramírez, 2.º DAW
