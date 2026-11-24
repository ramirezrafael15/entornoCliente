"use strict";

function iniciarNoticias() {
  const form = document.getElementById("form-noticias");
  const estado = document.getElementById("estado-noticias");

  const campos = [
    { id: "not-titulo",
      regla: el => errorTexto(el.value, 3, 100, "el título") },
    { id: "not-contenido",
      regla: el => errorTexto(el.value, 20, 2000, "el contenido") },
    { id: "not-fecha",
      regla: el => errorFechaPosterior(el.value) },
    { id: "not-imagen",
      regla: el => errorArchivoImagen(el.files[0], "una imagen") }
  ];

  iniciarFormulario({
    form, estado, campos,
    alValidar: datos => {
      datos.set("titulo", datos.get("titulo").trim());
      datos.set("contenido", datos.get("contenido").trim());
      console.table(datosSeguros(datos, []));
      mostrarResumen(estado, "Noticia válida. Simulación: no se ha publicado nada.", [
        ["Título", datos.get("titulo")],
        ["Fecha de publicación", formatearDia(datos.get("fecha"))],
        ["Imagen", datos.get("imagen").name]
      ]);
    }
  });
}
