async function verificarIsbnTituloAdd(isbn, titulo) {
    try {
        const validation = await fetch('http://localhost:8282/api/libros/validationTitleIsbnAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, isbn })
        });

        const validationResult = await validation.json();

        return validationResult.msg === 'El ISBN o el TITULO ya están registrados';
    } catch (error) {
        // Manejar el error aquí si es necesario
        return false;
    }
}

const isbnAdd = document.getElementById('isbn');
const tituloAdd = document.getElementById('titulo');
const ilustracionAdd = document.getElementById('ilustrador');
const autorAdd = document.getElementById('autor');
const ciudadAdd = document.getElementById('ciudad');
const impresionAdd = document.getElementById('impresion');
const editorialAdd = document.getElementById('editorial');

isbnAdd.addEventListener('input', async () => {
    const isbn = isbnAdd.value
    const titulo = ''

    const isDuplicate = await verificarIsbnTituloAdd(isbn, titulo)

    if (isbn.length > 9 && /^[0-9\s-]+$/.test(isbnAdd.value)) {
        isbnAdd.classList.add('is-valid');
        isbnAdd.classList.remove('is-invalid')
        if (isDuplicate) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ISBN ya registrado en el sistema!',
                confirmButtonColor: '#16a084',
            })
            isbnAdd.classList.add('is-invalid');
        }
    }
    else {
        isbnAdd.classList.add('is-invalid');
    }
}),

    tituloAdd.addEventListener('input', async () => {
        const isbn = 0
        const titulo = tituloAdd.value

        const isDuplicate = await verificarIsbnTituloAdd(isbn, titulo)

        if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(tituloAdd.value)) {
            tituloAdd.classList.add('is-valid');
            tituloAdd.classList.remove('is-invalid')
            if (isDuplicate) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'TITULO ya registrado en el sistema!',
                    confirmButtonColor: '#16a084',
                })
                tituloAdd.classList.add('is-invalid');
            }
        }
        else {
            tituloAdd.classList.add('is-invalid');
        }
    });

ilustracionAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(ilustracionAdd.value)) {
        ilustracionAdd.classList.add('is-valid');
        ilustracionAdd.classList.remove('is-invalid')
    } else {
        ilustracionAdd.classList.add('is-invalid');
    }
});

autorAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(autorAdd.value)) {
        autorAdd.classList.add('is-valid');
        autorAdd.classList.remove('is-invalid')
    } else {
        autorAdd.classList.add('is-invalid');
    }
});

ciudadAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(ciudadAdd.value)) {
        ciudadAdd.classList.add('is-valid');
        ciudadAdd.classList.remove('is-invalid')
    } else {
        ciudadAdd.classList.add('is-invalid');
    }
});

impresionAdd.addEventListener('input', () => {
    if (/^^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(impresionAdd.value)) {
        impresionAdd.classList.add('is-valid');
        impresionAdd.classList.remove('is-invalid')
    } else {
        impresionAdd.classList.add('is-invalid');
    }
});

editorialAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(editorialAdd.value)) {
        editorialAdd.classList.add('is-valid');
        editorialAdd.classList.remove('is-invalid')
    } else {
        editorialAdd.classList.add('is-invalid');
    }
});

document.getElementById('formAddBook').addEventListener('submit', (e) => {

    if (isbnAdd.value === '' && tituloAdd.value === '' && ilustracionAdd.value === '' && impresionAdd.value === '' && autorAdd.value === '' && editorialAdd.value === '' && ciudadAdd.value === '') {
        isbnAdd.classList.add('is-invalid');
        tituloAdd.classList.add('is-invalid');
        ilustracionAdd.classList.add('is-invalid');
        impresionAdd.classList.add('is-invalid');
        autorAdd.classList.add('is-invalid');
        editorialAdd.classList.add('is-invalid');
        ciudadAdd.classList.add('is-invalid');

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!.',
        })
    } else if (isbnAdd.length == 0 || !/^[0-9\s-]+$/.test(isbnAdd.value)) {
        isbnAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo isbn correctamente!',
        })
    }
    else if (tituloAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(tituloAdd.value)) {
        tituloAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo titulo correctamente!',
        })
    }
    else if (ilustracionAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(ilustracionAdd.value)) {
        ilustracionAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ilustrador correctamente!',
        })
    }
    else if (impresionAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(impresionAdd.value)) {
        impresionAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo impresión correctamente!',
        })
    }
    else if (autorAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(autorAdd.value)) {
        autorAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo autor correctamente!',
        })
    }
    else if (editorialAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(editorialAdd.value)) {
        editorialAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo editorial correctamente!',
        })
    }
    else if (ciudadAdd.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(ciudadAdd.value)) {
        ciudadAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ciudad correctamente!',
        })
    }
});

