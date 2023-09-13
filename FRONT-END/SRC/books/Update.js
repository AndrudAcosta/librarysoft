const selectCategoriesU = document.getElementById('select-categoriesU');

const listCategoryUpdate = async (valueSelect, libroCategoria) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/categorias`);
        if (response.status === 200) {
            const data = await response.json();

            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.idCategoriaLibro;
                option.text = category.categoria;

                // Verificar si la categoría coincide con la del libro
                if (category.categoria === libroCategoria) {
                    option.selected = true;
                }
                valueSelect.appendChild(option);
            });

        } else if (response.status === 404) {
            console.log('El libro que buscas no existe');
        } else {
            console.log('Error');
        }
    } catch (error) {

    }
};

const listCopies = async (idBook) => {
    try {
        document.getElementById("idLibroEjemplarAdd").value = idBook

        const response = await fetch(`http://localhost:8282/api/libros/copies/${idBook}`);
        const data = await response.json();
        const table = $('#tableCopies').DataTable();
        table.clear().draw();
        if (response.status === 200) {
            data.forEach(copie => {
                document.getElementById("idLibroEjemplarUpdate").value = idBook
                const switchId = `stateUpdateCopy${copie.idEjemplar}`;
                const idSpan = `disponibleSpan${copie.idEjemplar}`;
                let copies = `
                                    <tr>
                                    <td id="idBookEjemplar" value="${idBook}" style="text-align: center;"hidden>${idBook}</td>
                                        <td id="idEjemplar" value="${copie.idEjemplar}" style="text-align: center;" hidden>${copie.idEjemplar}</td>
                                        <td style="text-align: center; ">${copie.ejemplar}</td>
                                        <td style="text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${copie.descripcion}</td>
                                        <td style="text-align: center;">${copie.estadoEjemplar}</td>
                                        <td style="text-align: center;">${copie.ubicacionEjemplar}</td>
                                        <td class="align-middle text-center">
                                            <div class="d-flex align-items-center justify-content-center h-100">
                                                <div class="form-switch">
                                                    <label class="mr-5" for="${switchId}" id="${idSpan}">${copie.disponibilidad ? 'Disponible' : 'No disponible'}</label>
                                                    <input class="form-check-input" value="${copie.disponibilidad}" type="checkbox" role="switch" ${copie.disponibilidad ? 'checked' : ''} id="${switchId}" onchange="UpdateStateCopy(${copie.idEjemplar},)">
                                                </div>
                                            </div>
                                        </td>                           
                                        <td style="text-align: center;">
                                            <button type="button" class="btn btn-z"
                                                 data-bs-toggle="modal" onclick="validationState('${copie.ubicacionEjemplar}', ${copie.idEjemplar})"><i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                        ${shouldShowButton(copie.ubicacionEjemplar) ? '<td style="text-align: center;"><button type="button" class="btn btn-libver" onclick="detailsCopyInLoan(' + copie.idEjemplar + ')"  data-bs-target="#modalViewPrestamo" data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button></td>' : '<td style="text-align: center;"><button class="btn btn-copies"><i class="fa-solid fa-eye"></i></button></td>'}
                                            
                                    </tr>
                                `;
                table.row.add($(copies)).draw();
            });
        }
    } catch (error) {
        console.log(error)
    }
}

function shouldShowButton(estadoEjemplar) { 
    return estadoEjemplar === 'Préstamo' || estadoEjemplar === 'Perdido';
}


const validationState = async (state, ejemplar) => {
    try {
        if (state === 'Préstamo' || state === 'Perdido') {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este ejemplar por su ubicación actual no se puede actualizar.',
                confirmButtonColor: '#16a084',
            })
            $('#modalCopies').modal('show');
        }
        else {
            $('#modalUpdateEjemplar').modal('show');
            LoadDataUpdateCopy(ejemplar)
        }
    } catch (error) {
        console.error(error);
    }
};

const LoadDataUpdateCopy = async (ejemplar) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/copie/${ejemplar}`);
        const copy = await response.json();

        if (response.status === 404) {
            return;
        }
        document.getElementById('idLibroEjemplarUpdate').value = copy.idLibro;
        document.getElementById('idEjemplarUpdate').value = copy.idEjemplar;
        document.getElementById('ejemplarUpdate').value = copy.ejemplar;
        document.getElementById('observacionUpdate').value = copy.descripcion;
        if (selectUpdateCopy.options.length === 0) {
            listCopyState(selectUpdateCopy, copy.estadoEjemplar);
        }
    } catch (error) {

    }
};

const LoadData = async (idLibro) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/${idLibro}`);
        const libro = await response.json();

        if (response.status === 404) {
            return;
        }
        document.getElementById('idLibroU').value = libro.idLibro;
        document.getElementById('isbnU').value = libro.isbn;
        document.getElementById('tituloU').value = libro.titulo;
        document.getElementById('ilustradorU').value = libro.ilustracion;
        document.getElementById('autorU').value = libro.autor;
        document.getElementById('impresionU').value = libro.impresion;
        document.getElementById('ciudadU').value = libro.ciudad;
        document.getElementById('editorialU').value = libro.editorial;
        if (selectCategoriesU.options.length === 0) {
            listCategoryUpdate(selectCategoriesU, libro.categoria);
        }

    } catch (error) {
        console.error('Error al cargar los datos del libro:', error);
    }
};

