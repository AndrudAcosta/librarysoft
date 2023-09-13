const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
const day = String(fechaActual.getDate()).padStart(2, '0');
const hours = String(fechaActual.getHours()).padStart(2, '0');
const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
const localDate = `${year}-${month}-${day}`;
const localTime = `${hours}:${minutes}`;

const LoadDataBooking = async (idReserva) => {
  let buttons = ` `;
  let accions = ` `;
  let date = document.getElementById('fechaUpdate')
  let timeInit = document.getElementById('horaInicioUpdate')
  let timeEnd = document.getElementById('horaFinUpdate')
  try {
    const response = await fetch(`http://localhost:8282/api/bookings/listBooking/${idReserva}`);
    const reserva = await response.json();

    if (response.status === 404) {
      return;
    }
    console.log(reserva)
    const fechaReserva = reserva.fechaReserva
    const titleModal = document.getElementById('titleModalUpdateBookins')

    document.getElementById('idReserva').value = reserva.idReserva;
    document.getElementById('documentoUpdate').value = reserva.documento;
    document.getElementById('nombreUpdate').value = reserva.nombres + ' ' + reserva.apellidos;
    document.getElementById('eventoUpdate').value = reserva.evento;
    document.getElementById('descripcionUpdate').value = reserva.descripcionReserva;
    document.getElementById('fechaUpdate').value = fechaReserva.substring(0, 10);
    document.getElementById('horaInicioUpdate').value = reserva.horaInicio;
    document.getElementById('horaFinUpdate').value = reserva.horaFin;


    if (localDate >= fechaReserva.substring(0, 10) && localTime > reserva.horaInicio.substring(0, 5)) {
      date.readOnly = true;
      timeInit.readOnly = true;
      timeEnd.readOnly = true; 
      titleModal.textContent = 'VISUALIZAR'

    } else if (NameRole === 'Administrador' && localDate <= fechaReserva.substring(0, 10)) {
      date.readOnly = false;
      timeInit.readOnly = false;
      timeEnd.readOnly = false;
      buttons = `   
                  <div class="">
                    <button type="submit" id="updateBooking" onclick ="ValidationUpdateBookings()" class="btn btn-library ">Editar</button>
                    <button type="button" id="deleteBooking" onclick ="deleteBooking()" class="btn btn-libdelete">Eliminar</button>
                  </div>
                `;

      if (reserva.nombreEstado === 'Pendiente') {
        accions = `
          <div class="container-fluid text-center">
            <h6>¿Deseas cancelar o confirmar esta reserva?</h6>
            <button type="button" id="confimacionBooking" onclick ="confirmationBooking(2)" class="btn btn-confirmar">Confirmar</button>
            <button type="button" id="deleteBooking" onclick =" cancelBooking(3)" class="btn btn-cancelar ">Cancelar</button>
          </div> `
        buttons = `
                    <div class="">
                      <button type="submit" id="updateBooking" onclick ="ValidationUpdateBookings()" class="btn btn-library ">Editar</button>
                      <button type="button" id="deleteBooking" onclick ="deleteBooking()" class="btn btn-libdelete ">Eliminar</button>
                    </div>
                    `;
      }
      titleModal.textContent = 'EDITAR'
    } else if (documentoUser == reserva.documento) {
      
      buttons = `
              <div>
                <button type="submit" id="updateBooking" onclick ="ValidationUpdateBookings()" class="btn btn-library ">Editar</button>
                <button type="button" id="deleteBooking" onclick ="deleteBooking()" class="btn btn-libdelete">Eliminar</button> 
              </div>     
                `;
        titleModal.textContent = 'EDITAR'
    }
    else {
      titleModal.textContent = 'VISUALIZAR';
      date.readOnly = true;
      timeInit.readOnly = true;
      timeEnd.readOnly = true;
    }

    document.getElementById('footerModalUpdate').innerHTML = buttons;
    document.getElementById('accions').innerHTML = accions;

  } catch (error) {
    console.error('Error al cargar los datos de la reserva:', error);
  }
};

