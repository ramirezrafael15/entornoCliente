"use strict";

const PATRON_NOMBRE = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+(?: [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*$/;

const PATRON_USUARIO = /^[A-Za-z][A-Za-z0-9]{4,19}$/;

const PATRON_PASSWORD = /^[A-Za-z][A-Za-z0-9_]{7,15}$/;

const PATRON_TELEFONO = /^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$/;

const PATRON_CODIGO_SERVICIO = /^DEP-[0-9]{3}$/;

const PATRON_REFERENCIA_CITA = /^(?:CITA|RES)-[0-9]{4}$/;

function esNombreValido(texto) {
  return texto.length >= 4 && texto.length <= 50 && PATRON_NOMBRE.test(texto);
}

function esUsuarioValido(texto) {
  return PATRON_USUARIO.test(texto);
}

function esPasswordValido(texto) {
  return PATRON_PASSWORD.test(texto);
}

function esTelefonoValido(texto) {
  return PATRON_TELEFONO.test(texto.trim());
}

function esCodigoServicio(texto) {
  return PATRON_CODIGO_SERVICIO.test(texto);
}

function esReferenciaCita(texto) {
  return PATRON_REFERENCIA_CITA.test(texto);
}

if (typeof module !== "undefined") {
  module.exports = {
    esNombreValido, esUsuarioValido, esPasswordValido, esTelefonoValido,
    esCodigoServicio, esReferenciaCita
  };
}
