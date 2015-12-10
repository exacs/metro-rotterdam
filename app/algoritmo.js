'use strict';

var algoritmo = {
  // Tiempo de espera máximo (en minutos) hasta que llegue el tren
  TIEMPO_ESPERA_MAXIMO : 30,

  // Tiempo que se tarda en hacer un trasbordo
  TIEMPO_TRASBORDO : 3,

  // Velocidad media del tren en km/h
  VELOCIDAD : 120,

  // Estación destino
  _destino : -1,

  // Nodo origen
  _origen : {
    
  },

  /**
   * Ejecuta el algoritmo A* para hallar el camino óptimo entre dos estaciones
   *
   * @param origen - Objeto Estación origen
   * @param destino - Objeto Estación destino
   * @param hora - Hora a la que se sale de la estación origen
   *
   * Retorna un array con los pasos a seguir
   */
  ejecutar : function(origen, destino, hora) {
    var self = this;
    // Carga las heurísticas necesarias
    datos.cargarHeuristica(destino.id, function() {
      console.log(datos._heuristica);
      console.log(hora + ' / Ejecutando algoritmo...');
      self._destino = destino;
      self._origen.estacion = origen
      self.subirseAlTren(origen, hora);
    });
  },

  /**
   * Se ejecuta al finalizar el algoritmo
   */
  fin : function() {
    console.log('Fin del algoritmo');
    console.log(listaCerrada);
  },

  /**
   * Avanzar en el algoritmo un paso.
   */
  siguientePaso: function() {
    var self = this;
    var el = listaAbierta.extraer();
    var nodoExtraido = el.v;
    
    if (nodoExtraido.estacion.id==self._destino.id) {
      self.fin();
    } else if (nodoExtraido.estacion.id==self._origen.estacion.id) {
      self.avanzarEnElTren(nodoExtraido);
    } else if (nodoExtraido.estacion.id==nodoExtraido.anterior.estacion.id) {
      self.avanzarEnElTren(nodoExtraido);
    } else {
      self.hacerTrasbordo(nodoExtraido);
    }
  },

  /**
   * Ejecuta la regla "subirse a un tren". Introduce en la lista abierta todos
   * los trenes a los que se puede entrar estando en una estación.
   *
   * @param estacion - Estación desde la que se sube al tren
   * @param hora - Hora a la que la persona llega a la estación
   */
  subirseAlTren : function(estacion, hora) {
    var self = this;
    // Obtener todos los trenes que salen de mi estación
    datos.trenes(estacion, function(trenes) {
      // Excluir los que sean en el pasado y los que superen el tiempo de
      // espera máximo
      var filtrados = $.grep(trenes, function(tren, i) {
        return hora < tren.hora && tren.hora < hora+self.TIEMPO_ESPERA_MAXIMO;
      });

      // Calcular la "f" e insertar en la lista abierta
      $.each(filtrados, function(i, tren) {
        var f = tren.hora - hora + self.heuristica(estacion);
        var nodo = new Nodo(estacion, tren, tren.hora - hora, self._origen);

        listaAbierta.insertar(f, nodo);
      });
      console.log(listaAbierta._elements);
      self.siguientePaso();
    });
  },

  /**
   * Ejecuta la regla "avanzar estando en un tren"
   *
   */
  avanzarEnElTren : function(nodoExtraido) {
    var self = this;

    console.log(nodoExtraido.tren.hora + ' / Avanzar en tren desde ' + nodoExtraido.estacion.nombre + " mediante " + nodoExtraido.tren.id);

    datos.recorridos(nodoExtraido.tren.id, function(recorrido) {
      var s = -1;

      for (var i=0; i<recorrido.paradas.length && s==-1; i++) {
        if (recorrido.paradas[i].idEstacion==nodoExtraido.estacion.id) {
          s = i+1;
        }
      }

      if (s<recorrido.paradas.length) {
        var transcurrido = recorrido.paradas[s].tiempo - recorrido.paradas[s-1].tiempo;
        var nodoNuevo = new Nodo(
          datos.estacion(recorrido.paradas[s].idEstacion),
          nodoExtraido.tren,
          nodoExtraido.g + transcurrido,
          nodoExtraido
        );
        var f = nodoNuevo.g + self.heuristica(nodoNuevo.estacion);

        listaAbierta.insertar(f, nodoNuevo);
      }

      console.log(listaAbierta._elements);
      self.siguientePaso(true);
    });
  },

  /**
   * Ejecuta la regla "hacer trasbordo" sobre el nodo "nodoExtraido".
   */
  hacerTrasbordo : function(nodoExtraido) {
    var self = this;

    // Si "nodoExtraido" es resultado de un trasbordo, no hacer trasbordo
    if (nodoExtraido.estacion.id != nodoExtraido.anterior.estacion.id) {
      datos.trasbordos(nodoExtraido.estacion, nodoExtraido.tren, function(trenes) {
        if (trenes.length==0) {
          self.avanzarEnElTren(nodoExtraido);
          return;
        }
        // Excluir los que sean en el pasado y los que superen el tiempo de
        // espera máximo
        var hora = nodoExtraido.tren.hora;
        var filtrados = $.grep(trenes, function(tren, i) {
          return hora + self.TIEMPO_TRASBORDO < tren.hora && tren.hora < hora+self.TIEMPO_ESPERA_MAXIMO;
        });

        if (filtrados.length>0) {
          console.log('---- Trasbordo en ' + nodoExtraido.estacion.nombre + " desde " + nodoExtraido.tren.id);
        }

        // Calcular la "f" e insertar en la lista abierta
        $.each(filtrados, function(i, tren) {
          var transcurrido = tren.hora - nodoExtraido.tren.hora + 1/128;
          var f = nodoExtraido.g + transcurrido + self.heuristica(nodoExtraido.estacion);
          var nodo = new Nodo(nodoExtraido.estacion, tren, tren.hora - hora, nodoExtraido);

          listaAbierta.insertar(f, nodo);
        });

        console.log(listaAbierta._elements);
        self.avanzarEnElTren(nodoExtraido);
      });
    }
  },

  /**
   * Calcula la heurística (distancia aérea) desde la estación al destino
   * @param origen - Identificador de la estación
   *
   * El valor se retorna en minutos
   */
  heuristica : function(origen) {
    return datos.distancia(origen.id) / 1000 / this.VELOCIDAD * 60;
  }
}
