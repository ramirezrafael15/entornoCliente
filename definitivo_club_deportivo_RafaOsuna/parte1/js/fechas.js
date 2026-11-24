"use strict";

function numeroDia(fecha) {
  return fecha.getFullYear() * 10000 + (fecha.getMonth() + 1) * 100 + fecha.getDate();
}

function numeroDiaDesdeTexto(valor) {
  const partes = valor.split("-");
  if (partes.length !== 3 || partes[0].length !== 4) return null;
  const [anio, mes, dia] = partes.map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const existe = fecha.getFullYear() === anio
    && fecha.getMonth() === mes - 1
    && fecha.getDate() === dia;
  return existe ? numeroDia(fecha) : null;
}

function errorFechaPosterior(valor, ahora = new Date()) {
  if (valor.trim() === "") return "Elige la fecha de publicación.";
  const elegido = numeroDiaDesdeTexto(valor);
  if (elegido === null) return "La fecha elegida no es válida.";
  if (elegido <= numeroDia(ahora)) {
    return "La fecha de publicación debe ser posterior a hoy (hoy no vale).";
  }
  return "";
}

function errorInstanteFuturo(valor, ahora = new Date()) {
  if (valor.trim() === "") return "Elige la fecha y la hora de la cita.";
  const instante = new Date(valor);
  if (Number.isNaN(instante.getTime())) return "La fecha y la hora no son válidas.";
  if (instante.getTime() <= ahora.getTime()) {
    return "La cita debe ser posterior al momento actual.";
  }
  return "";
}

function formatearFechaHora(valor) {
  return new Date(valor).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" });
}

function formatearDia(valor) {
  const partes = valor.split("-").map(Number);
  return new Date(partes[0], partes[1] - 1, partes[2])
    .toLocaleDateString("es-ES", { dateStyle: "long" });
}

if (typeof module !== "undefined") {
  module.exports = {
    numeroDia, numeroDiaDesdeTexto, errorFechaPosterior, errorInstanteFuturo,
    formatearFechaHora, formatearDia
  };
}
