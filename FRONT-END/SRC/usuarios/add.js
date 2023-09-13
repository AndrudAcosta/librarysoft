// FUNCION PARA OBTENER LOS ROLES Y AGREGARLOS EN EL SELECT DEL AGREGAR USUARIOS
const obtenerRoles = async () => {
    try {
      const response = await fetch('http://localhost:8282/api/usuarios/roles');
    
      if (!response.ok) {
        throw new Error('Error al obtener los roles');
      }
    
      const data = await response.json();
    
      return data.roles;
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      throw error;
    }
    };


    
// Función para cargar los roles en el select
const cargarRolesEnSelect = async () => {
  try {
    const roles = await obtenerRoles();

    const selectRol = document.getElementById('nombreRol');

    roles.forEach((rol) => {
      const option = document.createElement('option');
      option.value = rol.nombreRol;
      option.text = rol.nombreRol;
      selectRol.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los roles en el select:', error);
  }
};
    


 //FUNCION PARA AGREGAR LOS BENEFICIARIOS Y USUARIOSS
const agregarBeneficiarios =  (documento, nombres, apellidos, correo, grado, grupo, nombreRol) => {
  try {
    const body = {
      documento,
      nombres,
      apellidos,
      correo,
      grado,
      grupo,
      nombreRol
    };

    const response =  fetch('http://localhost:8282/api/usuarios/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log('Usuario y beneficiario guardados exitosamente');
    // Realizar alguna acción después de agregar los beneficiarios
  } catch (error) {
    console.error('Error al agregar los beneficiarios:', error);
    throw error;
  }
};


// Ejecutar la función para cargar los roles en el select
cargarRolesEnSelect();


function vali(){
  const nombreRol = document.getElementById('nombreRol').value;
  if (nombreRol === 'Estudiante' && grado === ''  || grupo === '') {
      gradosInput.classList.add('is-invalid');
      gruposInput.classList.add('is-invalid');
      return
    }
}

const formu = document.getElementById('formulario');
const correoInput = document.getElementById('correos');
const documentoInput = document.getElementById('document');

// Función para verificar duplicados por correo
async function verificarDuplicadoPorCorreo(correo) {
  try {
    const validarResponse = await fetch('http://localhost:8282/api/usuarios/validar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo })
    });

    const validationResult = await validarResponse.json();

    return validationResult.data.error === 'El correo ya está registrado';
  } catch (error) {
    // Manejar el error aquí si es necesario
    return false;
  }
}

// Función para verificar duplicados por documento
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

// Función para mostrar alertas
async function mostrarAlerta(mensaje) {
  await Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: mensaje,
    confirmButtonColor: '#16a084',
    confirmButtonText: 'Aceptar'
  });
}


correosInput.addEventListener('input', async () => {
  const correo = correosInput.value;

  if (correo !== '') {
    const isDuplicated = await verificarDuplicadoPorCorreo(correo);

    if (isDuplicated) {
      mostrarAlerta('El correo ya está registrado.');
      correosInput.classList.add('is-invalid');
      correosInput.classList.remove('is-valid');
    } else {
      correosInput.classList.remove('is-invalid');

      if (!/ñ/i.test(correo)) {
        correosInput.classList.add('is-valid');
      } else {
        correosInput.classList.remove('is-valid');
        correosInput.classList.add('is-invalid');
      }
    }
  } else {
    correosInput.classList.remove('is-invalid');
    correosInput.classList.remove('is-valid');
  }
});





// Agregar evento de input al campo de documento
documentoInput.addEventListener('input', async () => {
  const documento = documentoInput.value;

  if (documento !== '') {
    const isDuplicated = await verificarDuplicadoPorDocumento(documento);
    if (isDuplicated) {
      mostrarAlerta('El documento ya está registrado.');
      documentoInput.classList.add('is-invalid');
    }else{
      documentoInput.classList.remove('is-invalid');
    }
  }
});


// Agregar evento de envío al formulario
formu.addEventListener('submit', async (event) => {
  event.preventDefault();

  const documento = documentoInput.value;
  const nombres = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellido').value;
  const correo = correoInput.value;
  const grado = document.getElementById('grados').value;
  const grupo = document.getElementById('grupos').value;
  const nombreRol = document.getElementById('nombreRol').value;
  const documentoNumber = parseInt(documento, 10);

  // Verificar campos faltantes
  if (documento === '' || correo === '' || nombres === '' || apellidos === '' || nombreRol === '') {

    return;
  }

 


  if (isNaN(documentoNumber) || documentoNumber.toString().length >= 11) {
    await mostrarAlerta('El documento ingresado excede la cantidad de dígitos permitidos por la Registraduría Nacional.');
    return;
  }

  if (documentoNumber.toString().length < 8) {
    await mostrarAlerta('El documento ingresado tiene una cantidad de dígitos muy pequeña, el mínimo es 8 según la Registraduría Nacional.');
    return;
  }

  const isDuplicatedCorreo = await verificarDuplicadoPorCorreo(correo);
  if (isDuplicatedCorreo) {
    return;
  }

  const isDuplicatedDocumento = await verificarDuplicadoPorDocumento(documento);
  if (isDuplicatedDocumento) {
    return;
  }

  agregarBeneficiarios(documento, nombres, apellidos, correo, grado, grupo, nombreRol);

  await Swal.fire({
    icon: 'success',
    title: 'Usuario registrado exitosamente.',
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#16a084'
  });

  window.location.href = "tableAdmin.php";
  formu.reset();
});