const closeFormAddBook = document.getElementById('closeFormAddBook');
closeFormAddBook.addEventListener('click', () => {
    // Restablecer los valores de los campos del formulario
    isbnAdd.value = '';
    tituloAdd.value = '';
    ilustracionAdd.value = '';
    autorAdd.value = '';
    ciudadAdd.value = '';
    impresionAdd.value = '';
    editorialAdd.value = '';

    // Remover las clases de validación e invalidación de los campos
    isbnAdd.classList.remove('is-valid', 'is-invalid');
    tituloAdd.classList.remove('is-valid', 'is-invalid');
    ilustracionAdd.classList.remove('is-valid', 'is-invalid');
    autorAdd.classList.remove('is-valid', 'is-invalid');
    ciudadAdd.classList.remove('is-valid', 'is-invalid');
    impresionAdd.classList.remove('is-valid', 'is-invalid');
    editorialAdd.classList.remove('is-valid', 'is-invalid');
    reset();
});



//--------------------------------------- PARA EL MODAL DE REGISTRO DE LIBROS---------------------------------------------------
async function verificarIsbnTituloUpdate(idLibro, isbn, titulo) {
    try {
        const validation = await fetch('http://localhost:8282/api/libros/validationUpdateBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, isbn, idLibro })
        });

        const validationResult = await validation.json();

        return validationResult.msg === 'El ISBN o el TITULO ya están registrados';
    } catch (error) {
        // Manejar el error aquí si es necesario
        return false;
    }
}

const idLibroU = document.getElementById('idLibroU');
const isbnUpdate = document.getElementById('isbnU');
const tituloUpdate = document.getElementById('tituloU');
const ilustracionUpdate = document.getElementById('ilustradorU');
const autorUpdate = document.getElementById('autorU');
const ciudadUpdate = document.getElementById('ciudadU');
const impresionUpdate = document.getElementById('impresionU');
const editorialUpdate = document.getElementById('editorialU');

isbnUpdate.addEventListener('input', async () => {
    const idLibro = parseInt(idLibroU.value)
    const isbn = isbnUpdate.value
    const titulo = ""

    const isDuplicate = await verificarIsbnTituloUpdate(idLibro, isbn, titulo)

    if (isbn.length > 9 && /^[0-9\s-]+$/.test(isbnUpdate.value)) {
        isbnUpdate.classList.add('is-valid');
        isbnUpdate.classList.remove('is-invalid')
        if (isDuplicate) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Isbn ya registrado en el sistema!',
                confirmButtonColor: '#16a084',
            })
            isbnUpdate.classList.add('is-invalid');
        }
    }
    else {
        tituloUpdate.classList.add('is-invalid');
    }
});

tituloUpdate.addEventListener('input', async () => {
    const idLibro = parseInt(idLibroU.value)
    const isbn = ""
    const titulo = tituloUpdate.value

    const isDuplicate = await verificarIsbnTituloUpdate(idLibro, isbn, titulo)

    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(tituloUpdate.value)) {
        tituloUpdate.classList.add('is-valid');
        tituloUpdate.classList.remove('is-invalid')
        if (isDuplicate) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'TITULO ya registrado en el sistema!',
                confirmButtonColor: '#16a084',
            })
            tituloUpdate.classList.add('is-invalid');
        }
    }
    else {
        tituloUpdate.classList.add('is-invalid');
    }
});

ilustracionUpdate.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(ilustracionUpdate.value)) {
        ilustracionUpdate.classList.add('is-valid');
        ilustracionUpdate.classList.remove('is-invalid')
    } else {
        ilustracionUpdate.classList.add('is-invalid');
    }
});

autorUpdate.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(autorUpdate.value)) {
        autorUpdate.classList.add('is-valid');
        autorUpdate.classList.remove('is-invalid')
    } else {
        autorUpdate.classList.add('is-invalid');
    }
});

