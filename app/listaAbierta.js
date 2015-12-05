/**
 * Implementación de la lista abierta mediante un árbol binario
 *
 * Esta implementación permite que las operaciones de "insertar" y "extraer"
 * tengan una complejidad O(n) = log2(n)
 */
var listaAbierta = {
  // Campos y funciones auxiliares privadas

  // Array con todos los elementos de la lista abierta
  _elements : [],

  // Funciones para calcular los índices de los elementos
  // "padre", "hijo izquierdo" e "hijo derecho"
  _padre : function(i) {return parseInt((i-1)/2)},
  _izq   : function(i) {return i*2+1},
  _dch   : function(i) {return i*2+2},

  // Intercambia la posición entre dos elementos del array
  _swap  : function(i,j) {
    var tmp = this._elements[i];
    this._elements[i] = this._elements[j];
    this._elements[j] = tmp;
  },

  // Recorre el árbol hacia arriba desde el nodo "i".
  //
  // En cada iteración, asegura que el elemendo del nodo "i" está correctamente
  // colocado con respecto a su nodo padre.
  _recorrerArriba : function(i) {
    if (i>0 && this._elements[i] < this._elements[this._padre(i)]) {
      this._swap(i, this._padre(i));
      this._recorrerArriba(this._padre(i));
    }
  },

  // Recorre el árbol hacia abajo desde el nodo "i".
  //
  // En cada iteración, verifica que el nodo "i" está bien colocado con
  // respecto a sus nodos hijos.
  _recorrerAbajo : function(i) {
    if (i>this._elements.length) return;

    var mayor;
    if (this._dch(i) >= this._elements.length) {
      mayor = this._izq(i);
    } else if (this._elements[this._izq(i)] > this._elements[this._dch(i)]) {
      mayor = this._izq(i);
    } else {
      mayor = this._dch(i);
    }

    if ( this._elements[i] > this._elements[mayor]) {
      this._swap(i, mayor);
      this._recorrerAbajo(mayor);
    }
  },
  
  /**
   * Inserta un elemento en el árbol en su posición correcta.
   */
  insertar : function(e) {
    this._elements.push(e);
    this._recorrerArriba(this._elements.length-1);
  },

  /**
   * Extrae el menor elemento del árbol retornándolo
   */
  extraer  : function() {
    var ret = this._elements[0];
    var ultimo = this._elements.pop();

    if (this._elements.length>0) {
      this._elements[0] = ultimo;
    }
    this._recorrerAbajo(0);
    return ret;
  }
}
