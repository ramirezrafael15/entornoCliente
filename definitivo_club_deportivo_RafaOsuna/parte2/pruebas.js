"use strict";

const v = require("./js/validadores.js");
const f = require("./js/fechas.js");
const fm = require("./js/formatos.js");
const t = require("./js/texto.js");

let total = 0;
let fallos = 0;
const grupos = {};
let grupoActual = "";

function grupo(nombre) {
  grupoActual = nombre;
  grupos[nombre] = { total: 0, fallos: 0 };
}

function iguales(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function probar(descripcion, funcion, entrada, esperado, repeticiones = 2) {
  for (let pasada = 1; pasada <= repeticiones; pasada++) {
    const obtenido = funcion(entrada);
    total++;
    grupos[grupoActual].total++;
    if (!iguales(obtenido, esperado)) {
      fallos++;
      grupos[grupoActual].fallos++;
      console.log(`FALLO [${grupoActual}] ${descripcion}: entrada ${JSON.stringify(entrada)}, ` +
        `esperado ${JSON.stringify(esperado)}, obtenido ${JSON.stringify(obtenido)} (pasada ${pasada})`);
    }
  }
}

const hay = mensaje => mensaje !== "";
const A = (n, c = "A") => c.repeat(n);

grupo("Nombre y normalización");
probar("normalizar espacios exteriores", t.normalizarEspacios, " Ana López ", "Ana López");
probar("normalizar espacios interiores", t.normalizarEspacios, "  Ana    López  ", "Ana López");
probar("normalizar solo espacios", t.normalizarEspacios, "     ", "");
probar("normalizar cadena vacía", t.normalizarEspacios, "", "");
probar("normalizar sin cambios", t.normalizarEspacios, "Ana López", "Ana López");
probar("« Ana López » normalizado es válido", x => fm.esNombreValido(t.normalizarEspacios(x)), " Ana López ", true);
probar("«Ana2 López» falla", x => fm.esNombreValido(t.normalizarEspacios(x)), "Ana2 López", false);
probar("límite inferior (4)", fm.esNombreValido, "Anas", true);
probar("por debajo (3)", fm.esNombreValido, "Ana", false);
probar("límite superior (50)", fm.esNombreValido, A(50), true);
probar("por encima (51)", fm.esNombreValido, A(51), false);
probar("tildes, ü y ñ", fm.esNombreValido, "Núñez Güell", true);
probar("mayúscula con tilde", fm.esNombreValido, "José Ángel", true);
probar("guion no admitido", fm.esNombreValido, "Ana-María", false);
probar("apóstrofo no admitido", fm.esNombreValido, "Ana O'Neil", false);
probar("dos espacios sin normalizar", fm.esNombreValido, "Ana  López", false);
probar("tabulador no es espacio ASCII", fm.esNombreValido, "Ana\tLópez", false);
probar("espacio exterior sin normalizar", fm.esNombreValido, " Ana López", false);
probar("letra con tilde no admitida (ç)", fm.esNombreValido, "Ana Françoise", false);

grupo("Usuario");
probar("ana77 válido", fm.esUsuarioValido, "ana77", true);
probar("7ana7 inválido (empieza por cifra)", fm.esUsuarioValido, "7ana7", false);
probar("ana_7 inválido (guion bajo)", fm.esUsuarioValido, "ana_7", false);
probar("4 caracteres inválido", fm.esUsuarioValido, "ana7", false);
probar("5 caracteres válido", fm.esUsuarioValido, "Ana77", true);
probar("20 caracteres válido", fm.esUsuarioValido, A(20, "a"), true);
probar("21 caracteres inválido", fm.esUsuarioValido, A(21, "a"), false);
probar("tilde inválida", fm.esUsuarioValido, "añadir", false);
probar("espacio inválido", fm.esUsuarioValido, "Ana 77", false);
probar("mayúsculas permitidas", fm.esUsuarioValido, "ANA77", true);
probar("cadena vacía", fm.esUsuarioValido, "", false);

grupo("Contraseña");
probar("Clave_12 válida", fm.esPasswordValido, "Clave_12", true);
probar("1Clave_2 inválida (empieza por cifra)", fm.esPasswordValido, "1Clave_2", false);
probar("Clave-12 inválida (guion)", fm.esPasswordValido, "Clave-12", false);
probar("7 caracteres inválida", fm.esPasswordValido, "Clave_1", false);
probar("8 caracteres válida", fm.esPasswordValido, "Abcdefgh", true);
probar("16 caracteres válida", fm.esPasswordValido, "A" + A(15, "b"), true);
probar("17 caracteres inválida", fm.esPasswordValido, "A" + A(16, "b"), false);
probar("espacio inválido", fm.esPasswordValido, "Clave 12", false);
probar("tilde inválida", fm.esPasswordValido, "Clavé_12", false);
probar("no se recorta: espacio exterior inválido", fm.esPasswordValido, " Clave_12", false);

grupo("Teléfono");
probar("correcto", fm.esTelefonoValido, "+34 612 345 678", true);
probar("primera cifra 7", fm.esTelefonoValido, "+34 712 345 678", true);
probar("primera cifra 8", fm.esTelefonoValido, "+34 812 345 678", true);
probar("primera cifra 9", fm.esTelefonoValido, "+34 912 345 678", true);
probar("sin +34", fm.esTelefonoValido, "612 345 678", false);
probar("sin +", fm.esTelefonoValido, "34 612 345 678", false);
probar("sin espacios", fm.esTelefonoValido, "+34612345678", false);
probar("primera cifra nacional 5", fm.esTelefonoValido, "+34 512 345 678", false);
probar("una cifra de más", fm.esTelefonoValido, "+34 612 345 6789", false);
probar("una cifra de menos", fm.esTelefonoValido, "+34 612 345 67", false);
probar("guiones en vez de espacios", fm.esTelefonoValido, "+34 612-345-678", false);
probar("doble espacio interior", fm.esTelefonoValido, "+34  612 345 678", false);
probar("trim en los extremos", fm.esTelefonoValido, "  +34 612 345 678  ", true);
probar("texto antes", fm.esTelefonoValido, "tel +34 612 345 678", false);
probar("texto después", fm.esTelefonoValido, "+34 612 345 678 ext", false);
probar("cadena vacía", fm.esTelefonoValido, "", false);

grupo("Código de servicio y referencia de cita");
probar("DEP-007 válido", fm.esCodigoServicio, "DEP-007", true);
probar("DEP-000 válido", fm.esCodigoServicio, "DEP-000", true);
probar("dep-007 inválido", fm.esCodigoServicio, "dep-007", false);
probar("DEP-07 inválido", fm.esCodigoServicio, "DEP-07", false);
probar("XDEP-007 inválido", fm.esCodigoServicio, "XDEP-007", false);
probar("DEP-0070 inválido", fm.esCodigoServicio, "DEP-0070", false);
probar("DEP-007X inválido", fm.esCodigoServicio, "DEP-007X", false);
probar("espacio exterior inválido (sin trim)", fm.esCodigoServicio, " DEP-007", false);
probar("cadena vacía", fm.esCodigoServicio, "", false);
probar("CITA-0001 válida", fm.esReferenciaCita, "CITA-0001", true);
probar("RES-0001 válida", fm.esReferenciaCita, "RES-0001", true);
probar("dep-007 no es referencia", fm.esReferenciaCita, "dep-007", false);
probar("XCITA-0001 inválida", fm.esReferenciaCita, "XCITA-0001", false);
probar("RES-001 inválida", fm.esReferenciaCita, "RES-001", false);
probar("CITA-001 inválida", fm.esReferenciaCita, "CITA-001", false);
probar("CITA-00012 inválida", fm.esReferenciaCita, "CITA-00012", false);
probar("minúsculas inválida", fm.esReferenciaCita, "cita-0001", false);
probar("ambas alternativas juntas", fm.esReferenciaCita, "CITA-0001RES-0002", false);
probar("espacio final inválido", fm.esReferenciaCita, "RES-0001 ", false);

grupo("Métodos de texto");
probar("extraer cifras del enunciado", t.extraerCifras, "Hay 12 clases y 3 pistas", ["12", "3"]);
probar("texto sin cifras devuelve []", t.extraerCifras, "Sin cifras aquí", []);
probar("cadena vacía devuelve []", t.extraerCifras, "", []);
probar("cifras pegadas a letras", t.extraerCifras, "a1b22c333", ["1", "22", "333"]);
probar("etiquetas con una vacía en medio", t.separarEtiquetas, "club, salud, , verano", ["club", "salud", "verano"]);
probar("etiquetas vacías producen []", t.separarEtiquetas, "", []);
probar("solo comas y espacios producen []", t.separarEtiquetas, "  ,  , ", []);
probar("espacios y comas sobrantes", t.separarEtiquetas, " a ,b,, c ", ["a", "b", "c"]);
probar("una sola etiqueta", t.separarEtiquetas, "uno", ["uno"]);
probar("comas seguidas", t.separarEtiquetas, "club,,salud", ["club", "salud"]);

grupo("Reglas de la parte 1");
const edad = (texto) => v.errorEdad(texto, texto === "" ? NaN : Number(texto));
probar("edad vacía", x => hay(edad(x)), "", true);
probar("edad 17", x => hay(edad(x)), "17", true);
probar("edad 18", x => hay(edad(x)), "18", false);
probar("edad 18.5", x => hay(edad(x)), "18.5", true);
probar("edad 100", x => hay(edad(x)), "100", false);
probar("edad 101", x => hay(edad(x)), "101", true);
const duracion = (texto) => v.errorDuracion(texto, texto === "" ? NaN : Number(texto));
probar("duración vacía (no es cero)", x => hay(duracion(x)), "", true);
probar("duración 0", x => hay(duracion(x)), "0", true);
probar("duración 14", x => hay(duracion(x)), "14", true);
probar("duración 15", x => hay(duracion(x)), "15", false);
probar("duración 20", x => hay(duracion(x)), "20", true);
probar("duración 30", x => hay(duracion(x)), "30", false);
const precio = (texto) => v.errorPrecio(texto, texto === "" ? NaN : Number(texto));
probar("precio vacío", x => hay(precio(x)), "", true);
probar("precio negativo", x => hay(precio(x)), "-1", true);
probar("precio 0", x => hay(precio(x)), "0", false);
probar("precio 12.34", x => hay(precio(x)), "12.34", false);
probar("precio 9999.99", x => hay(precio(x)), "9999.99", false);
probar("precio 10000", x => hay(precio(x)), "10000", true);
probar("precio con tres decimales", x => hay(precio(x)), "12.345", true);
probar("precio 1.005 (tres decimales)", x => hay(precio(x)), "1.005", true);
probar("precio 0.1 (un decimal)", x => hay(precio(x)), "0.1", false);
const jpg = bytes => ({ type: "image/jpeg", size: bytes });
probar("imagen: sin archivo", x => hay(v.errorArchivoImagen(x, "una imagen")), undefined, true);
probar("imagen: PNG", x => hay(v.errorArchivoImagen(x, "una imagen")), { type: "image/png", size: 100 }, true);
probar("imagen: tipo vacío", x => hay(v.errorArchivoImagen(x, "una imagen")), { type: "", size: 100 }, true);
probar("imagen: JPEG 5.000.000 (límite)", x => hay(v.errorArchivoImagen(x, "una imagen")), jpg(5000000), false);
probar("imagen: JPEG 5.000.001", x => hay(v.errorArchivoImagen(x, "una imagen")), jpg(5000001), true);
probar("contraseña de 7", x => hay(v.errorContrasena(x)), A(7), true);
probar("contraseña de 8", x => hay(v.errorContrasena(x)), A(8), false);
probar("contraseña de 16", x => hay(v.errorContrasena(x)), A(16), false);
probar("contraseña de 17", x => hay(v.errorContrasena(x)), A(17), true);
probar("contraseña con espacios cuenta", x => hay(v.errorContrasena(x)), "        ", false);
probar("confirmación igual", x => hay(v.errorConfirmacion("Clave_12", x)), "Clave_12", false);
probar("confirmación distinta", x => hay(v.errorConfirmacion("Clave_12", x)), "Clave_13", true);
probar("confirmación vacía", x => hay(v.errorConfirmacion("Clave_12", x)), "", true);
probar("solo espacios no es texto", x => hay(v.errorTexto(x, 3, 50, "el nombre")), "     ", true);
probar("texto de 3 con espacios alrededor", x => hay(v.errorTexto(x, 4, 50, "el nombre")), "  Ana  ", true);

grupo("Fechas");
const tarde = new Date(2026, 10, 23, 23, 59, 59);
const madrugada = new Date(2026, 10, 23, 0, 0, 1);
probar("noticia ayer (23:59)", x => hay(f.errorFechaPosterior(x, tarde)), "2026-11-22", true);
probar("noticia hoy a las 23:59", x => hay(f.errorFechaPosterior(x, tarde)), "2026-11-23", true);
probar("noticia mañana a las 23:59", x => hay(f.errorFechaPosterior(x, tarde)), "2026-11-24", false);
probar("noticia hoy a las 00:00:01", x => hay(f.errorFechaPosterior(x, madrugada)), "2026-11-23", true);
probar("noticia mañana a las 00:00:01", x => hay(f.errorFechaPosterior(x, madrugada)), "2026-11-24", false);
probar("noticia fecha inexistente", x => hay(f.errorFechaPosterior(x, tarde)), "2026-02-30", true);
probar("noticia vacía", x => hay(f.errorFechaPosterior(x, tarde)), "", true);
probar("noticia cambio de año", x => hay(f.errorFechaPosterior(x, new Date(2026, 11, 31, 12, 0))), "2027-01-01", false);
const diez = new Date(2026, 10, 23, 10, 0, 0);
probar("cita un minuto antes", x => hay(f.errorInstanteFuturo(x, diez)), "2026-11-23T09:59", true);
probar("cita exactamente ahora (no vale)", x => hay(f.errorInstanteFuturo(x, diez)), "2026-11-23T10:00", true);
probar("cita un minuto después", x => hay(f.errorInstanteFuturo(x, diez)), "2026-11-23T10:01", false);
probar("cita de ayer", x => hay(f.errorInstanteFuturo(x, diez)), "2026-11-22T10:00", true);
probar("cita vacía", x => hay(f.errorInstanteFuturo(x, diez)), "", true);

console.log("");
for (const [nombre, g] of Object.entries(grupos)) {
  console.log(`${g.fallos === 0 ? "OK   " : "FALLO"} ${nombre}: ${g.total - g.fallos}/${g.total}`);
}
console.log(`\n${total} comprobaciones, ${fallos} fallos`);
process.exitCode = fallos === 0 ? 0 : 1;
