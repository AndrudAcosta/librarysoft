//PARA EL MODAL DE REGISTRO DE SANCIONES
// Obtener los elementos del formulario
const documentoR = document.getElementById('documentoR');

// Validar el campo de Documento
documentoR.addEventListener('input', () => {
    if (!/^[0-9]+$/.test(documentoR.value)) {
        documentoR.classList.add('is-invalid');
    } else {
        documentoR.classList.remove('is-invalid');
    }
});


// Mostrar chulo verde al momento de escribir correctamente en cada campo
documentoR.addEventListener('input', () => {
    if (/^[0-9]+$/.test(documentoR.value)) {
        documentoR.classList.add('is-valid');
    } else {
        documentoR.classList.remove('is-valid');
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

    const nombreInput = document.getElementById('documentoR');
    if (nombreInput) {
      nombreInput.classList.remove('is-valid', 'is-invalid');
    }
    const plazoInput = document.getElementById('finalR');
    if (plazoInput) {
        plazoInput.classList.remove('is-valid', 'is-invalid');
    }
    const librosInput = document.getElementById('observacionR');
    if (librosInput) {
        librosInput.classList.remove('is-valid', 'is-invalid');
    }
  }
});