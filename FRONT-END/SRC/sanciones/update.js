const obtenerSancion = (idSancion) => {
  fetch(`http://localhost:8282/api/sanciones/${idSancion}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al obtener la sancion:', data.error);
        // Manejo del error en caso de que ocurra
      } else {
        const sancion = data;
        document.getElementById('idSancion').value = sancion.idSancion;
        document.getElementById('nombresU').value = sancion.nombres;
        document.getElementById('apellidosU').value = sancion.apellidos;
        document.getElementById('sancionU').value = sancion.nombreTipo;
        document.getElementById('estadoU').value = sancion.nombreEstado;

        const fechaInicio = new Date(sancion.fechaAsignacion);
        const opcionesInicio = { year: 'numeric', month: '2-digit', day: '2-digit' };
        document.getElementById('inicioU').value = fechaInicio.toLocaleDateString(undefined, opcionesInicio);

        const fechaFinal = new Date(sancion.fechaCierre);
        const opcionesFinal = { year: 'numeric', month: '2-digit', day: '2-digit' };
        document.getElementById('finalU').value = fechaFinal.toLocaleDateString(undefined, opcionesFinal);

        document.getElementById('observacionU').value = sancion.observacion;

        // const modal = new bootstrap.Modal(document.getElementById('EditSan'));
        // modal.show();
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      // Manejo del error en caso de que ocurra
    });
};

//FUNCION PARA CARGAR LOS TIPOS DE SANCIONES EN SELECT
const cargarTiposEnSelectU = async () => {
  try {
    const tsancion = await obtenerTsanciones();
    const selectTipo = document.getElementById('sancionU');
    tsancion.forEach((sancion) => {
      const option = document.createElement('option');
      option.value = sancion.nombreTipo;
      option.text = sancion.nombreTipo;
      selectTipo.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los roles en el select:', error);
  }
};
cargarTiposEnSelectU();


//FUNCION PRA CARGAR LOS ESTADOS DE SANCIONES EN SELECT
const cargarEstadoEnSelectU = async () => {
  try {
    const esancion = await obtenerEsanciones();
    const selectEstado = document.getElementById('estadoU');
    esancion.forEach((sancion) => {
      const option = document.createElement('option');
      option.value = sancion.nombreEstado;
      option.text = sancion.nombreEstado;
      selectEstado.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los roles en el select:', error);
  }
};
cargarEstadoEnSelectU();



// Función para actualizar los datos de la sanción
const actualizarSancion = (idSancion, datosActualizados) => {
  fetch(`http://localhost:8282/api/sanciones/update/${idSancion}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosActualizados)
  })
    .then(response => response.json())
    .then(async data => {
      await Swal.fire({
        icon: 'success',
        title: 'Sanción actualizada exitosamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16a084'
      });
      location.assign('sanciones.php');
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
};

// Obtener el botón de actualizar
const botonActualizar = document.getElementById('actualizar');

// Agregar evento de escucha al botón
botonActualizar.addEventListener('click', async () => {
  // Obtener el valor del campo observacion
  const nuevosObservacion = document.getElementById('observacionU').value;

  // Validar que el campo observacion no esté vacío
  if (nuevosObservacion === '') {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingresa una Observacion valida.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  // Si el campo observacion no está vacío, continuar con la actualización
  // Obtener los nuevos valores del formulario o de los elementos HTML
  const idSancion = document.getElementById('idSancion').value;
  const nuevoEstado = document.getElementById('estadoU').value;
  const nuevoTipo = document.getElementById('sancionU').value;

  // Crear el objeto datosActualizados con los nuevos valores
  const datosActualizados = {
    nombreEstado: nuevoEstado,
    nombreTipo: nuevoTipo,
    observacion: nuevosObservacion
  };

  // Llamar a la función actualizarSancion para enviar la solicitud PUT
  actualizarSancion(idSancion, datosActualizados);
});

