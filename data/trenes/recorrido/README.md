# Recorrido de cada tren.

Cada fichero incluye la información de las estaciones por las que para un tren.

Los ficheros se llaman `XXXX.json` en donde `XXXX` es el identificador del tren.



### Campos

Cada fichero almacena un array de objetos `parada`. En donde cada `parada` es un objeto con los campos siguientes


#### parada.estacion

- Tipo: `Number`
- Valor por defecto: `0`

Identificador de la estación


#### parada.tiempo

- Tipo: `Number`
- Valor por defecto: `0`

Es la diferencia de tiempo, en minutos, desde que sale de la estación inicial a la actual. La estación inicial es aquella en la que `tiempo` vale `0`.

Ejemplo. El tren sale de la estación `0` a las `23:00`, para en la estación `1` a las `23:57` y en la `2` a las `0:01`.

```JSON
[
  {"estacion": 0, "tiempo": 0},
  {"estacion": 1, "tiempo": 57},
  {"estacion": 2, "tìempo": 61}
]
```

Si se pusiera `0:01` haría referencia a que ese tren para en la estación `B` a las 0:01 del *día anterior*


### Ejemplo completo

Fichero `720.json` donde `720` es un tren de la línea 1 de Metro de Madrid sentido *Valdecarros*

```JSON
[
  {"estacion":1001, "tiempo":0},
  {"estacion":1002, "tiempo":4},
  {"estacion":1003, "tiempo":6}
]
```

En donde 1001, 1002, 1003 son códigos de paradas de la línea 1.
