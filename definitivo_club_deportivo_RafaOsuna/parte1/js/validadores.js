"use strict";

const MAX_IMAGEN_BYTES = 5_000_000;
const TIPO_IMAGEN = "image/jpeg";

function mayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function errorObligatorio(valor, descripcion) {
  if (valor === "") return `Escribe ${descripcion}.`;
  if (valor.trim() === "") {
    return `${mayuscula(descripcion)} no puede ser solo espacios.`;
  }
  return "";
}

function errorTexto(valor, min, max, descripcion) {
  const vacio = errorObligatorio(valor, descripcion);
  if (vacio) return vacio;
  const longitud = valor.trim().length;
  if (longitud < min || longitud > max) {
    return `Escribe ${descripcion} de ${min} a ${max} caracteres (ahora tiene ${longitud}).`;
  }
  return "";
}

function errorCorreo(valor, formatoIncorrecto) {
  const vacio = errorObligatorio(valor, "el correo electrónico");
  if (vacio) return vacio;
  if (formatoIncorrecto) {
    return "Escribe un correo con formato válido, por ejemplo nombre@ejemplo.com.";
  }
  return "";
}

function errorEdad(texto, numero) {
  if (texto.trim() === "") return "Escribe la edad.";
  if (!Number.isInteger(numero)) {
    return "La edad debe ser un número entero, sin decimales.";
  }
  if (numero < 18 || numero > 100) {
    return "La edad debe estar entre 18 y 100 años.";
  }
  return "";
}

function errorDuracion(texto, numero) {
  if (texto.trim() === "") return "Escribe la duración en minutos.";
  if (!Number.isInteger(numero)) {
    return "La duración debe ser un número entero de minutos.";
  }
  if (numero < 15) return "La duración mínima es de 15 minutos.";
  if (numero % 15 !== 0) {
    return "La duración debe ser múltiplo de 15 (15, 30, 45...).";
  }
  return "";
}

function tieneComoMaximoDosDecimales(numero) {
  const centimos = numero * 100;
  return Math.abs(centimos - Math.round(centimos)) < 1e-6;
}

function errorPrecio(texto, numero) {
  if (texto.trim() === "") return "Escribe el precio.";
  if (!Number.isFinite(numero)) return "El precio debe ser un número.";
  if (numero < 0 || numero > 9999.99) {
    return "El precio debe estar entre 0 y 9999,99.";
  }
  if (!tieneComoMaximoDosDecimales(numero)) {
    return "El precio admite como máximo dos decimales.";
  }
  return "";
}

function errorModalidad(valorElegido) {
  return valorElegido === "" ? "Elige una modalidad: mensual o anual." : "";
}

function errorOpcion(valor, mensaje) {
  return valor === "" ? mensaje : "";
}

function errorCasilla(marcada, mensaje) {
  return marcada ? "" : mensaje;
}

function errorContrasena(valor) {
  if (valor === "") return "Escribe una contraseña.";
  if (valor.length < 8 || valor.length > 16) {
    return `La contraseña debe tener de 8 a 16 caracteres (ahora tiene ${valor.length}).`;
  }
  return "";
}

function errorConfirmacion(contrasena, confirmacion) {
  if (confirmacion === "") return "Repite la contraseña.";
  if (confirmacion !== contrasena) return "Las contraseñas no coinciden.";
  return "";
}

function errorArchivoImagen(archivo, descripcion) {
  if (!archivo) return `Selecciona ${descripcion}.`;
  if (archivo.type !== TIPO_IMAGEN) {
    const tipo = archivo.type === "" ? "desconocido" : archivo.type;
    return `${mayuscula(descripcion)} debe ser JPEG (image/jpeg). El archivo es de tipo ${tipo}.`;
  }
  if (archivo.size > MAX_IMAGEN_BYTES) {
    return `${mayuscula(descripcion)} no puede superar 5.000.000 bytes (el archivo tiene ${archivo.size}).`;
  }
  return "";
}

if (typeof module !== "undefined") {
  module.exports = {
    errorObligatorio, errorTexto, errorCorreo, errorEdad, errorDuracion,
    tieneComoMaximoDosDecimales, errorPrecio, errorModalidad, errorOpcion,
    errorCasilla, errorContrasena, errorConfirmacion, errorArchivoImagen,
    MAX_IMAGEN_BYTES, TIPO_IMAGEN
  };
}
