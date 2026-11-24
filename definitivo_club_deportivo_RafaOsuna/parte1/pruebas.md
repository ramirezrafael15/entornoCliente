# Pruebas · Parte 1 (formularios y validación)

Pruebas hechas el 23/11/2026 en Chrome, con `index.html`. Cada caso empieza con la página recién abierta, salvo los que son una secuencia (por ejemplo, corregir después de un envío fallido).

**Resultado:** 109 de 109 casos pasan.

## Notas

- Los campos de texto llevan `maxlength`, así que con el teclado no se puede escribir más del máximo. En los casos «por encima» pongo el valor por código para comprobar que la regla de JavaScript también lo detecta.
- Los archivos de prueba son ficticios: tienen la cabecera de un JPEG y el resto son ceros hasta llegar al tamaño. En cada caso anoto nombre, tipo y tamaño.
- Las fechas usan el reloj del equipo (ayer, hoy y mañana se calculan al ejecutar). Hay dos casos con zonas horarias muy distintas (UTC+14 y UTC−11) para ver que «hoy» sale del día local y no del de UTC.
- En el caso de la cita que deja de ser futura uso un reloj simulado: se abre a las 10:00, se elige las 10:05 y se adelanta el reloj 10 minutos antes de enviar.
- Captura con varios errores visibles: `capturas/captura-errores.png`.

## Correcciones realizadas

- En la primera ejecución, 8 casos «por encima del máximo» daban «Sin error». No fallaba la validación: el campo cortaba el texto por `maxlength` antes de que la regla lo viera. Cambié la prueba (pongo el valor por código) y no toqué la aplicación. Después pasaron los 109 casos.

