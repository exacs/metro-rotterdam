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
    var origen  = datos.estacion($('#origen').val());
    var destino = datos.estacion($('#destino').val());
    var horaStr = $('#hora').val().split(":");
    var hora = parseInt(horaStr[0], 10)*60 + parseInt(horaStr[1]);

    algoritmo.ejecutar(origen, destino, hora, function(listaCerrada) {
      var horaStr = $('#hora').val().split(":");
      var hora = parseInt(horaStr[0], 10)*60 + parseInt(horaStr[1]);

      // Tomar el último elemento y crear la secuencia de pasos
      var pasos = [];
      
      // Iterar hacia atrás a través del último nodo de la lista cerrada
      var iterador = listaCerrada[listaCerrada.length-1];
      while (typeof iterador.anterior !=='undefined') {
        var nuevoPaso = {
          hora     : hora + iterador.g,
          estacion : iterador.estacion,
          linea : iterador.tren.linea
        }

        if (iterador.estacion.id==destino.id) {
          nuevoPaso.accion = 'fin';
        } else if (iterador.estacion.id==origen.id) {
          nuevoPaso.accion = 'inicio';
        } else if (iterador.estacion.id==iterador.anterior.estacion.id) {
          nuevoPaso.accion = 'trasbordo';
        } else {
          nuevoPaso.accion = 'avance';
        }

        pasos.unshift(nuevoPaso);
        iterador = iterador.anterior;
      }

      // Inyectar en el DOM
      $('#pasos').html('');
      $.each(pasos, function(i, paso) {
        var fila = '<tr class="paso ' + paso.accion + '">';
        fila += '<td class="hora">' + paso.hora + '</td>';
        fila += '<td class="tren">' + paso.linea + '</td>';
        fila += '<td class="texto">' + paso.accion + paso.estacion.nombre + '</td>';
        fila += '</tr>';
        $('#pasos').append(fila);
      });

    });
    //algoritmo.ejecutar(datos.estacion(39), datos.estacion(7), 732);
  });
})();
