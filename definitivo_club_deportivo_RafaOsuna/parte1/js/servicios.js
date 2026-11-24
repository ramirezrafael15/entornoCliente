"use strict";

function iniciarServicios() {
  const form = document.getElementById("form-servicios");
  const estado = document.getElementById("estado-servicios");

  const campos = [
    { id: "serv-nombre",
      regla: el => errorTexto(el.value, 3, 50, "el nombre del servicio") },
    { id: "serv-duracion",
      regla: el => el.validity.badInput
        ? "La duración debe ser un número."
        : errorDuracion(el.value, el.valueAsNumber) },
    { id: "serv-precio",
      regla: el => {
        if (el.validity.badInput) return "El precio debe ser un número.";
        const mensaje = errorPrecio(el.value, el.valueAsNumber);
        if (mensaje) return mensaje;
        return el.validity.stepMismatch
          ? "El precio admite como máximo dos decimales." : "";
      } },
    { id: "serv-categoria",
      regla: el => errorOpcion(el.value, "Selecciona una categoría.") }
  ];

  iniciarFormulario({
    form, estado, campos,
    alValidar: datos => {
      datos.set("nombre", datos.get("nombre").trim());
      console.table(datosSeguros(datos, []));
      mostrarResumen(estado, "Datos válidos. Servicio simulado: no se ha guardado nada.", [
        ["Servicio", datos.get("nombre")],
        ["Duración", `${datos.get("duracion")} minutos`],
        ["Precio", `${datos.get("precio")} €`],
        ["Categoría", textoOpcion(document.getElementById("serv-categoria"))]
      ]);
    }
  });
}