### 1. Obligatoriedad y textos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 1 | Al abrir la página | Sin interacción | Ningún mensaje de error visible ni aria-invalid=true | 0 mensajes, 0 campos marcados | Sí | — |
| 2 | Socios: formulario vacío | Todos los campos sin rellenar, se pulsa Comprobar | 10 errores y el foco en el nombre | 10 errores; foco en socio-nombre | Sí | — |
| 3 | Servicios, testimonios, noticias y citas vacíos | Cada formulario sin rellenar | 4 + 2 + 4 + 4 errores y foco en el primer campo | servicios: 4 errores, foco serv-nombre; testimonios: 2 errores, foco test-autor; noticias: 4 errores, foco not-titulo; citas: 4 errores, foco cita-socio | Sí | — |
| 4 | Nombre completo: solo espacios | 5 espacios | Error que menciona «solo espacios» | Error: «El nombre completo no puede ser solo espacios.» | Sí | — |
| 5 | Nombre completo: justo por debajo (3) | «AAA» | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).» | Sí | — |
| 6 | Nombre completo: límite inferior (4) | «AAAA» | Sin error | Sin error | Sí | — |
| 7 | Nombre completo: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 8 | Nombre completo: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 51).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 9 | Nombre completo: 3 letras con espacios alrededor (se mide tras trim) | «  Ana  » (7 car. con espacios) | Error que menciona «4 a 50» | Error: «Escribe el nombre completo de 4 a 50 caracteres (ahora tiene 3).» | Sí | — |
| 10 | Usuario: justo por debajo (4) | «AAAA» | Error que menciona «5 a 20» | Error: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 4).» | Sí | — |
| 11 | Usuario: límite inferior (5) | «AAAAA» | Sin error | Sin error | Sí | — |
| 12 | Usuario: límite superior (20) | «AAAAAAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 13 | Usuario: por encima (21), asignado por código | «AAAAAAAAAAAAAAAAAAAAA» | Error que menciona «5 a 20» | Error: «Escribe el usuario de 5 a 20 caracteres (ahora tiene 21).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 14 | Usuario: solo espacios | 10 espacios | Error que menciona «solo espacios» | Error: «El usuario no puede ser solo espacios.» | Sí | — |
| 15 | Correo: vacío | (vacío) | Error que menciona «Escribe» | Error: «Escribe el correo electrónico.» | Sí | — |
| 16 | Correo: sin formato de correo | «ana» | Error que menciona «formato» | Error: «Escribe un correo con formato válido, por ejemplo nombre@ejemplo.com.» | Sí | — |
| 17 | Correo: correo correcto | «ana@example.com» | Sin error | Sin error | Sí | — |
| 18 | Contraseña: justo por debajo (7) | «AAAAAAA» | Error que menciona «8 a 16» | Error: «La contraseña debe tener de 8 a 16 caracteres (ahora tiene 7).» | Sí | — |
| 19 | Contraseña: límite inferior (8) | «AAAAAAAA» | Sin error | Sin error | Sí | — |
| 20 | Contraseña: límite superior (16) | «AAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 21 | Contraseña: por encima (17), asignado por código | «AAAAAAAAAAAAAAAAA» | Error que menciona «8 a 16» | Error: «La contraseña debe tener de 8 a 16 caracteres (ahora tiene 17).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 22 | Teléfono: solo espacios | 3 espacios | Error que menciona «solo espacios» | Error: «El teléfono no puede ser solo espacios.» | Sí | — |
| 23 | Teléfono: dato presente | «+34 612 345 678» | Sin error | Sin error | Sí | — |
| 24 | Nombre del servicio: justo por debajo (2) | «AA» | Error que menciona «3 a 50» | Error: «Escribe el nombre del servicio de 3 a 50 caracteres (ahora tiene 2).» | Sí | — |
| 25 | Nombre del servicio: límite inferior (3) | «AAA» | Sin error | Sin error | Sí | — |
| 26 | Nombre del servicio: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 27 | Nombre del servicio: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «3 a 50» | Error: «Escribe el nombre del servicio de 3 a 50 caracteres (ahora tiene 51).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 28 | Autor: justo por debajo (1) | «A» | Error que menciona «2 a 50» | Error: «Escribe el nombre del autor de 2 a 50 caracteres (ahora tiene 1).» | Sí | — |
| 29 | Autor: límite inferior (2) | «AA» | Sin error | Sin error | Sí | — |
| 30 | Autor: límite superior (50) | AAAAAAAAAAAA… (50 car.) | Sin error | Sin error | Sí | — |
| 31 | Autor: por encima (51), asignado por código | AAAAAAAAAAAA… (51 car.) | Error que menciona «2 a 50» | Error: «Escribe el nombre del autor de 2 a 50 caracteres (ahora tiene 51).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 32 | Testimonio: justo por debajo (9) | «AAAAAAAAA» | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 9).» | Sí | — |
| 33 | Testimonio: límite inferior (10) | «AAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 34 | Testimonio: límite superior (500) | AAAAAAAAAAAA… (500 car.) | Sin error | Sin error | Sí | — |
| 35 | Testimonio: por encima (501), asignado por código | AAAAAAAAAAAA… (501 car.) | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 501).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 36 | Testimonio: 11 caracteres de los que 8 son espacios (tras trim: 3) | 8 espacios + «abc» | Error que menciona «10 a 500» | Error: «Escribe el testimonio de 10 a 500 caracteres (ahora tiene 3).» | Sí | — |
| 37 | Título: justo por debajo (2) | «AA» | Error que menciona «3 a 100» | Error: «Escribe el título de 3 a 100 caracteres (ahora tiene 2).» | Sí | — |
| 38 | Título: límite inferior (3) | «AAA» | Sin error | Sin error | Sí | — |
| 39 | Título: límite superior (100) | AAAAAAAAAAAA… (100 car.) | Sin error | Sin error | Sí | — |
| 40 | Título: por encima (101), asignado por código | AAAAAAAAAAAA… (101 car.) | Error que menciona «3 a 100» | Error: «Escribe el título de 3 a 100 caracteres (ahora tiene 101).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
| 41 | Contenido: justo por debajo (19) | «AAAAAAAAAAAAAAAAAAA» | Error que menciona «20 a 2000» | Error: «Escribe el contenido de 20 a 2000 caracteres (ahora tiene 19).» | Sí | — |
| 42 | Contenido: límite inferior (20) | «AAAAAAAAAAAAAAAAAAAA» | Sin error | Sin error | Sí | — |
| 43 | Contenido: límite superior (2000) | AAAAAAAAAAAA… (2000 car.) | Sin error | Sin error | Sí | — |
| 44 | Contenido: por encima (2001), asignado por código | AAAAAAAAAAAA… (2001 car.) | Error que menciona «20 a 2000» | Error: «Escribe el contenido de 20 a 2000 caracteres (ahora tiene 2001).» | Sí | En la 1.ª ejecución daba «Sin error»: el campo cortaba el texto por maxlength. Se cambió la prueba para asignar el valor por código; la aplicación no cambió. |
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
| 96 | Envío con Intro | Formulario de servicios válido; se pulsa Intro en el campo nombre | Aparece la confirmación sin hacer clic | «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar» | Sí | — |
| 97 | Cambio de contraseña tras confirmarla | Tras un envío fallido: contraseña y confirmación «Clave_123»; luego la contraseña pasa a «Clave_1234» | El error de confirmación aparece al cambiar la contraseña, sin tocar la confirmación | Confirmación antes: sin error; después: «Las contraseñas no coinciden.» | Sí | — |
| 98 | Contraseña con espacios: no se recortan | Contraseña «  abcdef  » (10 car.) y confirmación igual; luego confirmación «abcdef» sin espacios | Con espacios iguales no hay error; recortada no coincide | Iguales: sin error; recortada: «Las contraseñas no coinciden.» | Sí | — |
| 99 | Cambio de datos tras una confirmación válida | Servicio válido y confirmado; después se edita el precio | La confirmación desaparece al editar | Antes: «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar»; después de editar: «» | Sí | — |
| 100 | Error corregido y nuevo error | Tras un envío fallido, el precio pasa de «12.345» a «12.34» y vuelve a «-5» | Error, luego sin error, luego error | error → sin error → error | Sí | — |
| 101 | Texto con etiquetas HTML | Nombre del servicio «<b>Yoga</b><img src=x onerror=alert(1)>» | Se muestra como texto; no se crea ningún <b> ni <img> en la confirmación | 0 nodos b/img; texto literal presente: true; alert: false | Sí | — |

