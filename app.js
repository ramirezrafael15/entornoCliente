import { series } from "./datos.js";
import {
  mostrarCatalogoHTML, ordenarPorNota, ordenarPorTemporadas,
  hayGenero, todasMasDeTemporadas, filtrarPorGenero, filtrarPorNotaMinima,
  buscarPorId, buscarPorTitulo, indicePorId, notaMedia, temporadasMedia,
  camposDeSerie, serieAEntradas, crearSerieDesdeEntradas, subirNota
} from "./funciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const principal = document.querySelector("#principal");

  // crea una sección con su título y devuelve el div donde va el contenido
  function crearSeccion(titulo, clase = "") {
    const seccion = document.createElement("section");
    seccion.className = "seccion " + clase;
    const h2 = document.createElement("h2");
    h2.textContent = titulo;
    const contenido = document.createElement("div");
    seccion.append(h2, contenido);
    principal.appendChild(seccion);
    return contenido;
  }

  // crea un párrafo con el texto que le paso
  function parrafo(texto) {
    const p = document.createElement("p");
    p.textContent = texto;
    return p;
  }

  const catalogo = crearSeccion("¿Qué series hay?");
  catalogo.className = "grid";
  catalogo.innerHTML = mostrarCatalogoHTML(series);

  const stats = crearSeccion("¿Cómo está el catálogo?");
  stats.className = "stats";
  stats.innerHTML = `
    <div class="stat"><span>${series.length}</span>series en total</div>
    <div class="stat"><span>${notaMedia(series)}</span>nota media</div>
    <div class="stat"><span>${temporadasMedia(series)}</span>temporadas de media</div>`;

  const puestos = ["🥇", "🥈", "🥉", "4º", "5º"];
  const top = crearSeccion("¿Cuáles son las mejores?");
  ordenarPorNota(series).slice(0, 5).forEach((serie, i) => {
    top.appendChild(parrafo(`${puestos[i]} ${serie.titulo} · nota ${serie.nota.toFixed(1)}`));
  });

  const verif = crearSeccion("¿Qué puedo asegurar del catálogo?");
  verif.appendChild(parrafo(`¿Hay series de thriller? ${hayGenero(series, "thriller") ? "Sí" : "No"}`));
  verif.appendChild(parrafo(`¿Hay series de terror? ${hayGenero(series, "terror") ? "Sí" : "No"}`));
  verif.appendChild(parrafo(`¿Todas tienen 3 temporadas o más? ${todasMasDeTemporadas(series, 3) ? "Sí" : "No"}`));
  verif.appendChild(parrafo(`¿Todas tienen 6 temporadas o más? ${todasMasDeTemporadas(series, 6) ? "Sí" : "No"}`));

  const filtro = crearSeccion("¿Qué género me apetece?");
  const selector = document.createElement("select");
  // saco los géneros del array sin repetirlos
  const generos = [...new Set(series.map(serie => serie.genero))];
  generos.forEach(genero => {
    const opcion = document.createElement("option");
    opcion.value = genero;
    opcion.textContent = genero;
    selector.appendChild(opcion);
  });
  selector.value = "drama";
  const cuenta = document.createElement("p");
  const gridFiltro = document.createElement("div");
  gridFiltro.className = "grid";
  filtro.append(selector, cuenta, gridFiltro);

  // enseña las series del género elegido y cuántas hay
  function mostrarGenero() {
    const encontradas = filtrarPorGenero(series, selector.value);
    cuenta.textContent = `Series de ${selector.value} encontradas: ${encontradas.length}`;
    gridFiltro.innerHTML = mostrarCatalogoHTML(encontradas);
  }
  selector.addEventListener("change", mostrarGenero);
  mostrarGenero();

  const zonaPremium = crearSeccion("¿Cuáles son premium (nota 9.0 o más)?", "premium");
  zonaPremium.className = "grid";
  zonaPremium.innerHTML = mostrarCatalogoHTML(filtrarPorNotaMinima(series, 9.0));

  const busqueda = crearSeccion("¿Está la serie que busco?");
  const inputId = document.createElement("input");
  inputId.placeholder = "Id (por ejemplo S09)";
  inputId.value = "S09";
  const inputTitulo = document.createElement("input");
  inputTitulo.placeholder = "Título (por ejemplo Dexter)";
  inputTitulo.value = "Dexter";
  const boton = document.createElement("button");
  boton.textContent = "Buscar";
  const resultado = document.createElement("div");
  busqueda.append(inputId, inputTitulo, boton, resultado);

  // busca por id y por título con lo que haya escrito
  function buscar() {
    const id = inputId.value.trim().toUpperCase();
    const titulo = inputTitulo.value.trim();
    const porId = buscarPorId(series, id);
    const porTitulo = buscarPorTitulo(series, titulo);
    const posicion = indicePorId(series, id);
    resultado.innerHTML = "";
    resultado.appendChild(parrafo(`Búsqueda por id ${id}: ${porId ? porId.titulo : "no encontrada"}`));
    resultado.appendChild(parrafo(`Búsqueda por título ${titulo}: ${porTitulo ? porTitulo.titulo : "no encontrada"}`));
    resultado.appendChild(parrafo(`Posición de ${id} en el catálogo: ${posicion === -1 ? "no está" : posicion}`));
  }
  boton.addEventListener("click", buscar);
  buscar();

  const primera = series[0];
  const analisis = crearSeccion("¿Cómo es la ficha de una serie?");
  analisis.appendChild(parrafo(`Propiedades (Object.keys): ${camposDeSerie(primera).join(", ")}`));
  analisis.appendChild(parrafo(`Entradas (Object.entries): ${JSON.stringify(serieAEntradas(primera))}`));
  analisis.appendChild(parrafo(`Serie reconstruida (Object.fromEntries): ${JSON.stringify(crearSerieDesdeEntradas(serieAEntradas(primera)))}`));
  analisis.appendChild(parrafo(`Con la nota subida: ${JSON.stringify(subirNota(primera))}`));

  const cortas = crearSeccion("¿Cuáles son las más cortas para empezar?");
  ordenarPorTemporadas(series).slice(0, 5).forEach((serie, i) => {
    cortas.appendChild(parrafo(`${i + 1}. ${serie.titulo} · ${serie.temporadas} temporadas`));
  });

  document.querySelector("#anio").textContent = new Date().getFullYear();
});
