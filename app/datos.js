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
      $.each(data, callback);
    });
  }
};