ciudadUpdate.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(ciudadUpdate.value)) {
        ciudadUpdate.classList.add('is-valid');
        ciudadUpdate.classList.remove('is-invalid')
    } else {
        ciudadUpdate.classList.add('is-invalid');
    }
});

impresionUpdate.addEventListener('input', () => {
    if (/^^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(impresionUpdate.value)) {
        impresionUpdate.classList.add('is-valid');
        impresionUpdate.classList.remove('is-invalid')
    } else {
        impresionUpdate.classList.add('is-invalid');
    }
});

editorialUpdate.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(editorialUpdate.value)) {
        editorialUpdate.classList.add('is-valid');
        editorialUpdate.classList.remove('is-invalid')
    } else {
        editorialUpdate.classList.add('is-invalid');
    }
});

document.getElementById('modalUpdateBook').addEventListener('submit', (e) => {

    if (isbnUpdate.value === '' && tituloUpdate.value === '' && ilustracionUpdate.value === '' && impresionUpdate.value === '' && autorUpdate.value === '' && editorialUpdate.value === '' && ciudadUpdate.value === '') {
        isbnUpdate.classList.add('is-invalid');
        tituloUpdate.classList.add('is-invalid');
        ilustracionUpdate.classList.add('is-invalid');
        impresionUpdate.classList.add('is-invalid');
        autorUpdate.classList.add('is-invalid');
        editorialUpdate.classList.add('is-invalid');
        ciudadUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el formulario correctamente!!!',
        })
    } else if (isbnUpdate.length == 0 || !/^[0-9\s-]+$/.test(isbnUpdate.value)) {
        isbnUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo isbn correctamente!',
        })
    }
    else if (tituloUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(tituloUpdate.value)) {
        tituloUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo titulo correctamente!',
        })
    }
    else if (ilustracionUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(ilustracionUpdate.value)) {
        ilustracionUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ilustrador correctamente!',
        })
    }
    else if (impresionUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(impresionUpdate.value)) {
        impresionUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo impresión correctamente!',
        })
    }
    else if (autorUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(autorUpdate.value)) {
        autorUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo autor correctamente!',
        })
    }
    else if (editorialUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(editorialUpdate.value)) {
        editorialUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo editorial correctamente!',
        })
    }
    else if (ciudadUpdate.length == 0 || !/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ., ]+$/.test(ciudadUpdate.value)) {
        ciudadUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ciudad correctamente!',
        })
    }
});

const closeFormUpdateBook = document.getElementById('closeFormUpdateBook');

// Agregar el evento de escucha al botón de cerrar
closeFormUpdateBook.addEventListener('click', () => {
    // Restablecer los valores de los campos del formulario
    isbnUpdate.value = '';
    tituloUpdate.value = '';
    ilustracionUpdate.value = '';
    autorUpdate.value = '';
    ciudadUpdate.value = '';
    impresionUpdate.value = '';
    editorialUpdate.value = '';

    // Remover las clases de validación e invalidación de los campos
    isbnUpdate.classList.remove('is-valid', 'is-invalid');
    tituloUpdate.classList.remove('is-valid', 'is-invalid');
    ilustracionUpdate.classList.remove('is-valid', 'is-invalid');
    autorUpdate.classList.remove('is-valid', 'is-invalid');
    ciudadUpdate.classList.remove('is-valid', 'is-invalid');
    impresionUpdate.classList.remove('is-valid', 'is-invalid');
    editorialUpdate.classList.remove('is-valid', 'is-invalid');
});


//------------------------------------------PARA EL MODAL DE REGISTRO DE EJEMPLARES----------------------------------------------------
const ejemplarAdd = document.getElementById('ejemplarAdd');
const observacionAdd = document.getElementById('observacionAdd');

