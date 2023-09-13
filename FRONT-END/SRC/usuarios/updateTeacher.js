const actualizarBeneficiari = async (idBeneficiario, datosActualizados) => {
    try {
      const response = await fetch(`http://localhost:8282/api/usuarios/beneficiarios/${idBeneficiario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });
  
      const data = await response.json();
  
      if (data.error) {
        if (data.error === 'El documento ya existe') {
          // alert('El documento ya existe. No se puede actualizar el beneficiario.');
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El documento ya existe. No se puede actualizar el beneficiario.',
            confirmButtonColor: '#16a084'
          })
        } else if (data.error === 'El correo electrónico ya existe') {
          // alert('El correo electrónico ya existe. No se puede actualizar el beneficiario.');
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico ya existe. No se puede actualizar el beneficiario.',
            confirmButtonColor: '#16a084'
          })
        } else {
          // alert('Error. No se puede actualizar el usuario y beneficiario.');
          updateModal()
        }
      } 
      else{
        // alert('Beneficiario actualizado correctamente')
          // alert('Usuario y beneficiario registrado exitosamente');
      await  Swal.fire({
      icon: 'success',
      title: 'Beneficiario actualizado correctamente',
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: 'Aceptar', // Personalizar el texto del botón de confirmación
      confirmButtonColor: '#16a084'
      });
        // Ejemplo de redireccionamiento utilizando location.assign()
        location.assign('tableTeacher.php');
  
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  
  const formuup = document.getElementById('formulari');
  const botonActualiza = document.getElementById('actualiza');
  botonActualiza.addEventListener('click', async  (event) => {
    event.preventDefault();
    // Obtener los nuevos valores del formulario o de los elementos HTML
    const idBeneficiario = document.getElementById('idBeneficiario').value;
    const nuevoNombreRol = document.getElementById('nombrerol').value;
    const nuevoDocumento = document.getElementById('documento').value;
    const nuevosNombres = document.getElementById('nombres').value;
    const nuevosApellidos = document.getElementById('apellidos').value;
    const nuevoCorreo = document.getElementById('correo').value;

    // Crear el objeto datosActualizados con los nuevos valores
    const datosActualizados = {
      nombreRol: nuevoNombreRol,
      documento: nuevoDocumento,
      nombres: nuevosNombres,
      apellidos: nuevosApellidos,
      correo: nuevoCorreo,
    };
  
    // Llamar a la función actualizarBeneficiario para enviar la solicitud PUT
    await actualizarBeneficiari(idBeneficiario, datosActualizados);
    // alert('Beneficiario actualizado correctamente',)
    // location.assign('http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/admin/usuarios.html');
    
  });