# Pruebas · Parte 2 (expresiones regulares)

Hay dos tipos de pruebas.

1. **`pruebas.js`**: comprobaciones automáticas de los validadores, sin navegador. Se ejecuta con `node pruebas.js` dentro de `parte2`. Cada comprobación se hace dos veces seguidas por si hay problemas de estado (`lastIndex`).
2. **Integración en el navegador**: las tablas de más abajo. Las hice el 23/11/2026 en Chrome, con `index.html` y `demo-pattern.html`. Incluyen los casos principales de la parte 1 repetidos sobre la versión ampliada.

## 1. Resultado de `pruebas.js`

```
OK    Nombre y normalización: 38/38
OK    Usuario: 22/22
OK    Contraseña: 20/20
OK    Teléfono: 32/32
OK    Código de servicio y referencia de cita: 38/38
OK    Métodos de texto: 20/20
OK    Reglas de la parte 1: 72/72
OK    Fechas: 26/26

268 comprobaciones, 0 fallos
```

Los casos que exige el enunciado están dentro de esos grupos: «Ana López» normalizado y «Ana2 López» (nombre), ana77 / 7ana7 / ana_7 (usuario), Clave_12 / 1Clave_2 / Clave-12 (contraseña), teléfono sin +, sin espacios, con primera cifra 5 y con una cifra de más, DEP-007 / CITA-0001 válidos y dep-007 / XCITA-0001 / RES-001 inválidos, «Hay 12 clases y 3 pistas» → ["12", "3"], y las etiquetas con comas y espacios sobrantes.

## 2. Comparación entre `pattern` y la validación en JavaScript

Resultados de `demo-pattern.html` con el código DEP-007:

| Entrada | Nativa (required + pattern) | JavaScript (`esCodigoServicio`) | ¿Coinciden? |
|---|---|---|---|
| «» | inválido (valueMissing) | inválido | sí |
| «DEP-007» | válido | válido | sí |
| «DEP-007x» | inválido (patternMismatch) | inválido | sí |
| «XDEP-007» | inválido (patternMismatch) | inválido | sí |
| «dep-007» | inválido (patternMismatch) | inválido | sí |
| « DEP-007 » | inválido (patternMismatch) | inválido | sí |
| (vacío) en un campo **sin** required | válido | inválido | no |

Lo que se ve en la tabla:

- **Vacío:** con `required` el navegador lo rechaza (valueMissing). Sin `required`, `pattern` deja pasar el vacío; por eso `pattern` no sustituye a `required`.
- **Código correcto:** los dos lo aceptan.
- **Texto adicional (DEP-007x, XDEP-007):** los dos lo rechazan. `pattern` exige coincidencia con todo el valor aunque no lleve `^` ni `$`.
- **Espacios en los extremos:** ninguno de los dos los recorta aquí. En los formularios principales sí se aplica `trim()` antes de comprobar el código.
- `pattern` no puede comprobar el tamaño de un archivo, la edad ni si una fecha es futura: esas reglas necesitan JavaScript.

## 3. Integración en el navegador

**Resultado:** 168 de 168 casos pasan (incluye los de la parte 1 repetidos sobre esta versión).

En los casos «por encima del máximo» pongo el valor por código, porque `maxlength` no deja escribirlo con el teclado.

