/**
 * Pinta una tarjeta por cada serie (usa map).
 * @param {Array} lista series que quiero mostrar
 * @returns {string} el HTML de todas las tarjetas
 */
export function mostrarCatalogoHTML(lista) {
  return lista.map(serie => `
    <article class="card">
      <h3>${serie.titulo}</h3>
      <p class="etiqueta">${serie.genero}</p>
      <p>Plataforma: ${serie.plataforma}</p>
      <p>${serie.temporadas} temporadas</p>
      <p class="nota">Nota: ${serie.nota.toFixed(1)}</p>
    </article>`).join("");
}

/**
 * Ordena de mayor a menor nota. Hago una copia para no tocar el array original.
 * @param {Array} lista series
 * @returns {Array} copia ordenada por nota
 */
export function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}

/**
 * Ordena de menos a más temporadas, también con copia.
 * @param {Array} lista series
 * @returns {Array} copia ordenada por temporadas
 */
export function ordenarPorTemporadas(lista) {
  return [...lista].sort((a, b) => a.temporadas - b.temporadas);
}

/**
 * Mira si hay alguna serie de ese género (usa some).
 * @param {Array} lista series
 * @param {string} genero género que busco
 * @returns {boolean} true si hay alguna
 */
export function hayGenero(lista, genero) {
  return lista.some(serie => serie.genero === genero);
}

/**
 * Mira si todas las series tienen como mínimo esas temporadas (usa every).
 * @param {Array} lista series
 * @param {number} minimo temporadas mínimas
 * @returns {boolean} true si todas llegan al mínimo
 */
export function todasMasDeTemporadas(lista, minimo) {
  return lista.every(serie => serie.temporadas >= minimo);
}

/**
 * Se queda solo con las series de un género (usa filter).
 * @param {Array} lista series
 * @param {string} genero género que quiero
 * @returns {Array} series de ese género
 */
export function filtrarPorGenero(lista, genero) {
  return lista.filter(serie => serie.genero === genero);
}

/**
 * Se queda con las series que tengan esa nota o más (usa filter).
 * @param {Array} lista series
 * @param {number} notaMinima nota mínima
 * @returns {Array} series que llegan a esa nota
 */
export function filtrarPorNotaMinima(lista, notaMinima) {
  return lista.filter(serie => serie.nota >= notaMinima);
}

/**
 * Busca una serie por su id (usa find).
 * @param {Array} lista series
 * @param {string} id id de la serie
 * @returns {Object|undefined} la serie, o undefined si no está
 */
export function buscarPorId(lista, id) {
  return lista.find(serie => serie.id === id);
}

/**
 * Busca una serie por su título sin importar mayúsculas (usa find).
 * @param {Array} lista series
 * @param {string} titulo título que busco
 * @returns {Object|undefined} la serie, o undefined si no está
 */
export function buscarPorTitulo(lista, titulo) {
  return lista.find(serie => serie.titulo.toLowerCase() === titulo.toLowerCase());
}

/**
 * Dice en qué posición está la serie con ese id (usa findIndex).
 * @param {Array} lista series
 * @param {string} id id de la serie
 * @returns {number} la posición, o -1 si no está
 */
export function indicePorId(lista, id) {
  return lista.findIndex(serie => serie.id === id);
}

/**
 * Calcula la nota media sumando con forEach.
 * @param {Array} lista series
 * @returns {number} nota media con 2 decimales
 */
export function notaMedia(lista) {
  let suma = 0;
  lista.forEach(serie => {
    suma += serie.nota;
  });
  return Number((suma / lista.length).toFixed(2));
}

/**
 * Calcula las temporadas de media sumando con forEach.
 * @param {Array} lista series
 * @returns {number} temporadas de media con 2 decimales
 */
export function temporadasMedia(lista) {
  let suma = 0;
  lista.forEach(serie => {
    suma += serie.temporadas;
  });
  return Number((suma / lista.length).toFixed(2));
}

/**
 * Saca los nombres de las propiedades de una serie (Object.keys).
 * @param {Object} serie una serie
 * @returns {string[]} los nombres de las propiedades
 */
export function camposDeSerie(serie) {
  return Object.keys(serie);
}

/**
 * Pasa una serie a pares [clave, valor] (Object.entries).
 * @param {Object} serie una serie
 * @returns {Array} los pares clave-valor
 */
export function serieAEntradas(serie) {
  return Object.entries(serie);
}

/**
 * Vuelve a crear una serie a partir de sus pares (Object.fromEntries).
 * @param {Array} entradas pares [clave, valor]
 * @returns {Object} la serie reconstruida
 */
export function crearSerieDesdeEntradas(entradas) {
  return Object.fromEntries(entradas);
}

/**
 * Devuelve una copia de la serie con la nota subida 0.1 (máximo 10).
 * @param {Object} serie una serie
 * @returns {Object} copia con la nota nueva
 */
export function subirNota(serie) {
  const nuevas = serieAEntradas(serie).map(([clave, valor]) => {
    if (clave === "nota") {
      return [clave, Math.min(10, Number((valor + 0.1).toFixed(1)))];
    }
    return [clave, valor];
  });
  return crearSerieDesdeEntradas(nuevas);
}
