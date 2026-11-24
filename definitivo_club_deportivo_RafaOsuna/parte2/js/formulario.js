"use strict";

function iniciarFormulario({ form, estado, campos, alValidar }) {
  let intentado = false;
  const porId = {};
  for (const campo of campos) porId[campo.id] = campo;

  function validar(campo) {
    const elemento = document.getElementById(campo.id);
    const admiteCustom = typeof elemento.setCustomValidity === "function";
    if (admiteCustom) elemento.setCustomValidity("");
    const mensaje = campo.regla(elemento);
    if (admiteCustom) elemento.setCustomValidity(mensaje);
    pintarError(elemento, mensaje);
    return mensaje === "";
  }

  form.addEventListener("submit", evento => {
    evento.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroIncorrecto = null;
    for (const campo of campos) {
      const correcto = validar(campo);
      if (!correcto && primeroIncorrecto === null) primeroIncorrecto = campo;
    }

    if (primeroIncorrecto) {
      mostrarFallo(estado, "Hay errores. Revisa los campos indicados.");
      enfocarPrimero(document.getElementById(primeroIncorrecto.id));
      return;
    }
    alValidar(new FormData(form));
  });

  function alEditar(evento) {
    limpiarEstado(estado);
    if (!intentado) return;
    for (const campo of campos) {
      const elemento = document.getElementById(campo.id);
      if (!elemento.contains(evento.target)) continue;
      validar(campo);
      for (const id of campo.revalida ?? []) validar(porId[id]);
    }
  }
  form.addEventListener("input", alEditar);
  form.addEventListener("change", alEditar);
}
