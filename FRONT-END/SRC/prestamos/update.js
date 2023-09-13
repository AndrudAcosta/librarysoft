// Declaración del array para almacenar los libros seleccionados
const librosArrayUpdate = [];

let idPrestamoGlobal;
let estadosDisponibles = []; // Variable para almacenar los estados disponibles
let todosLibrosDevueltos = false;


const cargarEstadoEjemplar = async (idEjemplar, idEstadoEjemplar) => {
  try {
    const response = await fetch('http://localhost:8282/api/prestamos/todosE/estadosEjemplares');
    if (!response.ok) {
      throw new Error('Error al obtener los estados de los ejemplares');
    }
    const data = await response.json();
    estadosDisponibles = data; // Almacena los estados disponibles
    const selectEstados = document.getElementById(`SelectEstados_${idEjemplar}`);
    selectEstados.innerHTML = '';

    const estadosMostrados = data.filter(estado => {
      return estado.nombre === 'Buen estado' ||
        estado.nombre === 'Regular' ||
        estado.nombre === 'Perdido';
    });

    estadosMostrados.forEach((estado) => {
      const option = document.createElement('option');
      option.value = estado.id;
      option.text = estado.nombre;

      if (estado.id === idEstadoEjemplar) {
        option.selected = true;
      }

      selectEstados.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los estados de los ejemplares en el select:', error);
  }
};


const verPrestamoUpdate = (idPrestamo) => {
  fetch(`http://localhost:8282/api/prestamos/todosU/${idPrestamo}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al obtener el préstamo:', data.error);
      } else {
        const prestamo = data;

        // Crear una tabla de DataTables
        const table = $('#tablaLibrosPrestamoU').DataTable();
        table.clear().draw();

        // Lógica para manejar eventos de cambio en el select y el switch
        prestamo.libros.forEach((libro) => {
          const idEjemplar = libro.idEjemplar;


          // Verificar si el idEstadoLibro es igual a 0 y el switch se debe activar
          const isChecked = libro.idEstadoLibro === 0 ? 'checked' : '';

          let tableRow = `
              <tr>
                <td scope="col">${libro.isbn}</td>
                <td scope="col">${libro.titulo}</td>
                <td scope="col">${libro.ejemplar}</td>
                <td style="text-align: center;">
                  <select class="form-select" aria-label="select example" id="SelectEstados_${idEjemplar}" name="SelectEstados_${idEjemplar}" ${libro.idEstadoLibro === 0 ? 'disabled' : ''}>
                  </select>
                </td>
                <td style="text-align: center;">
                  <div class="form-check form-switch">
                    <input type="checkbox" id="mySwitch_${idEjemplar}" name="mySwitch_${idEjemplar}" class="form-check-input" ${libro.idEstadoLibro === 0 ? 'checked disabled' : isChecked}>
                  </div>
                </td>
              </tr>
            `;

          table.row.add($(tableRow)).draw();


          const todosDevueltos = prestamo.libros.every(libro => libro.idEstadoLibro === 0);

          if (todosDevueltos) {
            todosLibrosDevueltos = true;
          }

          // Luego, asignar el evento onchange al select
          if (libro.idEstadoLibro !== 0) {
            const select = document.getElementById(`SelectEstados_${idEjemplar}`);
            select.onchange = () => {
              handleSelectChange(libro, idPrestamo); // Llamar a la función handleSelectChange al cambiar el select
            };
          }

          // Realizar la conversión de valores numéricos a cadenas de texto
          let estadoTexto = '';
          switch (libro.idEstadoPrestamo) {
            case 1:
              estadoTexto = 'Prestado';
              break;
            case 2:
              estadoTexto = 'Devuelto';
              break;
            case 3:
              estadoTexto = 'No Devuelto';
              break;
            case 4:
              estadoTexto = 'Perdido';
              break;
            default:
              estadoTexto = 'Desconocido';
          }

          // Agregar la opción al select
          const selectEstados = document.getElementById(`SelectEstados_${idEjemplar}`);
          selectEstados.innerHTML = `
            <option value="${libro.idEstadoPrestamo}">${estadoTexto}</option>
          `;

          // Llena los datos del select aquí utilizando cargarEstadoEjemplar o como sea necesario
          if (libro.idEstadoLibro !== 0) {
            cargarEstadoEjemplar(idEjemplar, libro.idEstadoEjemplar);
          }

          const switchElement = document.getElementById(`mySwitch_${idEjemplar}`);
          switchElement.addEventListener('change', () => {
            handleSwitchChange(libro, idPrestamo, switchElement.checked);
          });
        });

        // Asignar otros datos a los inputs si es necesario
        document.getElementById('DocumentoU').value = prestamo.beneficiario.usuario.documento;
        document.getElementById('NombreU').value = prestamo.beneficiario.nombres;
        document.getElementById('apellidosU').value = prestamo.beneficiario.apellidos;
        document.getElementById('RolU').value = prestamo.beneficiario.usuario.rol;
        document.getElementById('FechaInicioU').value = formatDate(prestamo.fechaInicio);
        document.getElementById('FechaCompromisoU').value = formatDate(prestamo.fechaCompromiso);

        idPrestamoGlobal = idPrestamo;
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
};



const handleSwitchChange = (libro, idPrestamo, isChecked) => {
  const select = document.getElementById(`SelectEstados_${libro.idEjemplar}`);

  if (isChecked) {
    // Agregar el libro al array de librosArrayUpdate
    librosArrayUpdate.push({
      idEjemplar: libro.idEjemplar,
      idEstadoEjemplar: parseInt(select.value)
    });
  } else {
    // Remover el libro del array de librosArrayUpdate si ya no está seleccionado
    const index = librosArrayUpdate.findIndex(item => item.idEjemplar === libro.idEjemplar);
    if (index !== -1) {
      librosArrayUpdate.splice(index, 1);
    }
  }
};





const handleSelectChange = (libro, idPrestamo) => {
  const select = document.getElementById(`SelectEstados_${libro.idEjemplar}`);
  const newValue = select.value;
};


const actualizarPrestamo = async () => {
  if (todosLibrosDevueltos) {
    // Muestra la alerta indicando que la devolución ya finalizó
    await Swal.fire({
      icon: 'info',
      title: 'Devolución finalizada',
      text: 'La devolución ya ha sido completada. No es posible realizar más cambios.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  if (librosArrayUpdate.length === 0) {
    // Muestra un mensaje de error o notificación al usuario
    console.error('.');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes de confirmar al menos un ejemplar para realizar la devolución.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
  try {
    // Envía el array de librosArrayUpdate junto con el idPrestamo
    const requestBody = {
      idPrestamo: idPrestamoGlobal, // Usa idPrestamoGlobal aquí en lugar de idPrestamo
      libros: librosArrayUpdate
    };

    const response = await fetch(`http://localhost:8282/api/prestamos/actualizar/${idPrestamoGlobal}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el préstamo');
    }

    const responseData = await response.json();

    // Mostrar una notificación de éxito
    await Swal.fire({
      icon: 'success',
      title: 'La devolucion se efectuo con exito.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });

    // Redirigir a la página de listado de préstamos
    window.location.href = 'préstamos.php';
  } catch (error) {
    console.error('Error al actualizar el préstamo:', error);
  }
};