### 1. Obligatoriedad y textos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 1 | Al abrir la página | Sin interacción | Ningún mensaje de error visible ni aria-invalid=true | 0 mensajes, 0 campos marcados | Sí | — |
| 2 | Socios: formulario vacío | Todos los campos sin rellenar, se pulsa Comprobar | 10 errores y el foco en el nombre | 10 errores; foco en socio-nombre | Sí | — |
| 3 | Servicios, testimonios, noticias y citas vacíos | Cada formulario sin rellenar | 4 + 2 + 4 + 4 errores y foco en el primer campo | servicios: 5 errores, foco serv-nombre; testimonios: 2 errores, foco test-autor; noticias: 4 errores, foco not-titulo; citas: 5 errores, foco cita-referencia | Sí | — |
| 4 | Nombre completo: solo espacios | 5 espacios | Error que menciona «solo espacios» | Error: «El nombre completo no puede ser solo espacios.» | Sí | — |
| 5 | Nombre completo: justo por debajo (3) | «AAA» | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).» | Sí | — |
| 6 | Nombre completo: límite inferior (4) | «AAAA» | Sin error | Sin error | Sí | — |
| 7 | Nombre completo: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 8 | Nombre completo: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 51).» | Sí | — |
| 9 | Nombre completo: 3 letras con espacios alrededor (se mide tras trim) | «  Ana  » (7 car. con espacios) | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).» | Sí | — |
| 10 | Usuario: justo por debajo (4) | «AAAA» | Error que menciona «5 a 20» | Error: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 4).» | Sí | — |
| 11 | Usuario: límite inferior (5) | «AAAAA» | Sin error | Sin error | Sí | — |
| 12 | Usuario: límite superior (20) | «AAAAAAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 13 | Usuario: por encima (21), asignado por código | «AAAAAAAAAAAAAAAAAAAAA» | Error que menciona «5 a 20» | Error: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 21).» | Sí | — |
| 14 | Usuario: solo espacios | 10 espacios | Error que menciona «solo espacios» | Error: «El usuario no puede ser solo espacios.» | Sí | — |
| 15 | Correo: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe el correo electrónico.» | Sí | — |
| 16 | Correo: sin formato de correo | «ana» | Error que menciona «formato» | Error: «Escribe un correo con formato válido, por ejemplo nombre@ejemplo.com.» | Sí | — |
| 17 | Correo: correo correcto | «ana@example.com» | Sin error | Sin error | Sí | — |
| 18 | Contraseña: justo por debajo (7) | «AAAAAAA» | Error que menciona «8 a 16» | Error: «La contraseña debe tener de 8 a 16 caracteres (ahora tiene 7).» | Sí | — |
| 19 | Contraseña: límite inferior (8) | «AAAAAAAA» | Sin error | Sin error | Sí | — |
| 20 | Contraseña: límite superior (16) | «AAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 21 | Contraseña: por encima (17), asignado por código | «AAAAAAAAAAAAAAAAA» | Error que menciona «8 a 16» | Error: «La contraseña debe tener de 8 a 16 caracteres (ahora tiene 17).» | Sí | — |
| 22 | Teléfono: solo espacios | 3 espacios | Error que menciona «solo espacios» | Error: «El teléfono no puede ser solo espacios.» | Sí | — |
| 23 | Teléfono: dato presente | «+34 612 345 678» | Sin error | Sin error | Sí | — |
| 24 | Nombre del servicio: justo por debajo (2) | «AA» | Error que menciona «3 a 50» | Error: «Escribe el nombre del servicio de 3 a 50 caracteres (ahora tiene 2).» | Sí | — |
| 25 | Nombre del servicio: límite inferior (3) | «AAA» | Sin error | Sin error | Sí | — |
| 26 | Nombre del servicio: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 27 | Nombre del servicio: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «3 a 50» | Error: «Escribe el nombre del servicio de 3 a 50 caracteres (ahora tiene 51).» | Sí | — |
| 28 | Autor: justo por debajo (1) | «A» | Error que menciona «2 a 50» | Error: «Escribe el nombre del autor de 2 a 50 caracteres (ahora tiene 1).» | Sí | — |
| 29 | Autor: límite inferior (2) | «AA» | Sin error | Sin error | Sí | — |
| 30 | Autor: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 31 | Autor: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «2 a 50» | Error: «Escribe el nombre del autor de 2 a 50 caracteres (ahora tiene 51).» | Sí | — |
| 32 | Testimonio: justo por debajo (9) | «AAAAAAAAA» | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 9).» | Sí | — |
| 33 | Testimonio: límite inferior (10) | «AAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 34 | Testimonio: límite superior (500) | AAAAAAAAAAAA… (500 car.) | Sin error | Sin error | Sí | — |
| 35 | Testimonio: por encima (501), asignado por código | AAAAAAAAAAAA… (501 car.) | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 501).» | Sí | — |
| 36 | Testimonio: 11 caracteres de los que 8 son espacios (tras trim: 3) | 8 espacios + «abc» | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 3).» | Sí | — |
| 37 | Título: justo por debajo (2) | «AA» | Error que menciona «3 a 100» | Error: «Escribe el título de 3 a 100 caracteres (ahora tiene 2).» | Sí | — |
| 38 | Título: límite inferior (3) | «AAA» | Sin error | Sin error | Sí | — |
| 39 | Título: límite superior (100) | AAAAAAAAAAAA… (100 car.) | Sin error | Sin error | Sí | — |
| 40 | Título: por encima (101), asignado por código | AAAAAAAAAAAA… (101 car.) | Error que menciona «3 a 100» | Error: «Escribe el título de 3 a 100 caracteres (ahora tiene 101).» | Sí | — |
| 41 | Contenido: justo por debajo (19) | «AAAAAAAAAAAAAAAAAAA» | Error que menciona «20 a 2000» | Error: «Escribe el contenido de 20 a 2000 caracteres (ahora tiene 19).» | Sí | — |
| 42 | Contenido: límite inferior (20) | «AAAAAAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 43 | Contenido: límite superior (2000) | AAAAAAAAAAAA… (2000 car.) | Sin error | Sin error | Sí | — |
| 44 | Contenido: por encima (2001), asignado por código | AAAAAAAAAAAA… (2001 car.) | Error que menciona «20 a 2000» | Error: «Escribe el contenido de 20 a 2000 caracteres (ahora tiene 2001).» | Sí | — |
| 45 | Testimonio: contador | Se escribe «hola» | El contador muestra 4 / 500 caracteres | «4 / 500 caracteres» | Sí | — |

