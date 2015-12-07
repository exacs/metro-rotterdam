/**
 * Objeto utilizado para cargar datos.
 */
'use strict';

var datos = {

  /**
   * Carga el fichero con las estaciones.
   *
   * @param callback - función que ejecutar con cada dato cargado.
   *    Esta función es llamada una vez por cada objeto "Estación" existente
   *    en el archivo cargado.
   *
   *    Esta función debe ser de la forma "function(i, valor)" en donde "i" es
   *    el índice del elemento y "valor" el objeto con los datos de la estación.
   *
   * Esta función ordena los objetos por orden alfabético según el campo
   * "nombre"
   */
  estaciones : function(callback) {
    console.log('Cargando datos de estaciones...');
    $.getJSON('data/estaciones.json', function(data) {
      // Ordenar los datos
      data.sort(
        // Esta función define el comparador utilizado por .sort especificando
        // el criterio de ordenación. En concreto, alfabéticamente según el
        // campo "nombre"
        function(a,b) {
          return a.nombre.localeCompare(b.nombre);
        }
      );

      // Llamar a la función callback
      console.log('Estaciones cargadas!');
      $.each(data, callback);
    });
  },

  /**
   * Carga el fichero con la información de los trenes que pasan por una
   * determinada estación.
   *
   * @param estacion - identificador de la estación. Es también el nombre del
   *    fichero que se debe cargar
   *
   * @param callback - función que ejecutar tras la carga.
   *    Esta función debe ser de la forma "function(trenes)" en donde "trenes"
   *    es un array de objetos "tren"
   */
  trenes : function(estacion, callback) {
    console.log('Cargando datos de la estación ' + estacion);
    $.getJSON('data/trenes/estacion/' + estacion + '.json', function(data) {
      var trenes = [];

      $.each(data, function(i, tren) {

        function _hora(hora) {
          var hhmm = hora.split(':');
          return parseInt(hhmm[0], 10)*60+parseInt(hhmm[1],10);
        }
        if (typeof tren.intervalo==='undefined' || tren.intervalo===null) {
          // No existe el campo "intervalo", el objeto es de tipo "tren"
          trenes.push({
            id     : tren.id,
            linea  : tren.linea,
            sentido: tren.sentido,
            hora   : _hora(tren.hora)
          });
        } else {
          console.log('hola');
          // Existe el campo "intervalo", el objeto es de tipo "serie"
          var inicio = _hora(tren.hora_inicio);
          var fin    = _hora(tren.hora_fin);
          var intervalo = tren.intervalo;

          for (var i=inicio; i<=fin; i+=intervalo) {
            trenes.push({
              id     : tren.id,
              linea  : tren.linea,
              sentido: tren.sentido,
              hora   : i
            });
          } //for
        } //if (typeof...)
      });
      
      callback(trenes);
    });
  }
};
