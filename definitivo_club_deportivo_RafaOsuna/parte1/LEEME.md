# Parte 1 · Club deportivo: formularios y validación

## Cómo abrir la aplicación

1. Descomprime la carpeta.
2. Abre `index.html` con doble clic (o arrástralo a Chrome o Firefox). Los scripts son normales, sin módulos, así que funciona sin servidor.
3. Si prefieres un servidor local, desde esta carpeta puedes usar la extensión Live Server de VS Code o `npx serve`.
4. Abre la consola del navegador (F12) para ver los datos que se registran cuando un formulario es válido. Las contraseñas no se registran.

Todo es una simulación con datos ficticios: no se guarda ni se envía nada.

## Estructura

```
parte1/
├── index.html              Los cinco formularios en una sola página
├── pruebas.md              Pruebas documentadas
├── LEEME.md                Este archivo
├── css/
│   └── estilos.css         Diseño
├── capturas/
│   └── captura-errores.png Captura con varios errores visibles
└── js/
    ├── app.js              Arranca los cinco formularios
    ├── validadores.js      Reglas (no tocan el DOM): texto, números, archivos, contraseñas
    ├── fechas.js           Reglas de fecha: días (noticias) y fecha y hora (citas), en hora local
    ├── interfaz.js         Mostrar errores, enfocar, resumen, datos seguros
    ├── formulario.js       Comportamiento común: submit, input, change y foco
    ├── socios.js
    ├── servicios.js
    ├── testimonios.js
    ├── noticias.js
    └── citas.js
```

El orden de los `<script>` en `index.html` importa: primero `validadores` y `fechas`, después `interfaz` y `formulario`, luego los cinco formularios y por último `app.js`.

En esta parte no hay expresiones regulares ni `pattern`.