### 2. Números

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 46 | Edad: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe la edad.» | Sí | — |
| 47 | Edad: 17 | 17 | Error que menciona «18 y 100» | Error: «La edad debe estar entre 18 y 100 años.» | Sí | — |
| 48 | Edad: 18 | 18 | Sin error | Sin error | Sí | — |
| 49 | Edad: 18.5 | 18.5 | Error que menciona «entero» | Error: «La edad debe ser un número entero, sin decimales.» | Sí | — |
| 50 | Edad: 100 | 100 | Sin error | Sin error | Sí | — |
| 51 | Edad: 101 | 101 | Error que menciona «18 y 100» | Error: «La edad debe estar entre 18 y 100 años.» | Sí | — |
| 52 | Duración: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe la duración en minutos.» | Sí | — |
| 53 | Duración: 0 | 0 | Error que menciona «mínima» | Error: «La duración mínima es de 15 minutos.» | Sí | — |
| 54 | Duración: 14 | 14 | Error que menciona «mínima» | Error: «La duración mínima es de 15 minutos.» | Sí | — |
| 55 | Duración: 15 | 15 | Sin error | Sin error | Sí | — |
| 56 | Duración: 20 | 20 | Error que menciona «múltiplo» | Error: «La duración debe ser múltiplo de 15 (15, 30, 45...).» | Sí | — |
| 57 | Duración: 30 | 30 | Sin error | Sin error | Sí | — |
| 58 | Duración: 15.5 | 15.5 | Error que menciona «entero» | Error: «La duración debe ser un número entero de minutos.» | Sí | — |
| 59 | Precio: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe el precio.» | Sí | — |
| 60 | Precio: -1 | -1 | Error que menciona «entre 0 y 9999» | Error: «El precio debe estar entre 0 y 9999,99.» | Sí | — |
| 61 | Precio: 0 | 0 | Sin error | Sin error | Sí | — |
| 62 | Precio: 12.34 | 12.34 | Sin error | Sin error | Sí | — |
| 63 | Precio: 9999.99 | 9999.99 | Sin error | Sin error | Sí | — |
| 64 | Precio: 10000 | 10000 | Error que menciona «entre 0 y 9999» | Error: «El precio debe estar entre 0 y 9999,99.» | Sí | — |
| 65 | Precio: 12.345 | 12.345 | Error que menciona «dos decimales» | Error: «El precio admite como máximo dos decimales.» | Sí | — |
| 66 | Precio: 1.005 | 1.005 | Error que menciona «dos decimales» | Error: «El precio admite como máximo dos decimales.» | Sí | — |

