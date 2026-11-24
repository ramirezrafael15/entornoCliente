"use strict";

function pintarError(elemento, mensaje) {
  const salida = document.getElementById(`error-${elemento.id}`);
  salida.textContent = mensaje;
  elemento.setAttribute("aria-invalid", String(mensaje !== ""));
}

function enfocarPrimero(elemento) {
  const destino = elemento.matches("input, select, textarea, button")
    ? elemento
    : elemento.querySelector("input, select, textarea");
  destino.focus();
}

function limpiarEstado(estado) {
  estado.replaceChildren();
  estado.className = "estado";
}

function mostrarFallo(estado, texto) {
  estado.replaceChildren();
  estado.className = "estado fallo";
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  estado.append(parrafo);
}

function mostrarResumen(estado, titulo, pares) {
  estado.replaceChildren();
  estado.className = "estado ok";
  const parrafo = document.createElement("p");
  parrafo.textContent = titulo;
  const lista = document.createElement("ul");
  for (const [etiqueta, valor] of pares) {
    const item = document.createElement("li");
    const negrita = document.createElement("strong");
    negrita.textContent = `${etiqueta}: `;
    item.append(negrita, document.createTextNode(valor));
    lista.append(item);
  }
  estado.append(parrafo, lista);
}

function valorRadio(form, nombre) {
  const elegido = form.querySelector(`input[name="${nombre}"]:checked`);
  return elegido ? elegido.value : "";
}

function textoOpcion(select) {
  return select.options[select.selectedIndex].text;
}

function datosSeguros(datos, ocultos) {
  const salida = {};
  for (const [clave, valor] of datos.entries()) {
    if (ocultos.includes(clave)) continue;
    salida[clave] = valor instanceof File
      ? `${valor.name} (${valor.type || "sin tipo"}, ${valor.size} bytes)`
      : valor;
  }
  return salida;
}
