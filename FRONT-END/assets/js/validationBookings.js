//--------------------------------------- PARA EL MODAL DE REGISTRO DE LIBROS---------------------------------------------------
const documentoAdd = document.getElementById('documentoAdd');
const eventoAdd = document.getElementById('eventoAdd');
const descripcionAdd = document.getElementById('descripcionAdd');
const fechaAdd = document.getElementById('fechaAdd');
const horaInicioAdd = document.getElementById('horaInicioAdd');
const horaFinAdd = document.getElementById('horaFinAdd');


function compararHoras(hora1, hora2) {
    const [hora1Horas, hora1Minutos] = hora1.split(":").map(Number);
    const [hora2Horas, hora2Minutos] = hora2.split(":").map(Number);

    if (hora1Horas < hora2Horas) {
        return -1; // hora1 es anterior a hora2
    } else if (hora1Horas > hora2Horas) {
        return 1; // hora1 es posterior a hora2
    } else {
        // Las horas son iguales, comparar minutos
        if (hora1Minutos < hora2Minutos) {
            return -1;
        } else if (hora1Minutos > hora2Minutos) {
            return 1;
        } else {
            return 0; // Las horas y minutos son iguales
        }
    }
}
async function verificarDuplicadoPorDocumento(documento) {
    try {
      const validarResponse = await fetch('http://localhost:8282/api/usuarios/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ documento })
      });
  
      const validationResult = await validarResponse.json();
  
      return validationResult.data.error === 'El documento ya está registrado';
    } catch (error) {
      // Manejar el error aquí si es necesario
      return false;
    }
  }

documentoAdd.addEventListener('input',async () => {
        const isDuplicated = await verificarDuplicadoPorDocumento(documentoAdd.value);
        if (isDuplicated) {
            documentoAdd.classList.add('is-valid');
            documentoAdd.classList.remove('is-invalid')
        } else { 
        documentoAdd.classList.add('is-invalid');
    }
});

eventoAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(eventoAdd.value)) {
        eventoAdd.classList.add('is-valid');
        eventoAdd.classList.remove('is-invalid')
    } else {
        eventoAdd.classList.add('is-invalid');
    }
});

descripcionAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., -]+$/.test(descripcionAdd.value)) {
        descripcionAdd.classList.add('is-valid');
        descripcionAdd.classList.remove('is-invalid')
    } else {
        descripcionAdd.classList.add('is-invalid');
    }
});

fechaAdd.addEventListener('input', () => {
    const fechaAdd1 = document.getElementById('fechaAdd').value;
    if (fechaAdd1) {
        const selectedDate = new Date(fechaAdd1);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Solo se permiten reservas de lunes a viernes!!!',
            })
            fechaAdd.classList.add('is-invalid');
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(fechaAdd.value)) {
            fechaAdd.classList.add('is-valid');
            fechaAdd.classList.remove('is-invalid')
        } else {
            fechaAdd.classList.add('is-invalid');
        }
    }

});

horaInicioAdd.addEventListener('input', () => {
    if (/^(08|09|10|11|12|14|15|):[0-5][0-9]$/.test(horaInicioAdd.value) || /^(|13||16|):00$/.test(horaInicioAdd.value)) {
        horaInicioAdd.classList.add('is-valid');
        horaInicioAdd.classList.remove('is-invalid')
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Recuerda que los horarios son de 8am a 1pm y 2pm a 4pm',
        })
        horaInicioAdd.classList.add('is-invalid');
    }
});

horaFinAdd.addEventListener('input', async () => {
    let horas = compararHoras(horaInicioAdd.value, horaFinAdd.value);

    if (/^(08|09|10|11|12|14|15):[0-5][0-9]$/.test(horaFinAdd.value) || /^(|13||16|):00$/.test(horaFinAdd.value)&& horas === -1) {
        horaFinAdd.classList.add('is-valid');
        horaFinAdd.classList.remove('is-invalid')
    } else if (horas === 1) {
        horaFinAdd.classList.add('is-invalid');
    } else if (horas === 0) {
        horaFinAdd.classList.add('is-invalid');
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Recuerda que los horarios son de 8am a 1pm y 2pm a 4pm',
        })
        horaFinAdd.classList.add('is-invalid');
    }
});

document.getElementById('addBooking').addEventListener('click', (e) => {
    let horas = compararHoras(horaInicioAdd.value, horaFinAdd.value);
    if (eventoAdd.value === '' && horaInicioAdd.value === "" && horaFinAdd.value === "") {
        eventoAdd.classList.add('is-invalid');
        horaInicioAdd.classList.add('is-invalid');
        horaFinAdd.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!',
        })
    }else if (documentoAdd.classList.contains('is-invalid')) {
        documentoAdd.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo documento correctamente!',
        })
    } 
    else if (eventoAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(eventoAdd.value)) {
        eventoAdd.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo evento correctamente!',
        })
    }
    else if (fechaAdd.length == 0 || !/^\d{4}-\d{2}-\d{2}$/.test(fechaAdd.value)) {
        fechaAdd.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo fecha correctamente!',
        })
    }
    else if (horaInicioAdd.length === 0 || horaInicioAdd.classList.contains('is-invalid')) {
        horaInicioAdd.classList.add('is-invalid');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo hora de inicio correctamente!',
        })
    }
    else if (horaFinAdd.length === 0 || horaFinAdd.classList.contains('is-invalid') || horas === 0 || horas === 1) {
        horaFinAdd.classList.add('is-invalid');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo hora de finalización correctamente!',

        })
    }else{
        AddBookings()
    }
});

