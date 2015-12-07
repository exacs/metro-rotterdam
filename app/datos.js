/**
 * Objeto utilizado para cargar datos.
 */
'use strict';

var datos = {
  /**
   * Almacena las estaciones. Cada elemento es un Object con los campos:
   * - id (Number). Identificador único de la estación.
   * - nombre (String). Nombre de la estación.
   * - recorridos (array). Recorridos que pasan por la estación. Los elementos
   *   de este array son String que identifican el recorrido.
   *
   * A este array se debe acceder únicamente mediante la función "estaciones"
   */
  _estaciones : [],

  /**
   * Almacena los recorridos que realizan los trenes. Cada elemento es un
   * Object con los campos
   * - id (String). Identificador del recorrido.
   * - recorrido (array). Estaciones que recorre el tren. Cada elemento de este
   *   array es a su vez un Object con los campos:
   *   - estación (Number). Identificador único de la estación.
   *   - tiempo (Number). Tiempo que tarda el tren en llegar a esta estación.
   *     Este tiempo es relativo a la estación cuyo tiempo sea 0.
   *
   * A este array se debe acceder únicamente mediante la función "recorridos"
   */
  _recorridos : [],

  /**
   * Carga el array de estaciones
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
    var self = this;
    console.log('Cargando datos de estaciones...');
    // Si los datos están en el array de estaciones, cargar esos en lugar
    // del fichero JSON.
    if (this._estaciones.length>0) {
      $.each(this._estaciones, callback);
      return;
    }

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

      console.log('Estaciones cargadas!');
      self._estaciones = data;
      $.each(self._estaciones, callback);
    });
  },

  /**
   * Retorna el objeto estación cuyo ID es estacion
   */
  estacion : function(id) {
    var ret;
    var found = false;
    for (var i=0; i<this._estaciones.length && !found; i++) {
      if (this._estaciones[i].id==id) {
        found = true;
        ret = this._estaciones[i];
      }
    }
    return ret;
  },

  /**
   * Carga los trenes que pasan por una determinada estación.
   *
   * @param estacion - Object estación
   *
   * @param callback - función que ejecutar tras la carga.
   *    Esta función debe ser de la forma "function(trenes)" en donde "trenes"
   *    es un array de objetos "tren"
   *
   * Antes de llamar a esta función se debe haber llamado a la función
   * estaciones
   */
  trenes : function(estacion, callback) {
    var self = this;
    // Función auxiliar
    // Dado un String hora "hh:mm" lo convierte en un número
    function _hora(hora) {
      var hhmm = hora.split(':');
      return parseInt(hhmm[0], 10)*60+parseInt(hhmm[1],10);
    } // function

    // Función auxiliar.
    // Obtiene el array de trenes que pasan por una "estacion" dentro de un
    // "recorrido"
    function _obtenerEstaciones(recorrido) {
      // Obtener el desplazamiento en minutos del tren respecto a la estación
      // inicial
      var desplazamiento = -1;
      for (var i=0; i<recorrido.paradas.length && desplazamiento==-1; i++) {
        if (recorrido.paradas[i].idEstacion==estacion) {
          desplazamiento = recorrido.paradas[i].tiempo;
        }
      }

      // De los horarios, obtener los trenes sumándole el desplazamiento
      var trenes = [];
      $.each(recorrido.horarios, function(i, horario) {
        if (typeof horario.intervalo==='undefined' || horario.intervalo===null) {
          // No existe el campo "intervalo", el objeto es de tipo "tren"
          trenes.push({
            id : recorrido.id,
            hora : _hora(horario.hora) + desplazamiento
          });
        } else {
          // Existe el campo "intervalo", el objeto es de tipo "serie"
          var inicio = _hora(horario.inicio);
          var fin    = _hora(horario.fin);
          var intervalo = horario.intervalo;

          for (var i=inicio; i<=fin; i+=intervalo) {
            trenes.push({
              id : recorrido.id,
              hora : i + desplazamiento
            });
          } //for
        } //if (typeof...)
      });
      return trenes;
    } // function


    console.log('¿Qué trenes pasan por "' + estacion.nombre + '"?');
    // 1. Cargar los recorridos de la estación
    var cargados = 0;
    var trenes = [];
    $.each(estacion.recorridos, function(i, idRecorrido) {
      self.recorridos(idRecorrido, function(recorrido) {
        $.merge(trenes, _obtenerEstaciones(recorrido));
        cargados++;

        if (cargados>=estacion.recorridos.length) {
          // Retornar ordenados
          trenes.sort(function(a,b) {return a.hora-b.hora;});
          console.log('Por ' + estacion.nombre + ' pasan ' + trenes.length + ' trenes');
          callback(trenes);
        }
      });
    });
  },

  /**
   * Carga un recorrido
   */
  recorridos : function(id, callback) {
    var self = this;
    // Si existe en el array, no cargar
    var encontrado = -1;
    for (var i=0; i<this._recorridos.length && encontrado==-1; i++) {
      if (this._recorridos[i].id==id) {
        encontrado = i;
      }
    }
    if (encontrado!=-1) {
      callback(this._recorridos[encontrado]);
      return;
    }

    // Si no existe, cargar el JSON
    $.getJSON('data/recorridos/' + id + '.json', function(data) {
      self._recorridos.push(data);
      callback(data);
    });
  }
};
