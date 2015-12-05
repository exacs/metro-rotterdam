/**
 * Controlador de la aplicación. Interactúa de manera bidireccional con el DOM
 * - Procesa los datos y los inyecta en la página
 * - Recoge las interacciones del usuario con los diferentes elementos
 */
'use strict';

(function() {
  // Cargar los datos
  datos.estaciones(function(i, estacion) {
    $('#origen').append($('<option>').val(estacion.id).text(estacion.nombre));
    $('#destino').append($('<option>').val(estacion.id).text(estacion.nombre));
  });

  // TODO
  // Dibujar el mapa


  // Cuando el usuario envía el formulario...
  $('#formulario').submit(function() {
    // TODO
    console.log("Formulario enviado!");
  });
})();
