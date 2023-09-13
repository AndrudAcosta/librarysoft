async function AddBooking() {
  let idEstadoReserva = 1
  let documento = document.getElementById('documentoAdd').value
  let descripcion = document.getElementById('descripcionAdd').value



  if (NameRole === 'Administrador') {
    idEstadoReserva = 2
  }

  if (documento.length === 0 || documento === " ") {
    documento = documentoUser
  }

  if (descripcion.length === 0 || descripcion === " ") {
    descripcion = 'Ninguna'
  }

  const newBooking = {
    documento: documento,
    idEstadoReserva: idEstadoReserva,
    evento: document.getElementById('eventoAdd').value,
    descripcionReserva: descripcion,
    fechaReserva: document.getElementById('fechaAdd').value,
    horaInicio: document.getElementById('horaInicioAdd').value,
    horaFin: document.getElementById('horaFinAdd').value,
  };

  try {
    const response = await fetch('http://localhost:8282/api/bookings/addBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBooking)
    });

    if (!response.ok) {
      throw new Error('Error al agregar la reserva')
    } else if (NameRole === 'Administrador') {
      await Swal.fire({
        confirmButtonColor: '#16a084',
        icon: 'success',
        title: 'Reserva registrada exitosamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar' 
      });
      location.assign('reservas.php');
      reset();
    }else{
      await Swal.fire({
        confirmButtonColor: '#16a084',
        icon: 'success',
        title: 'Reserva por confirmar.',
        text: 'Al correo te llegará la confirmación o cancelación de la reserva.',
        showConfirmButton: true, 
        confirmButtonText: 'Aceptar'
      });
      location.assign('reservas.php');
      reset();
    }
  } catch (error) {
    console.error(error);
  }
}

async function AddBookings() {
  const fecha = document.getElementById('fechaAdd').value;
  const horaInicio = document.getElementById('horaInicioAdd').value;
  const horaFin = document.getElementById('horaFinAdd').value;

  // Convertir las horas y minutos de inicio y fin a números
  const [horaInicioNew, minutosInicioNew] = horaInicio.split(':').map(Number);
  const [horaFinNew, minutosFinNew] = horaFin.split(':').map(Number);

  // Obtener la lista de reservas desde la API
  const response = await fetch(`http://localhost:8282/api/bookings/listAll`);
  const data = await response.json();

  let disponible = true;

  // Recorrer todas las reservas
  for (let i = 0; i < data.length; i++) {
    const reserva = data[i];
    const fechaReserva = reserva.fechaReserva.substring(0, 10);

    // Verificar si la fecha coincide
    if (fecha === fechaReserva) {
      // Convertir las horas y minutos de reserva a números
      const [horaReservaInicio, minutosReservaInicio] = reserva.horaInicio.split(":").map(Number);
      const [horaReservaFin, minutosReservaFin] = reserva.horaFin.split(":").map(Number);

      // Comprobar si hay superposición en las horas y minutos
      if (
        (horaInicioNew >= horaReservaInicio && horaInicioNew < horaReservaFin) ||
        (horaInicioNew === horaReservaFin && minutosInicioNew <= minutosReservaFin)
      ) {
        disponible = false;
        break; // No es necesario seguir buscando si ya encontramos una reserva que choca con el horario
      }

      if (
        (horaFinNew > horaReservaInicio) ||
        (horaFinNew === horaReservaInicio && minutosFinNew >= minutosReservaInicio)
      ) {
        if (
          (horaFinNew < horaReservaFin) ||
          (horaFinNew === horaReservaFin && minutosFinNew <= minutosReservaFin)
        ) {
          disponible = false;
          break;
        }
      }
    }
  }

  if (disponible) {
    AddBooking()
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      confirmButtonColor: '#16a084',
      text: 'Selecciona un espacio disponible en esta fecha.',
    });
  }
}


function definirFecha() {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const day = String(fechaActual.getDate()).padStart(2, '0');
  $('#fechaAdd').attr('min', `${year}-${month}-${day}`);
}