### 3. Archivos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 67 | Foto de perfil: Sin archivo | (ningún archivo) | Error que menciona «Selecciona» | Error: «Selecciona una foto de perfil.» | Sí | — |
| 68 | Foto de perfil: PNG | imagen.png, tipo image/png, 2048 bytes | Error que menciona «JPEG» | Error: «Una foto de perfil debe ser JPEG (image/jpeg). El archivo es de tipo image/png.» | Sí | — |
| 69 | Foto de perfil: GIF | imagen.gif, tipo image/gif, 2048 bytes | Error que menciona «JPEG» | Error: «Una foto de perfil debe ser JPEG (image/jpeg). El archivo es de tipo image/gif.» | Sí | — |
| 70 | Foto de perfil: JPEG de 5.000.000 bytes (límite) | limite.jpg, tipo image/jpeg, 5000000 bytes | Sin error | Sin error | Sí | — |
| 71 | Foto de perfil: JPEG de 5.000.001 bytes (supera el límite) | grande.jpg, tipo image/jpeg, 5000001 bytes | Error que menciona «5.000.000» | Error: «Una foto de perfil no puede superar 5.000.000 bytes (el archivo tiene 5000001).» | Sí | — |
| 72 | Imagen de noticia: Sin archivo | (ningún archivo) | Error que menciona «Selecciona» | Error: «Selecciona una imagen.» | Sí | — |
| 73 | Imagen de noticia: PNG | imagen.png, tipo image/png, 2048 bytes | Error que menciona «JPEG» | Error: «Una imagen debe ser JPEG (image/jpeg). El archivo es de tipo image/png.» | Sí | — |
| 74 | Imagen de noticia: GIF | imagen.gif, tipo image/gif, 2048 bytes | Error que menciona «JPEG» | Error: «Una imagen debe ser JPEG (image/jpeg). El archivo es de tipo image/gif.» | Sí | — |
| 75 | Imagen de noticia: JPEG de 5.000.000 bytes (límite) | limite.jpg, tipo image/jpeg, 5000000 bytes | Sin error | Sin error | Sí | — |
| 76 | Imagen de noticia: JPEG de 5.000.001 bytes (supera el límite) | grande.jpg, tipo image/jpeg, 5000001 bytes | Error que menciona «5.000.000» | Error: «Una imagen no puede superar 5.000.000 bytes (el archivo tiene 5000001).» | Sí | — |

### 4. Fechas y selecciones

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 77 | Fecha de noticia: ayer | ayer (2026-11-23) | Error que menciona «posterior a hoy» | Error: «La fecha de publicación debe ser posterior a hoy (hoy no vale).» | Sí | — |
| 78 | Fecha de noticia: hoy | hoy (2026-11-24) | Error que menciona «posterior a hoy» | Error: «La fecha de publicación debe ser posterior a hoy (hoy no vale).» | Sí | — |
| 79 | Fecha de noticia: mañana | mañana (2026-11-25) | Sin error | Sin error | Sí | — |
| 80 | Fecha de noticia: vacía | (vacía) | Error que menciona «Elige» | Error: «Elige la fecha de publicación.» | Sí | — |
| 81 | Fecha de cita: pasada (ayer a la misma hora) | ahora − 24 h | Error «posterior al momento actual» | Error: «La cita debe ser posterior al momento actual.» | Sí | — |
| 82 | Fecha de cita: hace unos minutos del mismo día | ahora − 2 min | Error (la hora cuenta) | Error: «La cita debe ser posterior al momento actual.» | Sí | — |
| 83 | Fecha de cita: futura | ahora + 24 h | Sin error | Sin error | Sí | — |
| 84 | Fecha de cita: vacía | (vacía) | Error «Elige» | Error: «Elige la fecha y la hora de la cita.» | Sí | — |
| 85 | Cita: cita que pasa a ser pasada tras abrir el formulario | Se abre el reloj a las 10:00; se elige las 10:05; se espera 10 min y se envía | Error al enviar, aunque al elegirla era futura | Error: «La cita debe ser posterior al momento actual.» | Sí | — |
| 86 | Selects con la opción inicial | Socio, servicio, categoría sin cambiar | Error en los tres | cita-socio: «Selecciona un socio.»; cita-servicio: «Selecciona un servicio.»; serv-categoria: «Selecciona una categoría.» | Sí | — |
| 87 | Selects: se elige una opción | Socio «Marcos Ejemplo», servicio «Natación», categoría «Piscina» | Sin error | cita-socio: sin error; cita-servicio: sin error; serv-categoria: sin error | Sí | — |
| 88 | Condiciones y confirmación sin marcar | Casillas sin marcar | Error en socio-condiciones y cita-confirmo | socio-condiciones: «Debes aceptar las condiciones.»; cita-confirmo: «Confirma que has revisado los datos de la cita.» | Sí | — |
| 89 | Condiciones y confirmación marcadas | Casillas marcadas | Sin error | socio-condiciones: sin error; cita-confirmo: sin error | Sí | — |
| 90 | Modalidad sin elegir y elegida | Sin radio; luego «Mensual» | Error y después sin error | Antes: «Elige una modalidad: mensual o anual.»; después de elegir: sin error | Sí | — |
| 91 | Noticia con hoy en la zona Pacific/Kiritimati | El día local de esa zona (distinto del día UTC durante parte del día) | «Hoy» sigue siendo inválido y «mañana» válido | hoy local 2026-11-24 (UTC 2026-11-24): error; mañana 2026-11-25: sin error | Sí | — |
| 92 | Noticia con hoy en la zona Pacific/Pago_Pago | El día local de esa zona (distinto del día UTC durante parte del día) | «Hoy» sigue siendo inválido y «mañana» válido | hoy local 2026-11-23 (UTC 2026-11-24): error; mañana 2026-11-24: sin error | Sí | — |

