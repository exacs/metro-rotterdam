/**
 * Implementación de la lista abierta mediante la implementación de la función
 * sort() de Javascript
 *
 * La implementación depende del navegador. Generalmente la complejidad de la
 * misma será de:
 * - O(1) (constante) para la función extraer
 * - O(n) (lineal)    para la función insertar
 *
 * La lista abierta tiene las siguientes características:
 * - Todos los elementos son únicos.
 * - Los elementos están ordenados de menor a mayor según un valor numérico
 *   (clave)
 */
var listaAbierta = {
  // Array con todos los elementos de la lista abierta
  _elements : [],

  /**
   * Inserta o actualiza un elemento en la lista abierta.
   *
   * @param key - Tipo Number. Clave del elemento nuevo.
   *
   * @param val - Tipo Object. Valor del elemento. Este objeto debe tener
   *    un campo función llamada "equals(o)".
   *
   * El elemento se inserta si no existe en la propia lista. En caso de existir
   * se comparan las claves de los dos objetos y se actualiza el valor de la
   * clave con el mínimo de ambas.
   */
  insertar : function(key, val) {
    var encontrado = -1;
    for (var i=0; i<this._elements.length && encontrado==-1; i++) {
      if (this._elements[i].v.equals(val)) {
        encontrado = i;
      }
    }

    if (encontrado==-1) {
      this._elements.push({k:key, v:val});
    } else if (this._elements[encontrado].k > key) {
      this._elements[encontrado].k = key;
      this._elements[encontrado].v = val;
    }
    this._elements.sort(function(a,b) {return a.k - b.k});
  },

  /**
   * Extrae el menor elemento del árbol retornándolo
   */
  extraer : function() {
    return this._elements.shift();
  },


  reset : function() {
    this._elements = [];
  }
}

var listaCerrada = [];
