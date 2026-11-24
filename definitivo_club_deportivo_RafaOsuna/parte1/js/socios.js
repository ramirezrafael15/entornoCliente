"use strict";

function iniciarSocios() {
  const form = document.getElementById("form-socios");
  const estado = document.getElementById("estado-socios");
  const contrasena = document.getElementById("socio-contrasena");
  const etiquetasModalidad = { mensual: "Mensual", anual: "Anual" };

  const campos = [
    { id: "socio-nombre",
      regla: el => errorTexto(el.value, 4, 50, "el nombre completo") },
    { id: "socio-usuario",
      regla: el => errorTexto(el.value, 5, 20, "el usuario") },
    { id: "socio-correo",
      regla: el => errorCorreo(el.value, el.validity.typeMismatch) },
    { id: "socio-edad",
      regla: el => el.validity.badInput
        ? "La edad debe ser un número."
        : errorEdad(el.value, el.valueAsNumber) },
    { id: "socio-modalidad",
      regla: () => errorModalidad(valorRadio(form, "modalidad")) },
    { id: "socio-contrasena",
      regla: el => errorContrasena(el.value),
      revalida: ["socio-confirmacion"] },
    { id: "socio-confirmacion",
      regla: el => errorConfirmacion(contrasena.value, el.value) },
    { id: "socio-telefono",
      regla: el => errorObligatorio(el.value, "el teléfono") },
    { id: "socio-foto",
      regla: el => errorArchivoImagen(el.files[0], "una foto de perfil") },
    { id: "socio-condiciones",
      regla: el => errorCasilla(el.checked, "Debes aceptar las condiciones.") }
  ];

  iniciarFormulario({
    form, estado, campos,
    alValidar: datos => {
      datos.set("nombre", datos.get("nombre").trim());
      datos.set("usuario", datos.get("usuario").trim());
      datos.set("telefono", datos.get("telefono").trim());
      console.table(datosSeguros(datos, ["contrasena", "confirmacion"]));
      mostrarResumen(estado, "Datos válidos. Alta simulada: no se ha guardado nada.", [
        ["Nombre", datos.get("nombre")],
        ["Usuario", datos.get("usuario")],
        ["Modalidad", etiquetasModalidad[datos.get("modalidad")]]
      ]);
    }
  });
}
