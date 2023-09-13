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
            text: 'El documento ya existe. No se puede actualizar el usuario.',
            confirmButtonColor: '#16a084',
            confirmButtonText: 'Aceptar'
          })
        } else if (data.error === 'El correo electrónico ya existe') {
          // alert('El correo electrónico ya existe. No se puede actualizar el beneficiario.');
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico ya existe. No se puede actualizar el usuario.',
            confirmButtonColor: '#16a084',
            confirmButtonText: 'Aceptar'
          })
        } else {
          // alert('Error. No se puede actualizar el usuario y beneficiario.');
          updateModalStudent()
        }
      
    }
      else{
        // alert('Beneficiario actualizado correctamente')
          // alert('Usuario y beneficiario registrado exitosamente');
      await  Swal.fire({
      icon: 'success',
      title: 'Usuario actualizado correctamente.',
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: 'Aceptar', // Personalizar el texto del botón de confirmación
      confirmButtonColor: '#16a084'
      });
        // Ejemplo de redireccionamiento utilizando location.assign()
        location.assign('tableStudent.php');
  
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  
  const formuup = document.getElementById('formulari');
  const botonActualiza = document.getElementById('actualizar');
  botonActualiza.addEventListener('click', async  (event) => {
    event.preventDefault();
    // Obtener los nuevos valores del formulario o de los elementos HTML
    const idBeneficiario = document.getElementById('idBeneficiario').value;
    const nuevoNombreRol = document.getElementById('nombrerol').value;
    const nuevoDocumento = document.getElementById('documento').value;
    const nuevosNombres = document.getElementById('nombres').value;
    const nuevosApellidos = document.getElementById('apellidos').value;
    const nuevoCorreo = document.getElementById('correo').value;
    const nuevoGrado = document.getElementById('grado').value;
    const nuevoGrupo = document.getElementById('grupo').value;
    const tNombreRol = document.getElementById('nombrerol').value;
  
    // Crear el objeto datosActualizados con los nuevos valores
    const datosActualizados = {
      nombreRol: nuevoNombreRol,
      documento: nuevoDocumento,
      nombres: nuevosNombres,
      apellidos: nuevosApellidos,
      correo: nuevoCorreo,
      grado: nuevoGrado,
      grupo: nuevoGrupo
    };
  
    if (tNombreRol === 'Estudiante' && (!nuevoGrado)) {
      grado.classList.add('is-invalid');

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#16a084',
        text: 'Ingrese el campo grado correctamente para estudiantes!.',
        confirmButtonText: 'Aceptar'
      });
    } 
    else if (tNombreRol === 'Estudiante' && (!nuevoGrupo)) {
      grupo.classList.add('is-invalid');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#16a084',
        text: 'Ingrese el campo grupo correctamente para estudiantes!.',
        confirmButtonText: 'Aceptar'
      });
    } 
    else {
      await actualizarBeneficiari(idBeneficiario, datosActualizados);
      // ...
    }
    
  });




