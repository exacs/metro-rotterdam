# Recorrido de cada tren.

Cada fichero incluye la información de las estaciones por las que para un tren.

Los ficheros se llaman `XXXX.json` en donde `XXXX` es el identificador del tren.



### Campos

Cada fichero almacena un array de objetos `parada`. En donde cada `parada` es un objeto con los campos siguientes


#### parada.estacion

- Tipo: `String`
- Valor por defecto: `null`

Identificador de la estación


#### parada.hora

- Tipo: `String`
- Valor por defecto: `00:00`

Es la hora a la que para por dicha estación en formato `hh:mm`. Para referirse a trenes que pasan a horas superiores de las `23:59` se deberán sumar 24 horas.

Ejemplo. Para en la estación `A` a las `23:57` y en la `B` a las `0:01`.

```JSON
[
  {estacion:"A", hora: "23:57"},
  {estacion:"B", hora: "24:01"}
]
```

Si se pusiera `0:01` haría referencia a que ese tren para en la estación `B` a las 0:01 del *día anterior*


### Ejemplo completo

Fichero `720.json` donde `720` es un tren de la línea 1 de Metro de Madrid sentido *Valdecarros*

```JSON
[
  {estacion:"Pinar de Chamartín", hora:"10:37"},
  {estacion:"Bambú"             , hora:"10:40"},
  {estacion:"Chamartín"         , hora:"10:43"}
]
```
