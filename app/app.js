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
      var origen  = datos.estacion($('#origen').val());
      var destino = datos.estacion($('#destino').val());

      // Tomar el último elemento y crear la secuencia de pasos
      var pasos = [];
      
      // Iterar hacia atrás a través del último nodo de la lista cerrada
      var iterador = listaCerrada[listaCerrada.length-1];
      while (typeof iterador.anterior !=='undefined') {
        var nuevoPaso = {
          hora     : iterador.tren.hora,
          estacion : iterador.estacion,
          linea : iterador.tren.linea
        }

        if (iterador.estacion.id==destino.id) {
          nuevoPaso.accion = 'fin';
          nuevoPaso.estacionAnterior = iterador.anterior.estacion;
        } else if (iterador.estacion.id==origen.id) {
          nuevoPaso.accion = 'inicio';
          nuevoPaso.sentido = '';
        } else if (iterador.estacion.id==iterador.anterior.estacion.id) {
          nuevoPaso.accion = 'trasbordo';
          nuevoPaso.lineaAnterior = iterador.anterior.tren.linea;
          nuevoPaso.sentido = '';
        } else {
          nuevoPaso.accion = 'avance';
          nuevoPaso.estacionAnterior = iterador.anterior.estacion;
        }

        pasos.unshift(nuevoPaso);
        iterador = iterador.anterior;
      }

      // Inyectar en el DOM
      $('#pasos tbody').html('');
      $.each(pasos, function(i, paso) {
        var fila = $('<tr class="paso"></tr>');
        fila.append('<td class="hora">' + algoritmo._hora(paso.hora) + '</td>');

        fila.addClass('accion-' + paso.accion);
        fila.addClass('linea-' + paso.linea);

        var tren = $('<td class="tren"></td>');
        var texto = $('<td class="texto"></td>');
        switch (paso.accion) {
          case 'inicio':
            tren.append('<div class="linea linea-' + paso.linea + '">' + paso.linea + '</div>');
            texto.html(paso.estacion.nombre);
          break;

          case 'trasbordo':
            tren.append('<div class="linea linea-' + paso.lineaAnterior + '">' + paso.lineaAnterior + '</div>');
            tren.append('<div class="linea linea-' + paso.linea + '">' + paso.linea + '</div>');
            texto.html('Trasbordo en ' + paso.estacion.nombre);
          break;

          case 'avance':
            tren.append('<div class="marca linea-' + paso.linea + '"></div>');
            texto.html(paso.estacion.nombre);
          break;

          case 'fin':
            tren.append('<div class="linea linea-' + paso.linea + '">' + paso.linea + '</div>');
            texto.html(paso.estacion.nombre);
          break;
        }

        fila.append(tren);
        fila.append(texto);

        $('#pasos tbody').append(fila);
      });
  
      // Modificar el dibujo SVG
      datos.cargarTramos(function() {
        console.log(pasos);

        var mapa = d3.select(document.getElementById('mapa'));

        mapa.classed('iluminado', true);
        mapa.selectAll('.destacado').classed('destacado', false);
        $.each(pasos, function(i, paso) {
          if (paso.accion=='avance' || paso.accion=='fin') {
            var tramoId = datos.tramo(paso.estacion.id, paso.estacionAnterior.id, paso.linea);
            mapa.selectAll('#tramo-' + tramoId).classed('destacado', true);
            console.log(tramoId); 
          }
        });
      });
    });
    //algoritmo.ejecutar(datos.estacion(39), datos.estacion(7), 732);
  });
})();
