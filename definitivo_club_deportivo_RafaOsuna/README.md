# Club deportivo: formularios fiables

Proyecto de la unidad 5 de Desarrollo Web en Entorno Cliente. Son cinco formularios (socios, servicios, testimonios, noticias y citas) que validan en el navegador y simulan la operación cuando los datos son correctos. No hay servidor, base de datos ni almacenamiento, y todos los datos son ficticios.

## Estructura

```
club-deportivo/
├── README.md                    Este archivo, con la memoria
├── parte1/                      Validación HTML + JavaScript (sin regex)
│   ├── index.html
│   ├── pruebas.md
│   ├── LEEME.md
│   ├── css/                     estilos.css
│   ├── capturas/                captura-errores.png
│   └── js/
│       ├── app.js               Arranque
│       ├── validadores.js       Reglas de texto, números, archivos y contraseñas
│       ├── fechas.js            Reglas de fecha (días y fecha y hora)
│       ├── interfaz.js          Errores, foco, resumen
│       ├── formulario.js        submit, input y change
│       └── socios.js, servicios.js, testimonios.js, noticias.js, citas.js
└── parte2/                      Copia de la parte 1 + expresiones regulares
    ├── index.html
    ├── demo-pattern.html        Demo de required + pattern
    ├── pruebas.js               Comprobaciones automáticas (Node)
    ├── pruebas.md
    ├── css/                     estilos.css
    ├── capturas/                captura-errores.png, captura-demo-pattern.png
    └── js/
        ├── app.js
        ├── validadores.js, fechas.js, formatos.js, texto.js
        ├── interfaz.js, formulario.js
        ├── socios.js, servicios.js, testimonios.js, noticias.js, citas.js
        └── demo-pattern.js      Solo la usa demo-pattern.html
```

En `js/` hay tres tipos de archivos:

- Reglas (`validadores`, `fechas`, y en la parte 2 `formatos` y `texto`): no tocan el DOM, así que se pueden probar con Node.
- Interfaz y comportamiento común (`interfaz`, `formulario`).
- Un archivo por formulario.

Las dos versiones se pueden ejecutar por separado. El orden de los `<script>` en `index.html` importa: primero las reglas, después `interfaz` y `formulario`, luego los formularios y por último `app.js`.

## Cómo ejecutarlo

- **Aplicación:** abrir `parte1/index.html` o `parte2/index.html` en el navegador (doble clic). La demo está en `parte2/demo-pattern.html` y también se llega desde el menú de la parte 2.
- **Pruebas automáticas (sin navegador):** con Node instalado, entrar en `parte2` y ejecutar `node pruebas.js`. Muestra cuántas comprobaciones pasa cada grupo y termina con error si falla alguna.
- **Pruebas en el navegador:** están documentadas en `parte1/pruebas.md` y `parte2/pruebas.md`.

## Requisitos completados

- Los cinco formularios funcionan, con `label` asociado a `id` único, `name` en todos los campos, `fieldset` y `legend` en los radios y botón `submit`.
- Validación combinada: restricciones HTML (`required`, `type`, `minlength`, `maxlength`, `min`, `max`, `step`) más reglas de JavaScript con `setCustomValidity()`. En la parte 1 no hay regex ni `pattern`.
- Envío con `submit` (también con Intro), cancelado para simular. Se revisan todos los campos y se enfoca el primero incorrecto. Después del primer intento se corrige en `input` y `change`.
- Errores junto al campo con `textContent`, `aria-describedby` y `aria-invalid`. No se muestran errores al abrir y se limpia la confirmación al editar.
- Socios: contraseña y confirmación sin `trim()`, confirmación que se revalida si cambia la contraseña, foto JPEG de hasta 5.000.000 bytes, casilla con `checked`. El resumen no muestra ni registra contraseñas ni el contenido del archivo.
- Servicios: duración entera múltiplo de 15 (el vacío no es cero), precio con `valueAsNumber` y `stepMismatch`, categoría con opción inicial vacía.
- Testimonios: contador de caracteres y publicación opcional, que indica si queda privado.
- Noticias: fecha posterior a hoy comparando días locales, sin `toISOString()`. Citas: instante posterior al actual, comprobado en el momento del envío.
- Parte 2: una función booleana por regla (nombre, usuario, contraseña, teléfono, código de servicio, referencia de cita), normalización con `replace()`, extracción de cifras con `match()`, etiquetas con `split()`, demo con `required` y `pattern`.
- Pruebas: `parte1/pruebas.md`, `parte2/pruebas.md` y `parte2/pruebas.js`.

---

# Memoria

## Cómo se valida un campo

Lo cuento con la edad. Al enviar el formulario, `formulario.js` pasa por todos los campos y ejecuta la regla de cada uno. La de la edad lee `valueAsNumber` (con `parseInt` el 18.5 se quedaría en 18) y se lo pasa a `errorEdad()`, que está en `validadores.js` y no usa el DOM. Esa función devuelve un texto vacío si está bien o el mensaje de error. Con eso llamo a `setCustomValidity()`, escribo el mensaje con `textContent` en el párrafo del campo (enlazado con `aria-describedby`) y cambio `aria-invalid`. Al final el foco va al primer campo que ha fallado. Después del primer intento, cada vez que se toca un campo solo se vuelve a ejecutar su regla.

## Qué hace HTML y qué hace JavaScript

