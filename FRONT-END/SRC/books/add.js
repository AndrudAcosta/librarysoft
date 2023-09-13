async function AddBook(isbn,titulo) {

    const newBook = {
        idCategoriaLibro : parseInt(document.getElementById('select-categories').value),
        isbn : isbn,
        titulo : titulo,
        ilustracion : document.getElementById('ilustrador').value,
        autor : document.getElementById('autor').value,
        impresion : document.getElementById('impresion').value,
        ciudad : document.getElementById('ciudad').value,
        editorial : document.getElementById('editorial').value,
      };

    try {
      const response = await  fetch('http://localhost:8282/api/libros/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      });

      if (!response.ok) {
        throw new Error('Error al agregar el libro')
      }else{
        await Swal.fire({
          confirmButtonColor: '#16a084',
          icon: 'success',
          title: 'Libro registrado exitosamente.',
          showConfirmButton: true, // Mostrar botón de confirmación
          confirmButtonText: 'Aceptar' // Personalizar el texto del botón de confirmación
        });
        location.assign('libros.php');
        reset();   
      }

    } catch (error) {
      console.error(error);
    }
}

const formAddBook = document.getElementById('formAddBook');

formAddBook.addEventListener('submit', async (event) => {
  event.preventDefault();

  const isbn = document.getElementById('isbn').value;
  const titulo = document.getElementById('titulo').value;

  try {
    const validation = await fetch('http://localhost:8282/api/libros/validationAddBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isbn, titulo })
    });

    const validationResult = await validation.json();

    if (validationResult.msg === 'El ISBN o el TITULO ya están registrados') {
      await Swal.fire({
        confirmButtonColor: '#16a084',
        icon: 'error',
        title: 'Oops...',
        text: 'Este Titulo o ISBN ya se encuentran registrados.',
      })
    }else{
      AddBook(isbn,titulo)
    }
    
  } catch (error) {
    console.log(error)
  }
});



document.getElementById('formAddCopy').addEventListener('submit', AddCopy); 

async function AddCopy(event) {
  event.preventDefault();
  console.log(document.getElementById("idLibroEjemplarAdd").value)

  let descripcionAdd = document.getElementById('observacionAdd').value;
  let idLibro = document.getElementById("idLibroEjemplarAdd").value
  console.log(idLibro)

  if(descripcionAdd === '' || descripcionAdd === ' '){
    descripcionAdd = 'Ninguna'
  }



  const newCopy = {
      idEstadoEjemplar : parseInt(document.getElementById('select-statecopy').value),
      idLibro : idLibro,
      ejemplar : parseInt(document.getElementById('ejemplarAdd').value),
      descripcion : descripcionAdd,
  };

    try {
      
      const response = await  fetch('http://localhost:8282/api/libros/copie/addCopy', {  
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCopy)
      });
      const data = await response.json()
      if(data.msg === 'Entrada duplicada'){
        await Swal.fire({
          confirmButtonColor: '#16a084',
          icon: 'error',
          title: 'Oops...',
          text: 'Este numero de ejemplar se encuentra registrado.',
        })
      }else if (!response.ok){
        throw new Error('Error al agregar el ejemplar')
      }else{
        await Swal.fire({
          confirmButtonColor: '#16a084',
          icon: 'success',
          title: 'Ejemplar registrado exitosamente.',
          showConfirmButton: true, // Mostrar botón de confirmación
          confirmButtonText: 'Aceptar' // Personalizar el texto del botón de confirmación
        });
        availableCounter(newCopy.idLibro)
        location.assign('libros.php');
        reset();
      }
      // Realiza cualquier otra acción necesaria después de agregar el libro
    } catch (error) {
      console.error('Error en la solicitud:',error);
    }
}
;
