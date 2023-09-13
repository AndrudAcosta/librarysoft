//PARA EL MODAL DE ACTUALIZAR USUARIOS
// Obtener los elementos del formulario
const nombre = document.getElementById('nombrerolU');
const plazo = document.getElementById('plazoU');
const cantidadl = document.getElementById('librosU');
const cantidadp = document.getElementById('prestamosU');


// Validar el campo de Nombres
nombre.addEventListener('input', () => {
    if (!/^[A-Za-z\s]+$/.test(nombre.value)) {
        nombre.classList.add('is-invalid');
    } else {
        nombre.classList.remove('is-invalid');
    }
});

// Mostrar chulo verde al momento de escribir correctamente en cada campo
nombre.addEventListener('input', () => {
    if (/^[A-Za-z\s]+$/.test(nombre.value)) {
        nombre.classList.add('is-valid');
    } else {
        nombre.classList.remove('is-valid');
    }
});


//---------------------------------------------------//------------------------------------------------------------
//PARA EL MODAL DE REGISTRO DEL ROL
// Obtener los elementos del formulario
const nombreInput = document.getElementById('nombreRol');
const plazoInput = document.getElementById('plazo');
const librosInput = document.getElementById('libros');
const prestamosInput = document.getElementById('prestamos');

// Validar el campo de Nombres
nombreInput.addEventListener('input', () => {
    if (!/^[A-Za-z\s]+$/.test(nombreInput.value)) {
        nombreInput.classList.add('is-invalid');
    } else {
        nombreInput.classList.remove('is-invalid');
    }
});


// Mostrar chulo verde al momento de escribir correctamente en cada campo
nombreInput.addEventListener('input', () => {
    if (/^[A-Za-z\s]+$/.test(nombreInput.value)) {
        nombreInput.classList.add('is-valid');
    } else {
        nombreInput.classList.remove('is-valid');
    }
});

plazoInput.addEventListener('input', () => {
    if (/^[0-9]+$/.test(plazoInput.value)) {
        plazoInput.classList.add('is-valid');
    } else {
        plazoInput.classList.remove('is-valid');
    }
});

librosInput.addEventListener('input', () => {
    if (/^[0-9]+$/.test(librosInput.value)) {
        librosInput.classList.add('is-valid');
    } else {
        librosInput.classList.remove('is-valid');
    }
});

prestamosInput.addEventListener('input', () => {
    if (/^[0-9]+$/.test(prestamosInput.value)) {
        prestamosInput.classList.add('is-valid');
    } else {
        prestamosInput.classList.remove('is-valid');
    }
});


// Obtener el botón de cerrar el modal de registro
const cerrarRegistroBtn = document.getElementById('cerrarRegistro');

// Agregar el evento de escucha al botón de cerrar
cerrarRegistroBtn.addEventListener('click', () => {
  // Restablecer los valores del formulario
  const formulario = document.getElementById('formulario');
  if (formulario) {
    formulario.reset(); // Restablece el formulario a su estado inicial

    const nombreInput = document.getElementById('nombreRol');
    if (nombreInput) {
      nombreInput.classList.remove('is-valid', 'is-invalid');
    }
    const plazoInput = document.getElementById('plazo');
    if (plazoInput) {
        plazoInput.classList.remove('is-valid', 'is-invalid');
    }
    const librosInput = document.getElementById('libros');
    if (librosInput) {
        librosInput.classList.remove('is-valid', 'is-invalid');
    }
    const prestamosInput = document.getElementById('prestamos');
    if (prestamosInput) {
        prestamosInput.classList.remove('is-valid', 'is-invalid');
    }
  }
});
