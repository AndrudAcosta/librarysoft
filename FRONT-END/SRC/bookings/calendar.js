const valueDocumento = document.getElementById("valor-documento");
const documentoUser = valueDocumento.getAttribute("data-valor");
const valueNameRol = document.getElementById("valor-container");
const NameRole = valueNameRol.getAttribute("data-valor");

const nameUserComplet = document.getElementById("valor-container-nameUser");
const nameUser = nameUserComplet.getAttribute("data-valor");


document.addEventListener('DOMContentLoaded', function () {
  load();
  let modalUpdateBooking = new bootstrap.Modal(document.getElementById('modalUpdateReserva'));
  let modalAddBooking = new bootstrap.Modal(document.getElementById('modalAddReserva'));
  let calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'local',
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth timeGridWeek listWeek'
    },
    themeSystem: 'bootstrap',
    slotEventOverlap: false,
    nowIndicator: true,
    weekNumberCalculation: 'ISO',
    hiddenDays: [0, 6],
    displayEventTime: true,
    dayMaxEvents: true,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Configura el formato de 12 horas
    },
    dateClick: function (info) {
      if (localDate > info.dateStr) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: '#16a084',
          text: 'Seleccione una fecha futura.',
        })
      } else {
        definirFecha();
        document.getElementById('fechaAdd').value = info.dateStr
        if (NameRole === "Administrador") {
          let otherDocument = `
            <label for="otherDocument">Préstamo para otra persona?</label>
            <input type="checkbox" id="otherDocument">
          `;
          document.getElementById('CheckDocument').innerHTML = otherDocument;
          const checkbox = document.getElementById('otherDocument');
          const divDocumento = document.getElementById('documento_div');

          console.log(checkbox, divDocumento)

          checkbox.addEventListener('change', function () {
            // Si el checkbox está marcado, muestra el div, de lo contrario, ocúltalo
            if (checkbox.checked) {
              divDocumento.style.display = 'block';
            } else {
              divDocumento.style.display = 'none';
              documentoAdd.value = '';
              documentoAdd.classList.remove('is-valid', 'is-invalid');
            }
          });
        }
        modalAddBooking.show();
      }
    },
    eventClick: function (info) {
      LoadDataBooking(info.event.id)
      modalUpdateBooking.show();
    },

  });

  const listBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8282/api/bookings/listAll`);
      if (response.status === 200) {
        const data = await response.json();
        const events = data.map(item => {
          let nameEvent = `${item.nombres} ${item.apellidos}`

          if (nameUser == nameEvent) {
            nameEvent = 'Mi reserva'
          }

          return {
            id: `${item.idReserva}`,
            title: nameEvent,
            start: `${item.fechaReserva.substring(0, 10)}T${item.horaInicio}`,
            end: `${item.fechaReserva.substring(0, 10)}T${item.horaFin}`,
            backgroundColor: colorEvent(item.nombreEstado),
          };
        });
        calendar.addEventSource(events);
      } else if (response.status === 404) {
        console.log('Bookings no existen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  listBookings();
  calendar.render();
  setTimeout(() => {
    closeLoad()
  }, 1000)
})

function colorEvent(estado) {
  switch (estado) {
    case 'Confirmada':
      return 'green'; // Color para eventos confirmados
    case 'Pendiente':
      return 'rgb(192, 192, 31)'; // Color para eventos pendientes
    case 'Cancelada':
      return 'red'; // Color para eventos cancelados
    default:
      return 'gray'; // Color por defecto para otros estados
  }
}



