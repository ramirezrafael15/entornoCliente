"use strict";

function iniciarCitas() {
  const form = document.getElementById("form-citas");
  const estado = document.getElementById("estado-citas");

  const campos = [
    { id: "cita-referencia",
      regla: el => errorObligatorio(el.value, "la referencia de la cita")
        || (esReferenciaCita(el.value.trim())
          ? ""
          : "Usa CITA- o RES- seguido de cuatro cifras, por ejemplo CITA-0001.") },
    { id: "cita-socio",
      regla: el => errorOpcion(el.value, "Selecciona un socio.") },
    { id: "cita-servicio",
      regla: el => errorOpcion(el.value, "Selecciona un servicio.") },
    { id: "cita-fecha",
      regla: el => errorInstanteFuturo(el.value) },
    { id: "cita-confirmo",
      regla: el => errorCasilla(el.checked, "Confirma que has revisado los datos de la cita.") }
  ];

  iniciarFormulario({
    form, estado, campos,
    alValidar: datos => {
      datos.set("referencia", datos.get("referencia").trim());
      console.table(datosSeguros(datos, []));
      mostrarResumen(estado, "Cita válida. Reserva simulada: no se ha guardado nada.", [
        ["Referencia", datos.get("referencia")],
        ["Socio", textoOpcion(document.getElementById("cita-socio"))],
        ["Servicio", textoOpcion(document.getElementById("cita-servicio"))],
        ["Fecha y hora", formatearFechaHora(datos.get("fecha"))]
      ]);
    }
  });
}
