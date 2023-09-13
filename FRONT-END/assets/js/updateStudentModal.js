//-------------------------update modal student--------------------------------------
function updateModalStudent() {
        if(documento.value === '' && nombres.value === '' && apellidos.value === '' && correo.value === ''){
            documento.classList.add('is-invalid');
            nombres.classList.add('is-invalid');
            apellidos.classList.add('is-invalid');
            correo.classList.add('is-invalid');

    
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Ingrese el formulario correctamente!!!.',
                confirmButtonText: 'Aceptar'
              })
        }else if(documento.length == 0 || !/^[0-9]+$/.test(documento.value)){
            documento.classList.add('is-invalid');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Ingrese el campo documento correctamente!',
            })
        }
        else if(nombres.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(nombres.value)){
            nombres.classList.add('is-invalid');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Ingrese el campo nombres correctamente!',
            })
        }
        else if(apellidos.length == 0 || !/^[A-Za-z\sñÑ]+$/.test(apellidos.value)){
            apellidos.classList.add('is-invalid');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Ingrese el campo apellidos correctamente!',
            })
        }
        else if(correo.length == 0 || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\wñÑ]{2,7}$/.test(correo.value)){
            correo.classList.add('is-invalid');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#16a084',
                text: 'Ingrese el campo coreo electrónico correctamente!',
            })
        }  
    };