async function UpdateBooking() {
  let disponible = true;
  try {
    const idReserva = parseInt(document.getElementById('idReserva').value);
    const fechaReserva = document.getElementById('fechaUpdate').value;
    const horaInicio = document.getElementById('horaInicioUpdate').value;
    const horaFin = document.getElementById('horaFinUpdate').value
    let idEstadoReserva = 0;

    const [horaInicioNew, minutosInicioNew] = horaInicio.split(':').map(Number);
    const [horaFinNew, minutosFinNew] = horaFin.split(':').map(Number);

    if(NameRole === 'Administrador'){
      idEstadoReserva = 2
    }else{
      idEstadoReserva = 1
    }

    // Crear el objeto de datos a enviar en la solicitud PUT
    const values = {
      idReserva,
      idEstadoReserva,
      fechaReserva,
      horaInicio,
      horaFin
    };

    const response2 = await fetch(`http://localhost:8282/api/bookings/listAll`);
    const data = await response2.json();

    // Recorrer todas las reservas
    for (let i = 0; i < data.length; i++) {
      const reserva = data[i];
      const fechaReserva2 = reserva.fechaReserva.substring(0, 10);

      if (reserva.idReserva != idReserva) {
        // Verificar si la fecha coincide
        if (fechaReserva === fechaReserva2) {
          // Convertir las horas y minutos de reserva a números
          const [horaReservaInicio, minutosReservaInicio] = reserva.horaInicio.split(":").map(Number);
          const [horaReservaFin, minutosReservaFin] = reserva.horaFin.split(":").map(Number);

          // Comprobar si hay superposición en las horas y minutos
          if (
            (horaInicioNew >= horaReservaInicio && horaInicioNew < horaReservaFin) ||
            (horaInicioNew === horaReservaFin && minutosInicioNew <= minutosReservaFin)
          ) {
            disponible = false;
            break;
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
    }
    console.log(disponible)
    if (disponible == true) {
      const response = await fetch(`http://localhost:8282/api/bookings/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Reserva actualizada correctamente.',
          showConfirmButton: true, // Mostrar botón de confirmación
          confirmButtonText: 'Aceptar', // Personalizar el texto del botón de confirmación
          confirmButtonColor: '#16a084'
        });
        location.assign('reservas.php');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#16a084',
        text: 'Selecciona un espacio disponible en esta fecha.',
      });
    }
  } catch (error) {
    throw new Error('Error al actualizar reserva', error)
  }
};

async function cancelBooking(NewState) {
  try {
    const idReserva = parseInt(document.getElementById("idReserva").value)

    const confirmed = await Swal.fire({
      title: '¿Estás seguro cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    })
    if (confirmed.isConfirmed === true) {

      const response1 = await fetch('http://localhost:8282/api/bookings/emailCancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idReserva: idReserva })
      });
      if (!response1.ok) {
        throw new Error('Error al enviar correo de eliminacion de la reserva')
      }

      const response = await fetch('http://localhost:8282/api/bookings/updateStateBooking', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idReserva: idReserva, idEstadoReserva: NewState })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reserva')
      } else {
        await Swal.fire({
          confirmButtonColor: '#16a084',
          icon: 'success',
          title: 'Reserva cancelada.',
          text: 'Reserva cancelada exitosamente.',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
        location.assign('reservas.php');
        reset();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function confirmationBooking(NewState) {
  try {
    const idReserva = parseInt(document.getElementById("idReserva").value)

    const confirmed = await Swal.fire({
      title: '¿Estás seguro de confirmar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    })
    if (confirmed.isConfirmed === true) {

      const response1 = await fetch('http://localhost:8282/api/bookings/emailConfirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idReserva: idReserva })
      });
      if (!response1.ok) {
        throw new Error('Error al enviar correo de eliminacion de la reserva')
      }

      const response = await fetch('http://localhost:8282/api/bookings/updateStateBooking', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idReserva: idReserva, idEstadoReserva: NewState })
      });

      if (!response.ok) {
        throw new Error('Error al confirmar la reserva')
      } else {
        await Swal.fire({
          confirmButtonColor: '#16a084',
          icon: 'success',
          title: 'Reserva confirmada.',
          text: 'Reserva confirmada exitosamente.',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
        location.assign('reservas.php');
        reset();
      }
    }
  } catch (error) {
    console.error(error);
  }
}