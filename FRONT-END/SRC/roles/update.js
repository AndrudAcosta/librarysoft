let existentesModulos = [];

const obtenerRol = (idRol) => {
  fetch(`http://localhost:8282/api/roles/${idRol}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al obtener el rol:', data.error);
        // Manejo del error en caso de que ocurra
      } else {
        const rol = data;
        document.getElementById('idrolU').value = rol.idRol;
        document.getElementById('nombrerolU').value = rol.nombreRol;
        document.getElementById('plazoU').value = rol.plazo;
        document.getElementById('librosU').value = rol.cantidadl;
        document.getElementById('prestamosU').value = rol.cantidadp;

        existentesModulos = rol.modulos.map(modulo => modulo.idModulo);
        cargarModulosEnSwitchs(rol.modulos);

      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      // Manejo del error en caso de que ocurra
    });
};

let agregarModulos = [];
let eliminarModulos = [];
let modulosActuales = [];

const cargarModulosEnSwitchs = async (modulosRol) => {
  try {
    const modulos = await obtenerModulos();

    const moduloDiv = document.getElementById('modulosU');
    moduloDiv.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('row', 'row-cols-1', 'row-cols-md-4', 'g-4');

    modulosActuales = modulosRol.map(modulo => modulo.idModulo); // Obtener los módulos actuales del rol

    modulos.forEach((modulo) => {
      const col = document.createElement('div');
      col.classList.add('col-md-4');

      const switchContainer = document.createElement('div');
      switchContainer.classList.add('form-check', 'form-switch');

      const switchInput = document.createElement('input');
      switchInput.type = 'checkbox';
      switchInput.classList.add('form-check-input');
      switchInput.id = `moduloSwitch_${modulo.idModulo}`;

      const switchLabel = document.createElement('label');
      switchLabel.classList.add('form-check-label');
      switchLabel.setAttribute('for', `moduloSwitch_${modulo.idModulo}`);
      switchLabel.textContent = modulo.modulo;

      // Verificar si el módulo está asociado al rol
      if (modulosActuales.includes(modulo.idModulo)) {
        switchInput.checked = true; // Marcar el switch como activo
      }

      switchInput.addEventListener('change', () => {
        if (switchInput.checked) {
          // El interruptor se activó, remover el módulo de eliminarModulos si existe
          const index = eliminarModulos.indexOf(modulo.idModulo);
          if (index !== -1) {
            eliminarModulos.splice(index, 1);
          }
          // Agregar el módulo a agregarModulos si no existe
          if (!agregarModulos.includes(modulo.idModulo)) {
            agregarModulos.push(modulo.idModulo);
          }
        } else {
          // El interruptor se desactivó, remover el módulo de agregarModulos si existe
          const index = agregarModulos.indexOf(modulo.idModulo);
          if (index !== -1) {
            agregarModulos.splice(index, 1);
          }
          // Agregar el módulo a eliminarModulos si no existe
          if (!eliminarModulos.includes(modulo.idModulo)) {
            eliminarModulos.push(modulo.idModulo);
          }
        }
      });

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

// FUNCION PARA ACTUALIZAR LOS DATOS DE ROLES
const actualizarRol = async (idRol, datosActualizados, agregarModulos, eliminarModulos) => {
  // Validar los datos antes de enviar la solicitud de actualización
  if (!idRol || !datosActualizados.nombreRol) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, ingrese un nombre.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  // Validar que existentesModulos sea igual a eliminarModulos y agregarModulos esté vacío
  if (existentesModulos.length === eliminarModulos.length && agregarModulos.length === 0) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, seleccione al menos un módulo.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  // Validar que los campos de cantidad no tengan un valor de 0
  if (datosActualizados.plazo === '0' || datosActualizados.cantidadl === '0' || datosActualizados.cantidadp === '0') {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos de cantidad no pueden tener un valor de 0.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  // Validar que todos los campos estén llenos o todos estén vacíos
  if ((datosActualizados.plazo !== '' || datosActualizados.cantidadl !== '' || datosActualizados.cantidadp !== '') &&
    (datosActualizados.plazo === '' || datosActualizados.cantidadl === '' || datosActualizados.cantidadp === '')) {
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

  const dataConModulos = {
    ...datosActualizados,
    agregarModulos,
    eliminarModulos,
    existentesModulos,
  };

  fetch(`http://localhost:8282/api/roles/${idRol}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataConModulos)
  })
    .then(response => response.json())
    .then(async data => {
      if (data.error) {
        if (data.error === 'El nombre ya existe') {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre ya existe, No se puede actualizar el rol.',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16a084'
          });
        }
      } else {
        await Swal.fire({
          icon: 'success',
          title: 'Rol actualizado exitosamente.',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#16a084'
        });
        location.assign('roles.php');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
};


// Obtener el botón de actualizar
const botonActualizar = document.getElementById('actualizar');
botonActualizar.addEventListener('click', () => {
  const idRol = document.getElementById('idrolU').value;
  const nuevoNombreRol = document.getElementById('nombrerolU').value;
  const nuevoPlazo = document.getElementById('plazoU').value;
  const nuevoCantidadl = document.getElementById('librosU').value;
  const nuevoCantidadp = document.getElementById('prestamosU').value;

  const datosActualizados = {
    nombreRol: nuevoNombreRol,
    plazo: nuevoPlazo,
    cantidadl: nuevoCantidadl,
    cantidadp: nuevoCantidadp,
  };

  actualizarRol(idRol, datosActualizados, agregarModulos, eliminarModulos, existentesModulos);
});


const actualizarEstado = (idRol) => {
  const switchElement = document.getElementById(`estado-switch-${idRol}`);
  const estadoAnterior = switchElement.checked; // Almacenar el estado anterior del switch
  const estadoActualElement = document.getElementById(`estado-actual-${idRol}`);

  Swal.fire({
    title: `¿Está seguro de cambiar el estado a ${estadoAnterior ? 'Activo' : 'Inactivo'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#16a084'
  })
    .then(result => {
      if (result.isConfirmed) {
        // Realizar la solicitud de cambio de estado solo si el usuario confirma
        fetch('http://localhost:8282/api/roles/cambioEstado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idRol: idRol, estado: estadoAnterior }) // Usar estadoAnterior en el cuerpo del fetch
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              estadoActualElement.textContent = estadoAnterior ? 'Activo' : 'Inactivo';
            } else {
              // Manejar el caso de error en la actualización del estado del rol
              console.error('Error al actualizar el estado del rol:', data.error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El rol tiene usuarios asociados.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#16a084'
              });
              switchElement.checked = !estadoAnterior;
            }
          })
          .catch(error => {
            console.error('Error al actualizar el estado:', error);
            switchElement.checked = !estadoAnterior;
          });
      }
      else {
        // Si el usuario cancela, restaurar el estado anterior del switch
        switchElement.checked = !estadoAnterior;
      }
    });
};





