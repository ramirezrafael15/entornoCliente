"use strict";

function iniciarCitas() {
  const form = document.getElementById("form-citas");
  const estado = document.getElementById("estado-citas");

  const campos = [
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
      console.table(datosSeguros(datos, []));
      mostrarResumen(estado, "Cita válida. Reserva simulada: no se ha guardado nada.", [
        ["Socio", textoOpcion(document.getElementById("cita-socio"))],
        ["Servicio", textoOpcion(document.getElementById("cita-servicio"))],
        ["Fecha y hora", formatearFechaHora(datos.get("fecha"))]
      ]);
    }
  });
}