const formUpdateBook = document.getElementById('formUpdateBook');

formUpdateBook.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {

        const idLibro = parseInt(document.getElementById('idLibroU').value);
        const idCategoriaLibro = parseInt(document.getElementById('select-categoriesU').value);
        const isbn = document.getElementById('isbnU').value;
        const titulo = document.getElementById('tituloU').value;
        const ilustracion = document.getElementById('ilustradorU').value;
        const autor = document.getElementById('autorU').value;
        const ciudad = document.getElementById('ciudadU').value;
        const impresion = document.getElementById('impresionU').value;
        const editorial = document.getElementById('editorialU').value;


        // Crear el objeto de datos a enviar en la solicitud PUT
        const values = {
            idLibro,
            idCategoriaLibro,
            isbn,
            titulo,
            ilustracion,
            autor,
            ciudad,
            impresion,
            editorial,
        };
        

        // Realizar la solicitud PUT para actualizar los datos del libro
        const response = await fetch(`http://localhost:8282/api/libros/${idLibro}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const validation = await fetch('http://localhost:8282/api/libros/validationUpdateBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isbn, titulo, idLibro })
        });

        const validationResult = await validation.json();

        if (validationResult.msg === 'El ISBN o el TITULO ya están registrados') {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ISBN o TITULO ya registrados en el sistema.',
                confirmButtonColor: '#16a084',
              })
        }else if (response.status === 200) {
            availableCounter(idLibro)
            await Swal.fire({
                icon: 'success',
                title: 'Libro actualizado correctamente',
                showConfirmButton: true, // Mostrar botón de confirmación
                confirmButtonText: 'Aceptar', // Personalizar el texto del botón de confirmación
                confirmButtonColor: '#16a084'
            });
            location.assign('libros.php');
        } else {
            console.log('Error al actualizar el libro');
        }
    } catch (error) {
        throw new Error('Error al actualizar el libro', error)
    }
});

const UpdateStateCopy = async (idEjemplar) => {
    try {

        const responseCopy = await fetch(`http://localhost:8282/api/libros/copie/${idEjemplar}`)
        const copy = await responseCopy.json()
        const locationCopy = copy.ubicacionEjemplar
        const StateCopy = copy.estadoEjemplar

        const switchElement = document.getElementById(`stateUpdateCopy${idEjemplar}`)
        const check = switchElement.checked;
        const state = document.getElementById(`disponibleSpan${idEjemplar}`)

        if (locationCopy === 'Biblioteca' && StateCopy != 'En reparación') {
            const confirmed = await Swal.fire({
                title: '¿Estás seguro de modificar la disponibilidad del ejemplar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
                confirmButtonColor: '#16a084',
            })
            if (confirmed.isConfirmed === true) {
                const response = await fetch(`http://localhost:8282/api/libros/copie/${idEjemplar}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al actualizar el ejemplar.',
                        confirmButtonColor: '#16a084',
                    })
                } else {
                    state.textContent = check ? 'Disponible' : 'No disponible';
                    await Swal.fire({
                        icon: 'success',
                        title: 'Disponibilidad de ejemplar actualizado exitosamente.',
                        showConfirmButton: true, // Mostrar botón de confirmación
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#16a084'
                    });
                }
            } else {
                switchElement.checked = !check;
            }
        } else {
            switchElement.checked = false;
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este ejemplar por su ubicacion o estado actual no se puede actualizar.',
                confirmButtonColor: '#16a084',
            })
        }

    } catch (error) {
        throw new Error('Error al actualizar el ejemplar', error)
    }
};



const UpdateCopy = async () => {

    try {

        const tdElement = document.getElementById('idBookEjemplar');
        const idLibro = tdElement.getAttribute('value');
        const idEjemplar = parseInt(document.getElementById('idEjemplarUpdate').value);
        const idEstadoEjemplar = parseInt(document.getElementById('select-updateCopy').value);
        const ejemplar = parseInt(document.getElementById('ejemplarUpdate').value);
        let descripcion = document.getElementById('observacionUpdate').value;
        let disponibilidad = 1

        if (ejemplar.length === 0 || isNaN(ejemplar)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese el campo ejemplar correctamente.',
                confirmButtonColor: '#16a084',
            })
            return;
        }

        if (descripcion === '') {
            descripcion = 'Ninguna'
        }

        if (idEstadoEjemplar === 5 || idEstadoEjemplar === 6 || idEstadoEjemplar === 4 || idEstadoEjemplar === 3) {
            disponibilidad = 0
        }

        // Crear el objeto de datos a enviar en la solicitud PUT
        const values = {
            idEjemplar,
            idEstadoEjemplar,
            ejemplar,
            descripcion,
            disponibilidad
        };

        // Realizar la solicitud PUT para actualizar los datos del libro
        const response = await fetch(`http://localhost:8282/api/libros/copie/updatecopy/${idEjemplar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const data = await response.json();

        if (data.msg === 'Entrada duplicada al actualizar') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este numero de ejemplar ya esta registrado.',
                confirmButtonColor: '#16a084',
            })
        } else if (!response.ok) {
            console.log('Error al actualizar el libro');
        } else if (response.status === 404) {
            console.log('Libro no encontrado');
        } else {
            availableCounter(idLibro)
            await Swal.fire({
                icon: 'success',
                title: 'Libro actualizado correctamente.',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            });
            location.assign('libros.php');
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al actualizar el librp', error)
    }
};