const verPrestamo = (idPrestamo) => {
  fetch(`http://localhost:8282/api/prestamos/${idPrestamo}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al obtener el préstamo:', data.error);
      } else {
        const prestamo = data;
        const table = $('#tablaLibrosPrestamo').DataTable();
        table.clear().draw();

        prestamo.libros.forEach((libro) => {
          const isbn = libro.isbn;
          const titulo = libro.titulo;
          const ejemplar = libro.ejemplar;
          const fechaDevolucion = formatDate(libro.fechaDevolucion);
          const estadoPrestamo = libro.estadoPrestamo;

          let tableLibrosPrestamo = `
            <tr>
              <td scope="col">${isbn}</td>
              <td scope="col">${titulo}</td>
              <td scope="col">${ejemplar}</td>
              <td scope="col">${fechaDevolucion}</td>
              <td scope="col">${estadoPrestamo}</td>
            </tr>
          `;

          table.row.add($(tableLibrosPrestamo)).draw();
        });

        // Asignar otros datos a los inputs si es necesario
        document.getElementById('DocumentoV').value = prestamo.beneficiario.usuario.documento;
        document.getElementById('NombreV').value = prestamo.beneficiario.nombres;
        document.getElementById('apellidosV').value = prestamo.beneficiario.apellidos;
        document.getElementById('RolV').value = prestamo.beneficiario.usuario.rol;
        document.getElementById('FechaInicioV').value = formatDate(prestamo.fechaInicio);
        document.getElementById('FechaCompromisoV').value = formatDate(prestamo.fechaCompromiso);
        document.getElementById('EstadoV').value = prestamo.estadoPrestamo;
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
};


// Función para formatear fechas en formato legible
function formatDate(dateString) {
  // Si la fecha no está definida, es nula o no es un valor válido, retornar el mensaje 'Sin fecha'
  if (!dateString || dateString === '0000-00-00' || dateString === '1970-01-01') {
    return 'Sin fecha';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) { // Verificar si la fecha no es un valor válido
    return 'Sin fecha';
  }

  return date.toLocaleDateString(); // Puedes personalizar el formato de fecha según tus preferencias
}

