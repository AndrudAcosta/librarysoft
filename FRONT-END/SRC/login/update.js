const form = document.querySelector('form');

// Agregar un event listener para el evento 'submit' del formulario
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  try {
    // Obtener el valor de la nueva contraseña
    const passwordInput = document.getElementById('password');
    const nuevaContraseña = passwordInput.value;

    if (nuevaContraseña === '') {
        await  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, Ingrese su nueva contraseña.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        })
        return;
      } 

    // Obtener el token de autenticación de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Verificar si se proporcionó el token
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    // Enviar la solicitud al controlador de la API
    const url = `http://localhost:8282/api/login/actualizarPass?token=${token}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevaContraseña }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const data = await response.json();
 
    if(data.message){
      // alert(data.message); // Mostrar alerta de éxito
    await  Swal.fire({
        icon: 'success',
        text: data.message,
        confirmButtonColor: '#16a084',
        confirmButtonText: 'Aceptar'
      })
      document.getElementById('password').value = '';
      window.location.href= 'login.php'
    }


  } catch (error) {
    console.error(error); // Mostrar error en la consola
    //alert(error.message); // Mostrar alerta de error
  await  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    })
    document.getElementById('password').value = '';
    window.location.href= 'recuperar.php'
  }
});
