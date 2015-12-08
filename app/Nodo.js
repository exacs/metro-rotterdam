/**
 * Construye un tipo Nodo con el estado del viajero en un determinado instante.
 * Los campos almacenados son:
 *
 * @param estacion - Tipo Estacion. Estación en la que se encuentra
 * @param tren - Tipo Tren. Tren en el que está viajando
 * @param g - Tipo Number. Minutos transcurridos desde el inicio del viaje
 * @param anterior - Tipo Nodo. Nodo del que viene
 */
function Nodo(estacion, tren, g, anterior) {
  this.estacion = estacion;
  this.tren = tren;
  this.g = g;
  this.anterior = anterior;

  /**
   * Retorna true si los objetos Nodo "o" y el actual son iguales. Dos Nodos se
   * consideran iguales si la estación y el tren en el que se encuentran es la
   * misma independientemente de la hora que sea.
   *
   * Los objetos deben haberse construido utilizando el constructor
   * "new Nodo(estacion, tren, hora, anterior)"
   */
  this.equals = function(o) {
    return this.estacion.id==o.estacion.id && this.tren.id==o.tren.id;
  }

  /**
   * Retorna una representación en forma de cadena de caracteres del nodo
   * actual.
   */
  this.toString = function() {
    return this.estacion.nombre + "/" + this.tren.id + "/" + this.g;
  }
}
