# Trenes que pasan por cada estación.

Cada fichero incluye la información de todos los trenes que pasan por una estación.

Los ficheros se llaman `XXXX.json` donde `XXXX` es el nombre de la estación.

### Campos

Cada fichero almacena un array de objetos `tren` o `serie`.

Un objeto `tren` representa el tren de un único tren a una determinada hora. El objeto tren tiene los campos `id`, `linea`, `sentido` y `hora`.

Un objeto `serie` representa el tren de un tren con una determinada serie en un intervalo de tiempo. El objeto serie tiene los campos `id`, `linea`, `sentido`, `hora_inicio`, `hora_fin` e `intervalo`.


#### tren.id y serie.id

- Tipo: `String`
- Valor por defecto: `null`

Identificador del tren. Por ejemplo `"A0"`


#### tren.linea y serie.linea

- Tipo: `String`
- Valor por defecto: `null`

Identificador de la línea. Por ejemplo `"A"`


#### tren.sentido y serie.sentido

- Tipo: `Number`
- Valor por defecto: `0`

Sentido del tren. Tiene los valores `0` o `1`


#### tren.hora

- Tipo: `String`
- Valor por defecto: `00:00`

Es la hora a la que pasa el tren por dicha estación en formato `hh:mm`. Para referirse a trenes que pasan a horas superiores de las `23:59` se deberán sumar 24 horas.

Ejemplo. Un tren pasa a las `23:57` y el siguiente pasa a las `0:13`.

```JSON
[
  {"hora": "23:57"},
  {"hora": "24:13"}
]
```

Si se pusiera `0:13` haría referencia a un tren que pasa a las 0:13 del *día anterior*


#### serie.hora_inicio, serie.hora_final

- Tipo: `String`
- Valor por defecto: `00:00`

Es el periodo de tiempo en el que un tren pasa con un intervalo constante.


#### serie.intervalo

- Tipo: `Number`
- Valor por defecto: `1`

Es el intervalo de tiempo, en minutos que transcurre entre la llegada de un tren y otro.


### Ejemplo completo

Fichero `Moncloa.json` que contiene los trenes que pasan por la estación de *Moncloa*

```JSON
[
  {"id":"6A", "linea":"6", "sentido":0, "hora":"06:37"},
  {"id":"6B", "linea":"6", "sentido":1, "hora":"06:38"},
  {"id":"3A", "linea":"3", "sentido":0, "hora":"06:42"},
  {"id":"3A", "linea":"3", "sentido":0, "hora":"07:01"},
  {"id":"6A", "linea":"6", "sentido":0, "hora":"07:04"}
]
```

El ejemplo siguiente muestra que por la estación pasan trenes "A" de la línea *C* con sentido *1* cada *2 minutos* entre las *06:00* y las *06:10*

```JSON
[
  {
    "id":"A",
    "linea":"C",
    "sentido":1,
    "hora_inicio":"06:00",
    "hora_fin"   :"06:10",
    "intervalo":"2"
  }
]
```

El anterior ejemplo equivale a este otro

```JSON
[
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:00"},
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:02"},
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:04"},
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:06"},
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:08"},
  {"id":"A", "linea":"C", "sentido":1, "hora":"06:10"}
]
```

