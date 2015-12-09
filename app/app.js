/**
 * Controlador de la aplicación. Interactúa de manera bidireccional con el DOM
 * - Procesa los datos y los inyecta en la página
 * - Recoge las interacciones del usuario con los diferentes elementos
 */
'use strict';

(function() {
  // Cargar los datos
  console.log("Comenzando...");
  datos.estaciones(function(i, estacion) {
    $('#origen').append($('<option>').val(estacion.id).text(estacion.nombre));
    $('#destino').append($('<option>').val(estacion.id).text(estacion.nombre));
  });




  // Cuando el usuario envía el formulario...
  $('#formulario').submit(function() {
    console.log("Formulario enviado!");
    //var origen  = datos.estacion($('#origen').val());
    //var destino = datos.estacion($('#destino').val());
    algoritmo.ejecutar(datos.estacion(0), datos.estacion(12), 10*60+3);
    
  });
})();