### 5. Errores y eventos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 93 | Escribir antes del primer envío | Se escribe «ab» en el usuario sin enviar | No aparece ningún error todavía | Sin error | Sí | — |
| 94 | Varios campos incorrectos a la vez y corrección posterior | Envío con nombre «Ana» y usuario «ab»; luego se corrige solo el nombre sin volver a enviar | Ambos errores a la vez; al corregir el nombre solo desaparece el suyo | Antes → socio-nombre: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).»; socio-usuario: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 2).». Después → socio-nombre: sin error; socio-usuario: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 2).» | Sí | — |
| 95 | Foco en el primer campo incorrecto | Todo correcto salvo el correo y la edad | El foco va al correo (el primero en el formulario) | foco en socio-correo | Sí | — |
| 96 | Envío con Intro | Formulario de servicios válido; se pulsa Intro en el campo nombre | Aparece la confirmación sin hacer clic | «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Código: DEP-007 Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar» | Sí | — |
| 97 | Cambio de contraseña tras confirmarla | Tras un envío fallido: contraseña y confirmación «Clave_123»; luego la contraseña pasa a «Clave_1234» | El error de confirmación aparece al cambiar la contraseña, sin tocar la confirmación | Confirmación antes: sin error; después: «Las contraseñas no coinciden.» | Sí | — |
| 98 | Contraseña con espacios: no se recortan | Contraseña «  abcdef  » (10 car.) y confirmación igual; luego confirmación «abcdef» sin espacios | Con espacios iguales no hay error; recortada no coincide | Iguales: La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.; recortada: «Las contraseñas no coinciden.» | Sí | — |
| 99 | Cambio de datos tras una confirmación válida | Servicio válido y confirmado; después se edita el precio | La confirmación desaparece al editar | Antes: «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Código: DEP-007 Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar»; después de editar: «» | Sí | — |
| 100 | Error corregido y nuevo error | Tras un envío fallido, el precio pasa de «12.345» a «12.34» y vuelve a «-5» | Error, luego sin error, luego error | error → sin error → error | Sí | — |
| 101 | Texto con etiquetas HTML | Nombre del servicio «<b>Yoga</b><img src=x onerror=alert(1)>» | Se muestra como texto; no se crea ningún <b> ni <img> en la confirmación | 0 nodos b/img; texto literal presente: true; alert: false | Sí | — |

### 6. Formularios completos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 102 | Socio válido | Nombre «  Marta Ruiz  » (con espacios), usuario laura77, edad 25, modalidad anual, JPEG 2048 bytes, condiciones | Resumen con nombre «Marta Ruiz», usuario y modalidad; sin contraseña | «Datos válidos. Alta simulada: no se ha guardado nada. Nombre: Marta Ruiz Usuario: laura77 Modalidad: Anual» | Sí | — |
| 103 | Socio válido: nada sensible en la consola | Mismo envío válido | Ni la contraseña ni el contenido del archivo aparecen en la consola | contraseña en consola: false; usuario en consola: true | Sí | — |
| 104 | Servicio válido | Yoga suave, 30 min, 12.50, bienestar | Resumen con servicio, duración, precio y categoría | «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Código: DEP-007 Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar» | Sí | — |
| 105 | Testimonio válido sin marcar publicación | Autor Marta Ruiz, 34 caracteres, sin marcar «Autorizo su publicación» | Válido e indica que queda privado | «Testimonio válido. Simulación: no se ha guardado nada. Autor: Marta Ruiz Caracteres: 34 Publicación: no autorizada: el testimonio queda privado» | Sí | — |
| 106 | Testimonio válido con publicación | Igual, con la casilla marcada | Válido e indica publicación autorizada | «Testimonio válido. Simulación: no se ha guardado nada. Autor: Marta Ruiz Caracteres: 34 Publicación: autorizada» | Sí | — |
| 107 | Noticia válida | Título, contenido, fecha de mañana, JPEG 4096 bytes | Resumen con título, fecha e imagen | «Noticia válida. Simulación: no se ha publicado nada. Título: Nuevo horario Fecha de publicación: 25 de noviembre de 2026 Imagen: portada.jpg Etiquetas: ninguna» | Sí | — |
| 108 | Cita válida | Socio Marcos Ejemplo, servicio Natación, mañana a la misma hora, casilla marcada | Resumen con socio, servicio y fecha | «Cita válida. Reserva simulada: no se ha guardado nada. Referencia: CITA-0001 Socio: Marcos Ejemplo Servicio: Natación Fecha y hora: 25 de noviembre de 2026 a las 9:48» | Sí | — |

