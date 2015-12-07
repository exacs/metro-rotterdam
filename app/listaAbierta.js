/**
 * Implementación de la lista abierta mediante la implementación de la función
 * sort() de Javascript
 *
 * La implementación depende del navegador. Generalmente la complejidad de la
 * misma será de:
 * - O(1) (constante) para la función extraer
 * - O(n) (lineal)    para la función insertar
 *
 */
var listaAbierta = {
  // Array con todos los elementos de la lista abierta
  _elements : [],

  /**
   * Inserta un elemento en la lista abierta.
   *
   * @param key - Clave del elemento. Sirve para introducir el elemento en su
   *    posición correcta
   *
   * @param val - Valor del elemento.
   */
  insertar : function(key, val) {
    this._elements.push({k:key, v:val});
    this._elements.sort(function(a,b) {return a.k - b.k});
  },

  /**
   * Extrae el menor elemento del árbol retornándolo
   */
  extraer : function() {
    return this._elements.shift();
  }
}

var listaCerrada = [];
