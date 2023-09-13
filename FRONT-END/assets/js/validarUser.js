const formulari = document.getElementById('formulari');
const documento = document.getElementById('documento');
const nombres = document.getElementById('nombres');
const apellidos = document.getElementById('apellidos');
const correo = document.getElementById('correo');
const grado = document.getElementById('grado');
const grupo = document.getElementById('grupo');

function validarYMostrarEstado(inputElement, regex) {
    if (regex.test(inputElement.value)) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
    }
}

documento.addEventListener('input', () => {
    validarYMostrarEstado(documento, /^[0-9]+$/);
});

nombres.addEventListener('input', () => {
    validarYMostrarEstado(nombres, /^[A-Za-z\sñÑ]+$/);
});

apellidos.addEventListener('input', () => {
    validarYMostrarEstado(apellidos, /^[A-Za-z\sñÑ]+$/);
});

correo.addEventListener('input', () => {
    validarYMostrarEstado(correo, /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
});

// grado.addEventListener('input', () => {
//     validarYMostrarEstado(grado, /^[0-9]+$/);
// });

// grupo.addEventListener('input', () => {
//     validarYMostrarEstado(grupo, /^[0-9]+$/);
// });



// Obtener el botón de cerrar el modal
const cerrarBtn = document.getElementById('cerrar');

// Agregar el evento de escucha al botón de cerrar
cerrarBtn.addEventListener('click', () => {
  // Restablecer los valores de los campos del formulario
  documento.value = '';
  nombres.value = '';
  apellidos.value = '';
  correo.value = '';


  // Remover las clases de validación e invalidación de los campos
  documento.classList.remove('is-valid', 'is-invalid');
  nombres.classList.remove('is-valid', 'is-invalid');
  apellidos.classList.remove('is-valid', 'is-invalid');
  correo.classList.remove('is-valid', 'is-invalid');


});


function updateModal() {
    if(documento.value === '' && nombres.value === '' && apellidos.value === '' && correo.value === ''){
        documento.classList.add('is-invalid');
        nombres.classList.add('is-invalid');
        apellidos.classList.add('is-invalid');
        correo.classList.add('is-invalid');

        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!.',
            confirmButtonText: 'Aceptar'
          })
    }else if(documento.length == 0 || !/^[0-9]+$/.test(documento.value)){
        documento.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo documento correctamente!',
        })
    }
    else if(nombres.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(nombres.value)){
        nombres.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo nombres correctamente!',
        })
    }
    else if(apellidos.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(apellidos.value)){
        apellidos.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo apellidos correctamente!',
        })
    }
    else if(correo.length == 0 || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\wñÑ]{2,7}$/.test(correo.value)){
        correo.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo coreo electrónico correctamente!',
        })
    }
   
};