### 7. Parte 2: formatos, texto e integración

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 109 | Nombre «  Ana López  » (espacios exteriores) | «  Ana López  » | Válido; el resumen muestra «Ana López» | «Datos válidos. Alta simulada: no se ha guardado nada. Nombre: Ana López Usuario: laura77 Modalidad: Anual» | Sí | — |
| 110 | Nombre con espacios interiores de más | «Marta    Ruiz» (4 espacios) | Válido tras normalizar; el resumen muestra «Marta Ruiz» | «Datos válidos. Alta simulada: no se ha guardado nada. Nombre: Marta Ruiz Usuario: laura77 Modalidad: Anual» | Sí | — |
| 111 | Nombre completo: con número | «Ana2 López» | Error que menciona «solo letras» | Error: «Usa solo letras (con tildes, ü y ñ) y un único espacio entre palabras.» | Sí | — |
| 112 | Nombre completo: con guion | «Ana-María López» | Error que menciona «solo letras» | Error: «Usa solo letras (con tildes, ü y ñ) y un único espacio entre palabras.» | Sí | — |
| 113 | Nombre completo: con apóstrofo | «Ana O'Neil» | Error que menciona «solo letras» | Error: «Usa solo letras (con tildes, ü y ñ) y un único espacio entre palabras.» | Sí | — |
| 114 | Nombre completo: con ñ, ü y tilde | «Núñez Güell» | Sin error | Sin error | Sí | — |
| 115 | Nombre completo: formato correcto pero 3 letras: no se salta la longitud | «Ana» | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).» | Sí | — |
| 116 | Usuario: ana77 | «ana77» | Sin error | Sin error | Sí | — |
| 117 | Usuario: ana77 (repetida) | «ana77» | Sin error | Sin error | Sí | — |
| 118 | Usuario: 7ana7 | «7ana7» | Error que menciona «empieza por una letra» | Error: «El usuario empieza por una letra y lleva solo letras sin tilde y cifras.» | Sí | — |
| 119 | Usuario: 7ana7 (repetida) | «7ana7» | Error que menciona «empieza por una letra» | Error: «El usuario empieza por una letra y lleva solo letras sin tilde y cifras.» | Sí | — |
| 120 | Usuario: ana_7 | «ana_7» | Error que menciona «empieza por una letra» | Error: «El usuario empieza por una letra y lleva solo letras sin tilde y cifras.» | Sí | — |
| 121 | Usuario: ana_7 (repetida) | «ana_7» | Error que menciona «empieza por una letra» | Error: «El usuario empieza por una letra y lleva solo letras sin tilde y cifras.» | Sí | — |
| 122 | Usuario: con tilde | «añadir» | Error que menciona «sin tilde» | Error: «El usuario empieza por una letra y lleva solo letras sin tilde y cifras.» | Sí | — |
| 123 | Contraseña: Clave_12 | «Clave_12» | Sin error | Sin error | Sí | — |
| 124 | Contraseña: 1Clave_2 | «1Clave_2» | Error que menciona «empieza por una letra» | Error: «La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.» | Sí | — |
| 125 | Contraseña: Clave-12 | «Clave-12» | Error que menciona «guion bajo» | Error: «La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.» | Sí | — |
| 126 | Contraseña: Clave_12 (repetida) | «Clave_12» | Sin error | Sin error | Sí | — |
| 127 | Contraseña: 1Clave_2 (repetida) | «1Clave_2» | Error que menciona «empieza por una letra» | Error: «La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.» | Sí | — |
| 128 | Contraseña: Clave-12 (repetida) | «Clave-12» | Error que menciona «guion bajo» | Error: «La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.» | Sí | — |
| 129 | Contraseña: con espacio | «Clave 12» | Error que menciona «guion bajo» | Error: «La contraseña empieza por una letra y lleva solo letras sin tilde, cifras y guion bajo.» | Sí | — |
| 130 | Teléfono: correcto | «+34 612 345 678» | Sin error | Sin error | Sí | — |
| 131 | Teléfono: sin + | «34 612 345 678» | Error que menciona «+34 612 345 678» | Error: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).» | Sí | — |
| 132 | Teléfono: sin prefijo | «612 345 678» | Error que menciona «+34 612 345 678» | Error: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).» | Sí | — |
| 133 | Teléfono: sin espacios | «+34612345678» | Error que menciona «+34 612 345 678» | Error: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).» | Sí | — |
| 134 | Teléfono: primera cifra nacional 5 | «+34 512 345 678» | Error que menciona «+34 612 345 678» | Error: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).» | Sí | — |
| 135 | Teléfono: una cifra de más | «+34 612 345 6789» | Error que menciona «+34 612 345 678» | Error: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).» | Sí | — |
| 136 | Teléfono: primera cifra 9 | «+34 912 345 678» | Sin error | Sin error | Sí | — |
| 137 | Teléfono: con espacios en los extremos | «  +34 612 345 678  » | Sin error | Sin error | Sí | — |
| 138 | Código de servicio: DEP-007 | «DEP-007» | Sin error | Sin error | Sí | — |
| 139 | Código de servicio: dep-007 | «dep-007» | Error que menciona «DEP-007» | Error: «Usa DEP- seguido de exactamente tres cifras, por ejemplo DEP-007.» | Sí | — |
| 140 | Código de servicio: DEP-07 | «DEP-07» | Error que menciona «DEP-007» | Error: «Usa DEP- seguido de exactamente tres cifras, por ejemplo DEP-007.» | Sí | — |
| 141 | Código de servicio: XDEP-007 | «XDEP-007» | Error que menciona «DEP-007» | Error: «Usa DEP- seguido de exactamente tres cifras, por ejemplo DEP-007.» | Sí | — |
| 142 | Código de servicio: DEP-0070 | «DEP-0070» | Error que menciona «DEP-007» | Error: «Usa DEP- seguido de exactamente tres cifras, por ejemplo DEP-007.» | Sí | — |
| 143 | Código de servicio: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe el código de servicio.» | Sí | — |
| 144 | Referencia de cita: CITA-0001 | «CITA-0001» | Sin error | Sin error | Sí | — |
| 145 | Referencia de cita: RES-0001 | «RES-0001» | Sin error | Sin error | Sí | — |
| 146 | Referencia de cita: dep-007 | «dep-007» | Error que menciona «CITA-0001» | Error: «Usa CITA- o RES- seguido de cuatro cifras, por ejemplo CITA-0001.» | Sí | — |
| 147 | Referencia de cita: XCITA-0001 | «XCITA-0001» | Error que menciona «CITA-0001» | Error: «Usa CITA- o RES- seguido de cuatro cifras, por ejemplo CITA-0001.» | Sí | — |
| 148 | Referencia de cita: RES-001 | «RES-001» | Error que menciona «CITA-0001» | Error: «Usa CITA- o RES- seguido de cuatro cifras, por ejemplo CITA-0001.» | Sí | — |
| 149 | Referencia de cita: CITA-00012 | «CITA-00012» | Error que menciona «CITA-0001» | Error: «Usa CITA- o RES- seguido de cuatro cifras, por ejemplo CITA-0001.» | Sí | — |
| 150 | Referencia de cita: vacía | (vacía) | Error que menciona «Escribe» | Error: «Escribe la referencia de la cita.» | Sí | — |
| 151 | Extraer cifras: con cifras | «Hay 12 clases y 3 pistas» | Muestra ["12","3"] y no envía el formulario | «Cifras encontradas: ["12","3"]»; estado del formulario: «»; errores: «» | Sí | — |
| 152 | Extraer cifras: sin cifras | «Sin ninguna cifra» | Muestra [] y no envía el formulario | «Cifras encontradas: []»; estado del formulario: «»; errores: «» | Sí | — |
| 153 | Extraer cifras: vacío | «» | Muestra [] y no envía el formulario | «Cifras encontradas: []»; estado del formulario: «»; errores: «» | Sí | — |
| 154 | Etiquetas con una vacía en medio | «club, salud, , verano» | 3 etiquetas: club, salud, verano | «Noticia válida. Simulación: no se ha publicado nada. Título: Nuevo horario Fecha de publicación: 25 de noviembre de 2026 Imagen: portada.jpg Etiquetas: 3 (club, salud, verano)» | Sí | — |
| 155 | Etiquetas vacías | (campo vacío) | Ninguna etiqueta, noticia válida | «Noticia válida. Simulación: no se ha publicado nada. Título: Nuevo horario Fecha de publicación: 25 de noviembre de 2026 Imagen: portada.jpg Etiquetas: ninguna» | Sí | — |
| 156 | Etiquetas con comas y espacios sobrantes | « , , ,  » | Ninguna etiqueta (no se crean vacías) | «Noticia válida. Simulación: no se ha publicado nada. Título: Nuevo horario Fecha de publicación: 25 de noviembre de 2026 Imagen: portada.jpg Etiquetas: ninguna» | Sí | — |
| 157 | Corregir un error de formato tras el envío | Nombre «Ana2 López» → «Ana López»; teléfono «612345678» → «+34 612 345 678» | Los errores desaparecen al corregir, sin volver a enviar | Antes → socio-nombre: «Usa solo letras (con tildes, ü y ñ) y un único espacio entre palabras.»; socio-telefono: «Usa el formato +34 612 345 678 (la primera cifra es 6, 7, 8 o 9).». Después → socio-nombre: sin error; socio-telefono: sin error | Sí | — |
| 158 | Regex correcta no se salta el resto de reglas | Todos los formatos correctos pero contraseñas distintas y casilla sin marcar | Siguen los errores de confirmación y condiciones; no hay resumen | socio-nombre: sin error; socio-usuario: sin error; socio-confirmacion: «Las contraseñas no coinciden.»; socio-condiciones: «Debes aceptar las condiciones.»; estado: «Hay errores. Revisa los campos indicados.» | Sí | — |
| 159 | Demo pattern: campo obligatorio | «» | Nativa: inválido; JavaScript: inválido | Nativa: inválido (valueMissing: sí, patternMismatch: no) JavaScript (esCodigoServicio): inválido ¿Coinciden?: sí | Sí | — |
| 160 | Demo pattern: campo obligatorio | «DEP-007» | Nativa: válido; JavaScript: válido | Nativa: válido (valueMissing: no, patternMismatch: no) JavaScript (esCodigoServicio): válido ¿Coinciden?: sí | Sí | — |
| 161 | Demo pattern: campo obligatorio | «DEP-007x» | Nativa: inválido; JavaScript: inválido | Nativa: inválido (valueMissing: no, patternMismatch: sí) JavaScript (esCodigoServicio): inválido ¿Coinciden?: sí | Sí | — |
| 162 | Demo pattern: campo obligatorio | «XDEP-007» | Nativa: inválido; JavaScript: inválido | Nativa: inválido (valueMissing: no, patternMismatch: sí) JavaScript (esCodigoServicio): inválido ¿Coinciden?: sí | Sí | — |
| 163 | Demo pattern: campo obligatorio | «dep-007» | Nativa: inválido; JavaScript: inválido | Nativa: inválido (valueMissing: no, patternMismatch: sí) JavaScript (esCodigoServicio): inválido ¿Coinciden?: sí | Sí | — |
| 164 | Demo pattern: campo obligatorio | « DEP-007 » | Nativa: inválido; JavaScript: inválido | Nativa: inválido (valueMissing: no, patternMismatch: sí) JavaScript (esCodigoServicio): inválido ¿Coinciden?: sí | Sí | — |
| 165 | Demo pattern: campo opcional vacío (pattern sin required) | (vacío) | Nativa: válido (pattern no falla con vacío); JavaScript: inválido; no coinciden | Nativa: válido (valueMissing: no, patternMismatch: no) JavaScript (esCodigoServicio): inválido ¿Coinciden?: no | Sí | — |
| 166 | Demo pattern: el envío nativo se bloquea con un valor inválido | «DEP-07» y se pulsa Enviar | El navegador impide el envío: no aparece la comparación | «Escribe un valor y pulsa «Comparar». Prueba: vacío, DEP-007, DEP-007x, XDEP-007, dep-007.» | Sí | — |
| 167 | Demo pattern: el envío nativo continúa con un valor válido | «DEP-007» y se pulsa Enviar | Se muestra la comparación | «Campo obligatorio: «DEP-007» Nativa: válido (valueMissing: no, patternMismatch: no) JavaScript (esCodigoServicio): válid…» | Sí | — |

### 5. Errores y eventos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 168 | Consola del navegador durante todas las pruebas | Todas las pruebas anteriores | Ningún error ni aviso en la consola | 0 errores, 0 avisos | Sí | — |