### 6. Formularios completos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 102 | Socio válido | Nombre «  Marta Ruiz  » (con espacios), usuario laura77, edad 25, modalidad anual, JPEG 2048 bytes, condiciones | Resumen con nombre «Marta Ruiz», usuario y modalidad; sin contraseña | «Datos válidos. Alta simulada: no se ha guardado nada. Nombre: Marta Ruiz Usuario: laura77 Modalidad: Anual» | Sí | — |
| 103 | Socio válido: nada sensible en la consola | Mismo envío válido | Ni la contraseña ni el contenido del archivo aparecen en la consola | contraseña en consola: false; usuario en consola: true | Sí | — |
| 104 | Servicio válido | Yoga suave, 30 min, 12.50, bienestar | Resumen con servicio, duración, precio y categoría | «Datos válidos. Servicio simulado: no se ha guardado nada. Servicio: Yoga suave Duración: 30 minutos Precio: 12.50 € Categoría: Bienestar» | Sí | — |
| 105 | Testimonio válido sin marcar publicación | Autor Marta Ruiz, 34 caracteres, sin marcar «Autorizo su publicación» | Válido e indica que queda privado | «Testimonio válido. Simulación: no se ha guardado nada. Autor: Marta Ruiz Caracteres: 34 Publicación: no autorizada: el testimonio queda privado» | Sí | — |
| 106 | Testimonio válido con publicación | Igual, con la casilla marcada | Válido e indica publicación autorizada | «Testimonio válido. Simulación: no se ha guardado nada. Autor: Marta Ruiz Caracteres: 34 Publicación: autorizada» | Sí | — |
| 107 | Noticia válida | Título, contenido, fecha de mañana, JPEG 4096 bytes | Resumen con título, fecha e imagen | «Noticia válida. Simulación: no se ha publicado nada. Título: Nuevo horario Fecha de publicación: 25 de noviembre de 2026 Imagen: portada.jpg» | Sí | — |
| 108 | Cita válida | Socio Marcos Ejemplo, servicio Natación, mañana a la misma hora, casilla marcada | Resumen con socio, servicio y fecha | «Cita válida. Reserva simulada: no se ha guardado nada. Socio: Marcos Ejemplo Servicio: Natación Fecha y hora: 25 de noviembre de 2026 a las 9:47» | Sí | — |

### 5. Errores y eventos

| Nº | Prueba | Entrada | Resultado esperado | Resultado obtenido | ¿Pasa? | Corrección |
|---|---|---|---|---|---|---|
| 109 | Consola del navegador durante todas las pruebas | Todas las pruebas anteriores | Ningún error ni aviso en la consola | 0 errores, 0 avisos | Sí | — |
