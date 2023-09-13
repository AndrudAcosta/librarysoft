//FUNCION PARA LISTAR LOS DATOS DEL USUARIOS Y BENEFICIARIOS EN EL MODAL DE EDITAR
const obtenerBeneficiario = (idBeneficiario) => {
    fetch(`http://localhost:8282/api/usuarios/${idBeneficiario}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error al obtener el beneficiario:', data.error);
          // Manejo del error en caso de que ocurra
        } else {
          const beneficiario = data;
          document.getElementById('idBeneficiario').value = beneficiario.idBeneficiario;
          document.getElementById('nombrerol').value = beneficiario.nombreRol;
          document.getElementById('documento').value = beneficiario.documento;
          document.getElementById('nombres').value = beneficiario.nombres;
          document.getElementById('apellidos').value = beneficiario.apellidos;
          document.getElementById('correo').value = beneficiario.correo;
          document.getElementById('grado').value = beneficiario.grado;
          document.getElementById('grupo').value = beneficiario.grupo;

        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Manejo del error en caso de que ocurra
      });
  }


  const cargarRolesEnSelec= async () => {
    try {
      const roles = await obtenerRoles();

      const selectrol = document.getElementById('nombrerol');

      roles.forEach((rol) => {
        const option = document.createElement('option');
        option.value = rol.nombreRol;
        option.text = rol.nombreRol;
        selectrol.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar los roles en el select:', error);
    }
    };

    // Ejecutar la función para cargar los roles en el select
    cargarRolesEnSelec();








const actualizarEstado = (idBeneficiario) => {
  const switchElement = document.getElementById(`estado-switch-${idBeneficiario}`);
  const estadoAnterior = switchElement.checked; // Almacenar el estado anterior del switch
  const estadoActualElement = document.getElementById(`estado-actual-${idBeneficiario}`);

  Swal.fire({
    title: `¿Está seguro de cambiar el estado a ${estadoAnterior ? 'Activo' : 'Inactivo'}?`, // Mostrar el estado anterior en el cuadro de diálogo
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#16a084',
    cancelButtonText: 'Cancelar',
  })
  .then(result => {
    if (result.isConfirmed) {
      // Solo si el usuario confirma, enviar la solicitud de cambio de estado
      fetch('http://localhost:8282/api/usuarios/cambioEstado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idBeneficiario: idBeneficiario, estado: estadoAnterior })
      })
      .then(response => response.json())
      .then(data => {
        estadoActualElement.textContent = estadoAnterior ? 'Activo' : 'Inactivo';
      })
      .catch(error => {
        console.error('Error al actualizar el estado:', error);
      });
    } else {
          // Si el usuario cancela, restaurar el estado anterior del switch
          location.reload();
    }
  });
};


const validarEstado = (idBeneficiario) => {
  // Datos del usuario
  const apiUrl = 'http://localhost:8282/api/usuarios/validadEstado'; // Reemplaza con la URL correcta

  // Objeto de opciones para la solicitud Fetch
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idBeneficiario }), // Envía el ID del beneficiario en el cuerpo de la solicitud
  };

  // Realizar la solicitud Fetch
  fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then( async data => {
      // Manejar la respuesta de la API
      if (data.message === 'Este usuario tiene acciones activas') {
       await Swal.fire({
          title: 'Acciones activas',
          text: `El usuario tiene sanciones y/o préstamos activos, no se puede desactivar.`,
          icon: 'warning',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#e74c3c'
        })
        location.reload();
      } else {
        // Llamar a la función actualizarEstado
        actualizarEstado(idBeneficiario);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
};