HTML se encarga de lo básico: `required`, el tipo del campo, `min`, `max` y `step`. JavaScript hace el resto: quitar los espacios antes de contar, que un nombre no sea solo espacios, que la edad sea entera, el tipo y el tamaño del archivo, que las contraseñas coincidan y las fechas. Puse `novalidate` para que el evento `submit` llegue siempre y poder enseñar mis propios mensajes.

Los campos de texto tienen `maxlength`, así que con el teclado no se puede pasar del máximo. Aun así la regla de JavaScript también lo comprueba, y en las pruebas lo hago poniendo el valor por código.

## Patrones por partes

Todos empiezan con `^` y acaban con `$` para que se valide el texto entero.

- **Nombre:** `^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+(?: [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*$`. La clase tiene las letras permitidas y el `+` hace una palabra. El grupo `(?: ...)*` es un espacio y otra palabra, las veces que haga falta, así que solo puede haber un espacio entre palabras y ninguno al principio ni al final. Es un grupo sin captura porque no necesito guardar nada. El límite de 4 a 50 lo miro aparte con `length`, que se entiende mejor que meterlo en el patrón. Antes de validar normalizo los espacios.
- **Usuario:** `^[A-Za-z][A-Za-z0-9]{4,19}$`. Una letra y de 4 a 19 letras o cifras, o sea, de 5 a 20.
- **Contraseña:** `^[A-Za-z][A-Za-z0-9_]{7,15}$`. Igual que el usuario pero con guion bajo, de 8 a 16.
- **Teléfono:** `^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$`. `\+` es el más de verdad, los espacios son espacios exactos, `[6-9]` es la primera cifra y el resto son los grupos de cifras. Solo le hago `trim()` a los extremos.
- **Código de servicio:** `^DEP-[0-9]{3}$`. DEP- y tres cifras justas.
- **Referencia de cita:** `^(?:CITA|RES)-[0-9]{4}$`. El grupo hace que `^` y `$` valgan para las dos opciones. Sin él, `^CITA|RES-[0-9]{4}$` querría decir «empieza por CITA, o acaba en RES- y cuatro cifras», y aceptaría «CITA-xyz».
- **Normalizar espacios:** `/^ +| +$/g` quita los espacios del principio y del final (la barra es una alternativa y la `g` hace que los quite en los dos sitios), y `/ {2,}/g` cambia dos o más espacios seguidos por uno. Solo toca el espacio normal. Lo uso en el nombre, no en contraseñas ni en el texto de noticias o testimonios.
- **Cifras:** `/[0-9]+/g` con `match()`. Si no hay ninguna, `match()` devuelve `null`, y con `?? []` devuelvo una lista vacía.
- **Etiquetas:** `split(/\s*,\s*/)`, luego `trim()` a cada una y fuera las vacías. «club, salud, , verano» da tres.

## Banderas

- Sin `g` en los validadores. Con `test()`, una regex con `g` se acuerda de `lastIndex` y el mismo texto puede dar `true` y luego `false`. Por eso en las pruebas repito cada caso dos veces. Sí uso `g` en `match()` y `replace()`, porque ahí quiero todas las coincidencias.
- Sin `m`. Son campos de una línea y con `m` los `^` y `$` valen por cada línea, así que se podría colar un texto con un salto de línea.
- Sin `i`, porque DEP-007 y dep-007 tienen que ser distintos.
- Sin `u` ni `s`, no me hacen falta: las letras con tilde las pongo en la clase y no hay saltos de línea.

## Formato y significado

Una regex solo dice si el texto tiene la forma que se pide. Un teléfono con buen formato no demuestra que el número exista, DEP-007 no demuestra que ese servicio esté dado de alta y un correo con `type="email"` no demuestra que sea de esa persona. Además, las reglas de nombre, usuario y contraseña son cerradas, solo para practicar: por ejemplo, rechazan nombres reales con guion o apóstrofo.

En la demo, `pattern` y mi función dan lo mismo con el campo vacío y `required`, con el código correcto y con texto de más. Cambia con el campo vacío sin `required`: ahí `pattern` lo da por bueno, por eso no sustituye a `required`. Tampoco sirve para el tamaño de un archivo, la edad o una fecha futura.

## Qué tendría que validar otra vez el servidor

Todo. Lo que hago en el navegador ayuda al usuario, pero se puede saltar (con las herramientas de desarrollo o mandando la petición sin pasar por la página). El servidor tendría que repetir longitudes, formatos, rangos, fechas (con su propio reloj) y campos obligatorios. En los archivos no puede fiarse de `file.type` ni de la extensión: tiene que mirar el contenido, comprobar el tamaño y guardarlo con otro nombre. También cosas que el cliente no sabe, como si el usuario o el correo ya existen, guardar las contraseñas con hash, escapar los textos al mostrarlos y usar HTTPS.

## Decisiones que tomé

- En el código de servicio, la referencia y el teléfono hago `trim()` antes de validar, por si se cuela algún espacio, y guardo el texto recortado. Las funciones de `formatos.js` son estrictas y no recortan. En la demo de `pattern` tampoco se recorta.
- Las fechas se comparan en hora local. En noticias cuenta el día (hoy no vale) y en citas el momento exacto.
- Al editar cualquier campo desaparece la confirmación anterior, porque podría estar desactualizada.
