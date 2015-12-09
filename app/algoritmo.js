'use strict';

var algoritmo = {
  // Tiempo de espera máximo (en minutos) hasta que llegue el tren
  TIEMPO_ESPERA_MAXIMO : 30,

  // Velocidad media del tren en km/h
  VELOCIDAD_MEDIA : 90,

  // Estación destino
  _destino : -1,

  // Nodo origen
  _origen : {
    hijos : []
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
      console.log('Ejecutando algoritmo...');
      self._destino = destino;
      self.subirse(origen, hora);
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
   * Ejecuta la regla "subirse a un tren". Introduce en la lista abierta todos
   * los trenes a los que se puede entrar estando en una estación.
   *
   * @param estacion - Estación desde la que se sube al tren
   * @param hora - Hora a la que la persona llega a la estación
   */
  subirse : function(estacion, hora) {
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
      self.avanzar();
    });
  },

  /**
   * Ejecuta la regla "avanzar estando en un tren"
   *
   */
  avanzar : function() {
    var self = this;
    // Extraemos el primer elemento de la lista abierta
    var el = listaAbierta.extraer();
    var nodoExtraido = el.v;
    var heuristica = self.heuristica(nodoExtraido.estacion);
    listaCerrada.push(el);

    if (heuristica==0) {
      self.fin();
      return;
    }

    console.log('Avanzar en tren desde ' + nodoExtraido.estacion.nombre + " mediante " + nodoExtraido.tren.id);

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
        var f = nodoNuevo.g + heuristica;

        listaAbierta.insertar(f, nodoNuevo);
      }

      console.log(listaAbierta._elements);
      self.avanzar();
    });
  },

  /**
   *
   */
  trasbordo : function() {
  },

  /**
   * Calcula la heurística (distancia aérea) desde la estación al destino
   * @param origen - Identificador de la estación
   *
   * El valor se retorna en minutos
   */
  heuristica : function(origen) {
    return datos.distancia(origen.id) / 1000 / this.VELOCIDAD_MEDIA * 60;
  }
}
