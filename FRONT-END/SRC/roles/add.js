// FUNCION PARA OBTENER LOS MODULOS Y AGREGARLOS EN EL CHECK DE AGREGAR ROL
const obtenerModulos = async () => {
  try {
    const response = await fetch('http://localhost:8282/api/roles/modulos');

    if (!response.ok) {
      throw new Error('Error al obtener los modulos');
    }

    const data = await response.json();

    return data.modulos;
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    throw error;
  }
};



const cargarModulosEnSwitch = async () => {
  try {
    const modulos = await obtenerModulos();

    const moduloDiv = document.getElementById('modulo');
    moduloDiv.innerHTML = '';

    const idModulosSeleccionados = []; // Arreglo para almacenar los idModulo seleccionados

    const container = document.createElement('div');
    container.classList.add('row', 'row-cols-1', 'row-cols-md-4', 'g-4');

    modulos.forEach((modulo) => {
      const col = document.createElement('div');
      col.classList.add('col-md-4');

      const switchContainer = document.createElement('div');
      switchContainer.classList.add('form-check', 'form-switch');

      const switchInput = document.createElement('input');
      switchInput.type = 'checkbox';
      switchInput.classList.add('form-check-input');
      switchInput.id = `moduloSwitch_${modulo.idModulo}`;

      // Agregar controlador de eventos al evento 'change'
      // Agregar controlador de eventos al evento 'change'
      switchInput.addEventListener('change', (event) => {
        const idModulo = modulo.idModulo;
        if (event.target.checked) {
          // Agregar idModulo al arreglo si el switch está marcado
          idModulosSeleccionados.push(idModulo);
        } else {
          // Remover idModulo del arreglo si el switch está desmarcado
          const index = idModulosSeleccionados.indexOf(idModulo);
          if (index !== -1) {
            idModulosSeleccionados.splice(index, 1);
          }
        }
      });


      const switchLabel = document.createElement('label');
      switchLabel.classList.add('form-check-label');
      switchLabel.setAttribute('for', `moduloSwitch_${modulo.idModulo}`);
      switchLabel.textContent = modulo.modulo;

      switchContainer.appendChild(switchInput);
      switchContainer.appendChild(switchLabel);

      col.appendChild(switchContainer);
      container.appendChild(col);
    });

    moduloDiv.appendChild(container);

  } catch (error) {
    console.error('Error al cargar los módulos en el switch:', error);
  }
};

// Llama a la función para cargar los módulos en el switch
cargarModulosEnSwitch();


//FUNCION PARA AGREGAR LOS ROLES Y PERMISOS
const agregarRol = async (nombreRol, plazo, libros, prestamos, idModulosSeleccionados) => {
  try {
    if (!idModulosSeleccionados || idModulosSeleccionados.length === 0) {
      console.error('No se han seleccionado módulos');
      //alert('Por favor, seleccione al menos un módulo');
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, seleccione al menos un módulo.',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16a084'
      })
      return;
    }

    const body = {
      plazo,
      libros,
      prestamos,
      nombreRol,
      modulos: idModulosSeleccionados
    };

    const response = await fetch('http://localhost:8282/api/roles/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    //alert('Registro Exitoso');
    await Swal.fire({
      icon: 'success',
      title: 'Rol registrado exitosamente.',
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    window.location.href = 'roles.php';
  } catch (error) {
    console.error('Registro Fallido:', error);
    throw error;
  }
};

const obtenerIdModulosSeleccionados = () => {
  const idModulosSeleccionados = [];

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const idModulo = parseInt(checkbox.id.split('_')[1]);
      if (!isNaN(idModulo)) { // Verificar si el idModulo es un número válido
        idModulosSeleccionados.push(idModulo);
      }
    }
  });

  return idModulosSeleccionados;
};

const agregarButton = document.getElementById('agregar');
agregarButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const nombreRol = document.getElementById('nombreRol').value;
  const plazo = document.getElementById('plazo').value;
  const libros = document.getElementById('libros').value;
  const prestamos = document.getElementById('prestamos').value;

  // Verificar campos plazo, libros y prestamos
  if ((plazo !== '' || libros !== '' || prestamos !== '') &&
    (plazo === '' || libros === '' || prestamos === '')) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Complete los 3 Campos o déjelos vacíos.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  if (plazo === '0' || libros === '0' || prestamos === '0') {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos no pueden tener un valor de 0.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }


  // Verificar campos faltantes
  if (nombreRol === '') {
    //alert('Por favor, complete todos los campos.');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, ingrese un nombre.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    })
    return;
  }

  const idModulosSeleccionados = obtenerIdModulosSeleccionados();

  // Verificar si se han seleccionado módulos
  if (idModulosSeleccionados.length === 0) {
    //alert('Por favor, seleccione al menos un módulo');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, seleccione al menos un módulo.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    })
    return;
  }

  try {
    const validarResponse = await fetch('http://localhost:8282/api/roles/validar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombreRol })
    });

    const validationResult = await validarResponse.json();

    if (validationResult.data.error === 'El nombre ya está registrado') {
      //alert('El nombre ya está registrado.');
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre ya está registrado.',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16a084'
      })
      return;
    }

    agregarRol(nombreRol, plazo, libros, prestamos, idModulosSeleccionados);
    await Swal.fire({
      icon: 'success',
      title: 'Rol registrado exitosamente.',
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    window.location.href = 'roles.php';
    formu.reset();
  } catch (error) {
    // Manejar el error aquí si es necesario
  }
});