document.getElementById('closeModalAddBooking').addEventListener('click', (e) => {
    eventoAdd.value = '';
    documentoAdd.value = '';
    fechaAdd.value = '';
    horaInicioAdd.value = '';
    horaFinAdd.value = '';
    descripcionAdd.value = '';
    // Remover las clases de validación e invalidación de los campos
    documentoAdd.classList.remove('is-valid', 'is-invalid');
    eventoAdd.classList.remove('is-valid', 'is-invalid');
    fechaAdd.classList.remove('is-valid', 'is-invalid');
    horaInicioAdd.classList.remove('is-valid', 'is-invalid');
    horaFinAdd.classList.remove('is-valid', 'is-invalid');
    descripcionAdd.classList.remove('is-valid', 'is-invalid');
});

const checkbox = document.getElementById('otherDocument');
const divDocumento = document.getElementById('documento_div');

//--------------------------------------- PARA EL MODAL DE ACTUALIZAR RESERVA---------------------------------------------------

const fechaUpdate = document.getElementById('fechaUpdate');
const horaInicioUpdate = document.getElementById('horaInicioUpdate');
const horaFinUpdate = document.getElementById('horaFinUpdate');


fechaUpdate.addEventListener('input', () => {
    const fechaUpdate1 = document.getElementById('fechaUpdate').value;
    if (fechaUpdate1) {
        const selectedDate = new Date(fechaUpdate1);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Solo se permiten reservas de lunes a viernes!!!',
            })
            fechaUpdate.classList.add('is-invalid');
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(fechaUpdate.value)) {
            fechaUpdate.classList.add('is-valid');
            fechaUpdate.classList.remove('is-invalid')
        } else {
            fechaUpdate.classList.add('is-invalid');
        }
    }

});

horaInicioUpdate.addEventListener('input', () => {
    if (/^(08|09|10|11|12|14|15|):[0-5][0-9]$/.test(horaInicioUpdate.value) || /^(|13||16|):00$/.test(horaInicioUpdate.value)) {
        horaInicioUpdate.classList.add('is-valid');
        horaInicioUpdate.classList.remove('is-invalid')
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Recuerda que los horarios son de 8am a 1pm y 2pm a 4pm',
        })
        horaInicioUpdate.classList.add('is-invalid');
    }
});

horaFinUpdate.addEventListener('input', async () => {
    let horas = compararHoras(horaInicioUpdate.value, horaFinUpdate.value);

    if (/^(08|09|10|11|12|14|15):[0-5][0-9]$/.test(horaFinUpdate.value) || /^(|13||16|):00$/.test(horaFinUpdate.value)&& horas === -1) {
        horaFinUpdate.classList.add('is-valid');
        horaFinUpdate.classList.remove('is-invalid')
    } else if (horas === 1) {
        horaFinUpdate.classList.add('is-invalid');
    } else if (horas === 0) {
        horaFinUpdate.classList.add('is-invalid');
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Recuerda que los horarios son de 8am a 1pm y 2pm a 4pm',
        })
        horaFinUpdate.classList.add('is-invalid');
    }
});

function ValidationUpdateBookings() {
    
    let horas = compararHoras(horaInicioUpdate.value, horaFinUpdate.value);
    if (horaInicioUpdate.value === "" && horaFinUpdate.value === "") {
        horaInicioUpdate.classList.add('is-invalid');
        horaFinUpdate.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!',
        })
    }else if (fechaUpdate.classList.contains('is-invalid') || !/^\d{4}-\d{2}-\d{2}$/.test(fechaUpdate.value) ) {
        fechaUpdate.classList.add('is-invalid');
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo fecha correctamente!',
        })
    }
    else if (horaInicioUpdate.length === 0 || horaInicioUpdate.classList.contains('is-invalid')) {
        horaInicioUpdate.classList.add('is-invalid');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo hora de inicio correctamente!',
        })
    }
    else if (horaFinUpdate.length === 0 || horaFinUpdate.classList.contains('is-invalid') || horas === 0 || horas === 1) {
        horaFinUpdate.classList.add('is-invalid');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo hora de finalización correctamente!',

        })
    }else{
        UpdateBooking()
    }
};

document.getElementById('closeModalUpdateBooking').addEventListener('click', (e) => {
    fechaUpdate.value = '';
    horaInicioUpdate.value = '';
    horaFinUpdate.value = '';

    fechaUpdate.classList.remove('is-valid', 'is-invalid');
    horaInicioUpdate.classList.remove('is-valid', 'is-invalid');
    horaFinUpdate.classList.remove('is-valid', 'is-invalid');
});