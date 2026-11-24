"use strict";

function normalizarEspacios(texto) {
  return texto.replace(/^ +| +$/g, "").replace(/ {2,}/g, " ");
}

function extraerCifras(texto) {
  return texto.match(/[0-9]+/g) ?? [];
}

function separarEtiquetas(texto) {
  return texto
    .split(/\s*,\s*/)
    .map(etiqueta => etiqueta.trim())
    .filter(etiqueta => etiqueta !== "");
}

if (typeof module !== "undefined") {
  module.exports = { normalizarEspacios, extraerCifras, separarEtiquetas };
}
