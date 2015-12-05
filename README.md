# Metro de Rotterdam

Aplicación para moverse con el Metro de Rotterdam. Sirve para hallar el camino óptimo entre dos estaciones de metro utilizando algoritmos de búsqueda.



## Obtención de datos

Los datos utilizados por la aplicación son ficheros JSON ubicados en la carpeta `data`. Esta carpeta `data` incluye los siguientes ficheros:

- `estaciones.json`. Todas las estaciones

Además de estos directorios:

- `plano`. Datos necesarios para dibujar el plano
- `heuristica`. Datos necesarios para obtener la heurística
- `trenes`. Datos de los trenes que pasan por cada estación



## Dibujado del plano

Para dibujar el plano del metro de Rotterdam, se usa la biblioteca D3.



## Referencias

* http://thinkingonthinking.com/Getting-Started-With-D3/
* https://www.dashingd3js.com/svg-paths-and-d3js
* http://www.jeromecukier.net/projects/metro/map.html#240
