"use strict";

function iniciarTestimonios() {
  const form = document.getElementById("form-testimonios");
  const estado = document.getElementById("estado-testimonios");
  const texto = document.getElementById("test-texto");
  const contador = document.getElementById("contador-test-texto");
  const botonCifras = document.getElementById("boton-cifras");
  const resultadoCifras = document.getElementById("resultado-cifras");

  function actualizarContador() {
    contador.textContent = `${texto.value.length} / 500 caracteres`;
  }
  texto.addEventListener("input", actualizarContador);
  actualizarContador();

  botonCifras.addEventListener("click", () => {
    const cifras = extraerCifras(texto.value);
    resultadoCifras.textContent = `Cifras encontradas: ${JSON.stringify(cifras)}`;
  });
  texto.addEventListener("input", () => { resultadoCifras.textContent = ""; });

  const campos = [
    { id: "test-autor",
      regla: el => errorTexto(el.value, 2, 50, "el nombre del autor") },
    { id: "test-texto",
      regla: el => errorTexto(el.value, 10, 500, "el testimonio") }
  ];

  iniciarFormulario({
    form, estado, campos,
    alValidar: datos => {
      datos.set("autor", datos.get("autor").trim());
      datos.set("testimonio", datos.get("testimonio").trim());
      const publico = document.getElementById("test-publicar").checked;
      console.table(datosSeguros(datos, []));
      mostrarResumen(estado, "Testimonio válido. Simulación: no se ha guardado nada.", [
        ["Autor", datos.get("autor")],
        ["Caracteres", String(datos.get("testimonio").length)],
        ["Publicación", publico
          ? "autorizada"
          : "no autorizada: el testimonio queda privado"]
      ]);
    }
  });
}
