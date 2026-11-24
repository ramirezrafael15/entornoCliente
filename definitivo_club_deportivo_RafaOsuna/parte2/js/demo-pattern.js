"use strict";

const demoForm = document.getElementById("demo-form");
const demoSalida = document.getElementById("demo-salida");

function si(valor) { return valor ? "sí" : "no"; }

function lineaComparacion(titulo, campo) {
  const nativa = campo.validity;
  const js = esCodigoServicio(campo.value);
  const caja = document.createElement("div");
  const encabezado = document.createElement("p");
  encabezado.textContent = `${titulo}: «${campo.value}»`;
  const lista = document.createElement("ul");
  const datos = [
    `Nativa: ${nativa.valid ? "válido" : "inválido"} (valueMissing: ${si(nativa.valueMissing)}, patternMismatch: ${si(nativa.patternMismatch)})`,
    `JavaScript (esCodigoServicio): ${js ? "válido" : "inválido"}`,
    `¿Coinciden?: ${nativa.valid === js ? "sí" : "no"}`
  ];
  for (const texto of datos) {
    const item = document.createElement("li");
    item.textContent = texto;
    lista.append(item);
  }
  caja.append(encabezado, lista);
  return caja;
}

function comparar() {
  demoSalida.replaceChildren(
    lineaComparacion("Campo obligatorio", document.getElementById("demo-codigo")),
    lineaComparacion("Campo opcional", document.getElementById("demo-opcional"))
  );
}

document.getElementById("demo-comparar").addEventListener("click", comparar);

demoForm.addEventListener("submit", evento => {
  evento.preventDefault();
  comparar();
});
