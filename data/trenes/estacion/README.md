# Trenes que pasan por cada estación.

Cada fichero incluye la información de todos los trenes que pasan por una estación.

Los ficheros se llaman `XXXX.json` donde `XXXX` es el nombre de la estación.

### Campos

Cada fichero almacena un array de objetos `tren`. En donde cada `tren` es un objeto con los campos siguientes


#### tren.id

- Tipo: `String`
- Valor por defecto: `null`

Identificador del tren.


#### tren.linea

- Tipo: `String`
- Valor por defecto: `null`

Identificador de la línea.


#### tren.sentido

- Tipo: `Number`
- Valor por defecto: `0`

Sentido del tren. `0` y `1` son sentidos opuestos.


#### tren.hora

- Tipo: `String`
- Valor por defecto: `00:00`

Es la hora a la que pasa el tren por dicha estación en formato `hh:mm`. Para referirse a trenes que pasan a horas superiores de las `23:59` se deberán sumar 24 horas.

Ejemplo. Un tren pasa a las `23:57` y el siguiente pasa a las `0:13`.

```JSON
[
  {hora: "23:57"},
  {hora: "24:13"}
]
```

Si se pusiera `0:13` haría referencia a un tren que pasa a las 0:13 del *día anterior*


### Ejemplo completo

Fichero `Moncloa.json` que contiene los trenes que pasan por la estación de *Moncloa*

```JSON
[
  {id:"1", linea:"6", sentido:0, hora:"06:37"},
  {id:"2", linea:"6", sentido:1, hora:"06:38"},
  {id:"3", linea:"3", sentido:0, hora:"06:42"},
  {id:"4", linea:"3", sentido:0, hora:"07:01"},
  {id:"5", linea:"6", sentido:0, hora:"07:04"}
]
```