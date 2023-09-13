// Recuperar contraseña 

const formRecuperar = document.getElementById('recuperar');

formRecuperar.addEventListener('click', function (event)  {

    event.preventDefault();



    const documento = document.getElementById('documento').value;



    fetch('http://localhost:8282/api/login/recuperarPass', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json',

        },

        body: JSON.stringify({ documento }),

    })

        .then(response => response.json())

        .then(data => {

            // Manejar la respuesta del servidor 

            if (data.error === "Documento no encontrado") {

                // alert("El documento ingresado no se encuentra registrado")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El documento ingresado no se encuentra registrado.',
                    confirmButtonColor: '#16a084',
                    confirmButtonText: 'Aceptar'
                })

                document.getElementById('documento').value = '';



            } else if (data.message === "Correo de recuperación enviado") {

                // alert("El link de recuperación de contraseña fue enviado a su Correo con exito")
                Swal.fire({
                    icon: 'success',
                    title: 'El link de recuperación de contraseña fue enviado a su Correo con exito.',
                    showConfirmButton: true, // Mostrar botón de confirmación
                    confirmButtonText: 'Aceptar', // Personalizar el texto del botón de confirmación
                    confirmButtonColor: '#16a084'
                    });

                document.getElementById('documento').value = '';



            }

        })

        .catch(error => {

            console.error('Error:', error);

        });

});

