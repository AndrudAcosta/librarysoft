const eliminarRol = (idRol) => {
  // Mostrar alerta de confirmación antes de la eliminación
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#16a084'

  }).then((result) => {
    if (result.isConfirmed) {
      // Continuar con la eliminación
      fetch('http://localhost:8282/api/roles/eliminarRol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idRol: idRol })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al eliminar el rol.');
          }
        })
        .then(data => {
          Swal.fire({
            title: 'Eliminado',
            text: 'El rol ha sido eliminado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16a084'
          }
          ).then(() => {
            window.location.href = 'roles.php';
          });
        })
        .catch(error => {
          console.error('Error al eliminar el estado:', error);
          Swal.fire({
            title: 'Oops...',
            text: 'El rol tiene usuarios asociados.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16a084'
          }
          );
        });
    }
  });
};

