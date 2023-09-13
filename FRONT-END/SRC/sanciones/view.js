const verSancion = (idSancion) => {
    fetch(`http://localhost:8282/api/sanciones/${idSancion}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error al obtener la sancion:', data.error);
          // Manejo del error en caso de que ocurra
        } else {
          const sancion = data;
          document.getElementById('nombresV').value = sancion.nombres;
          document.getElementById('apellidosV').value = sancion.apellidos;
          document.getElementById('sancionV').value = sancion.nombreTipo;
          document.getElementById('estadoV').value = sancion.nombreEstado;
  
          const fechaInicio = new Date(sancion.fechaAsignacion);
          const opcionesInicio = { year: 'numeric', month: '2-digit', day: '2-digit' };
          document.getElementById('inicioV').value = fechaInicio.toLocaleDateString(undefined, opcionesInicio);
  
          const fechaFinal = new Date(sancion.fechaCierre);
          const opcionesFinal = { year: 'numeric', month: '2-digit', day: '2-digit' };
          document.getElementById('finalV').value = fechaFinal.toLocaleDateString(undefined, opcionesFinal);
  
          document.getElementById('observacionV').value = sancion.observacion;
  
          // const modal = new bootstrap.Modal(document.getElementById('EditSan'));
          // modal.show();
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Manejo del error en caso de que ocurra
      });
  };