//---------------------------------------------------//------------------------------------------------------------
//PARA EL MODAL DE REGISTRO DE USUARIOS
// Obtener los elementos del formulario
const formulario = document.getElementById('formulario');
const documentInput = document.getElementById('document');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const correosInput = document.getElementById('correos');
const gradosInput = document.getElementById('grados');
const gruposInput = document.getElementById('grupos');


// Validar el campo de Documento
documentInput.addEventListener('input', () => {
    if (!/^[0-9]+$/.test(documentInput.value)) {
        documentInput.classList.add('is-invalid');
    } else {
        documentInput.classList.remove('is-invalid');
    }
});

// Validar el campo de Nombres
nombreInput.addEventListener('input', () => {
    if (!/^[A-Za-z\s]+$/.test(nombreInput.value)) {
        nombreInput.classList.add('is-invalid');
    } else {
        nombreInput.classList.remove('is-invalid');
    }
});

// Validar el campo de Apellidos
apellidoInput.addEventListener('input', () => {
    if (!/^[A-Za-z\s]+$/.test(apellidoInput.value)) {
        apellidoInput.classList.add('is-invalid');
    } else {
        apellidoInput.classList.remove('is-invalid');
    }
});


// Validar el campo de Grados
gradosInput.addEventListener('input', () => {
    if (!/^[0-9]+$/.test(gradosInput.value)) {
        gradosInput.classList.add('is-invalid');
    } else {
        gradosInput.classList.remove('is-invalid');
    }
});

// Validar el campo de Grupos
gruposInput.addEventListener('input', () => {
    if (!/^[0-9]+$/.test(gruposInput.value)) {
        gruposInput.classList.add('is-invalid');
    } else {
        gruposInput.classList.remove('is-invalid');
    }
});



// Mostrar chulo verde al momento de escribir correctamente en cada campo
documentInput.addEventListener('input', () => {
    if (/^[0-9]+$/.test(documentInput.value)) {
        documentInput.classList.add('is-valid');
    } else {
        documentInput.classList.remove('is-valid');
    }
});

nombreInput.addEventListener('input', () => {
    if (/^[A-Za-z\s]+$/.test(nombreInput.value)) {
        nombreInput.classList.add('is-valid');
    } else {
        nombreInput.classList.remove('is-valid');
    }
});

apellidoInput.addEventListener('input', () => {
    if (/^[A-Za-z\s]+$/.test(apellidoInput.value)) {
        apellidoInput.classList.add('is-valid');
    } else {
        apellidoInput.classList.remove('is-valid');
    }
});





// Obtener el botón de cerrar el modal de registro
const cerrarRegistroBtn = document.getElementById('cerrarRegistro');

// Agregar el evento de escucha al botón de cerrar
cerrarRegistroBtn.addEventListener('click', () => {
  // Restablecer los valores de los campos del formulario de registro
  documentInput.value = '';
  nombreInput.value = '';
  apellidoInput.value = '';
  correosInput.value = '';
  gradosInput.value = '';
  gruposInput.value = '';

  // Remover las clases de validación e invalidación de los campos del formulario de registro
  documentInput.classList.remove('is-valid', 'is-invalid');
  nombreInput.classList.remove('is-valid', 'is-invalid');
  apellidoInput.classList.remove('is-valid', 'is-invalid');
  correosInput.classList.remove('is-valid', 'is-invalid');
  gradosInput.classList.remove('is-valid', 'is-invalid');
  gruposInput.classList.remove('is-valid', 'is-invalid');
});




document.getElementById('formulario').addEventListener('submit', (e) => {

    if(documentInput.value === '' && nombreInput.value === '' && apellidoInput.value === '' && correosInput.value === ''){
        documentInput.classList.add('is-invalid');
        nombreInput.classList.add('is-invalid');
        apellidoInput.classList.add('is-invalid');
        correosInput.classList.add('is-invalid');
        vali()
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!.',
            confirmButtonText: 'Aceptar'
          })
    }else if(documentInput.length == 0 || !/^[0-9]+$/.test(documentInput.value)){
        documentInput.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo documento correctamente!',
        })
    }
    else if(nombreInput.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(nombreInput.value)){
        nombreInput.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo nombres correctamente!',
        })
    }
    else if(apellidoInput.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(apellidoInput.value)){
        apellidoInput.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo apellidos correctamente!',
        })
    }
    else if (correosInput.length == 0 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correosInput.value)) {
        correosInput.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo correo electrónico correctamente!',
        });
    }
    
   
});