ejemplarAdd.addEventListener('input', async () => {
    const idLibro = parseInt(document.getElementById("idLibroEjemplarAdd").value)
    const ejemplar = parseInt(ejemplarAdd.value);

    if (/^[0-9\s]+$/.test(ejemplarAdd.value)) {
        ejemplarAdd.classList.add('is-valid');
        ejemplarAdd.classList.remove('is-invalid')

        const response = await fetch('http://localhost:8282/api/libros/validationCopieAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ejemplar, idLibro })
        });

        const validationResult = await response.json()
        console.log(validationResult)
        if (validationResult.msg === 'El ejemplar ya esta registrado') {
            await Swal.fire({
                confirmButtonColor: '#16a084',
                icon: 'error',
                title: 'Oops...',
                text: 'Este numero de ejemplar se encuentra registrado!',
            })
            ejemplarAdd.classList.add('is-invalid');
        }
        } else {
            ejemplarAdd.classList.add('is-invalid');
        }
    }
);

observacionAdd.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(observacionAdd.value)) {
        observacionAdd.classList.add('is-valid');
        observacionAdd.classList.remove('is-invalid')

    } else {
        observacionAdd.classList.add('is-invalid');
    }
});

document.getElementById('formAddCopy').addEventListener('submit', (e) => {

    if (ejemplarAdd.length == 0 || !/^[0-9\s-]+$/.test(ejemplarAdd.value)) {
        ejemplarAdd.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ejemplar correctamente!',
        })
    }

});

const closeFormAddCopy = document.getElementById('closeFormAddCopy');
closeFormAddCopy.addEventListener('click', () => {
    // Restablecer los valores de los campos del formulario
    ejemplarAdd.value = '';
    observacionAdd.value = '';

    // Remover las clases de validación e invalidación de los campos
    ejemplarAdd.classList.remove('is-valid', 'is-invalid');
    observacionAdd.classList.remove('is-valid', 'is-invalid');

});

//--------------------------------------- PARA EL MODAL DE ACTUALIZACIÓN DE EJEMPLARES---------------------------------------------------

const ejemplarUpdate = document.getElementById('ejemplarUpdate');
const observacionUpdate = document.getElementById('observacionUpdate');

ejemplarUpdate.addEventListener('input', async () => {
    const idLibro = parseInt(document.getElementById("idLibroEjemplarUpdate").value)
    const ejemplar = parseInt(ejemplarUpdate.value);
    const idEjemplar = parseInt(document.getElementById("idEjemplarUpdate").value)

    if (/^[0-9\s]+$/.test(ejemplarUpdate.value)) {
        ejemplarUpdate.classList.add('is-valid');
        ejemplarUpdate.classList.remove('is-invalid')

        const response = await fetch('http://localhost:8282/api/libros/validationCopieUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ejemplar, idLibro, idEjemplar })
        });

        const validationResult = await response.json()
        console.log(validationResult)
        if (validationResult.msg === 'El ejemplar ya esta registrado') {
            await Swal.fire({
                confirmButtonColor: '#16a084',
                icon: 'error',
                title: 'Oops...',
                text: 'Este numero de ejemplar se encuentra registrado!',
            })
            ejemplarUpdate.classList.add('is-invalid');
        }
        
    } else {
        ejemplarUpdate.classList.add('is-invalid');
    }
});

observacionUpdate.addEventListener('input', () => {
    if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9., ]+$/.test(observacionUpdate.value)) {
        observacionUpdate.classList.add('is-valid');
        observacionUpdate.classList.remove('is-invalid')
    } else {
        observacionUpdate.classList.add('is-invalid');
    }
});

document.getElementById('formUpdateCopy').addEventListener('submit', (e) => {

    if (ejemplarUpdate.length === 0 || !/^[0-9]+$/.test(ejemplarUpdate.value)) {
        ejemplarUpdate.classList.add('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#16a084',
            text: 'Ingrese el campo ejemplar correctamente!',
        })
    }

});

const closeFormUpdateCopy = document.getElementById('closeFormUpdateCopy');
closeFormUpdateCopy.addEventListener('click', () => {
    // Restablecer los valores de los campos del formulario
    ejemplarUpdate.value = '';
    observacionUpdate.value = '';
    ejemplarUpdate.classList.remove('is-valid', 'is-invalid');
    observacionUpdate.classList.remove('is-valid', 'is-invalid');
    closeFormUpdateCopy.reset();
});


const closeFormlistCopies = document.getElementById('closeFormlistCopies');
closeFormlistCopies.addEventListener('click', () => {
    const tdElement = document.getElementById('idBookEjemplar');
    const idLibro = tdElement.getAttribute('value');
});