/////////////////////////////BENEFICIARIOS////////////////////////////////////////////////////

///////////BUSCAR BENEFICIARIO/////////////

function ejecutarBuscar(event) {
  if (event.keyCode === 13 && !Swal.isVisible()) { // Verificar si la tecla presionada es Enter y la alerta no está visible
    buscarBeneficiarios(event);
  }
}


// Variables para controlar si las alertas ya se mostraron o no
let alertaBuscarMostrada = false;


const buscarBeneficiarios = (event) => {
  event.preventDefault();

  const BuscarDocumento = document.getElementById('BuscarDocumento');
  const valorBuscar = BuscarDocumento.value.trim();

  if (valorBuscar === '') {
    // Si el campo de búsqueda está vacío, muestra la alerta solo si aún no se ha mostrado
    if (!alertaBuscarMostrada) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, ingrese un dato de búsqueda.',
        confirmButtonColor: '#16a084',
        confirmButtonText: 'Aceptar'
      });
      alertaBuscarMostrada = true; // Marcamos la alerta como mostrada
    }
    renderBeneficiariosResult([]); // Borra los datos del render de beneficiarios
    renderBenefechasResult([]); // Borra los datos del render de fechas
    idBeneficiario = null; // Reseteamos la variable idBeneficiario cuando no hay datos de búsqueda
    return;
  }

  // Si el valor de búsqueda no está vacío, reseteamos la variable alertaBuscarMostrada
  alertaBuscarMostrada = false;

  realizarBusqueda(valorBuscar);
};


// Variables para controlar si las alertas ya se mostraron o no
let alertaBeneficiarioMostrada = false;
let alertaBeneficiarioMostradaLocal = false; // Variable global para controlar la alerta de "No se encontraron resultados"

const realizarBusqueda = (filtroBeneficiarios) => {
  if (filtroBeneficiarios === '') {
    // Si el campo de búsqueda está vacío, muestra la alerta solo si aún no se ha mostrado
    if (!alertaBeneficiarioMostrada) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, ingrese un dato de búsqueda.',
        confirmButtonColor: '#16a084',
        confirmButtonText: 'Aceptar'
      });
      alertaBeneficiarioMostrada = true; // Marcamos la alerta como mostrada
    }
    renderBeneficiariosResult([]); // Borra los datos del render de beneficiarios
    renderBenefechasResult([]); // Borra los datos del render de fechas
    idBeneficiario = null; // Reseteamos la variable idBeneficiario cuando no hay datos de búsqueda
    return;
  }

  // Si el valor de búsqueda no está vacío, reseteamos la variable alertaBeneficiarioMostrada
  alertaBeneficiarioMostrada = false;

  fetch(`http://localhost:8282/api/prestamos/todosB?filtroBeneficiarios=${filtroBeneficiarios}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Ocurrió un problema al buscar los beneficiarios:', error);
    })
    .then(async data => {
      const beneficiarios = data.beneficiarios;
      renderBeneficiariosResult(beneficiarios);
      renderBenefechasResult(beneficiarios);

      if (beneficiarios.length === 0) {
        // Si no se encontró ningún beneficiario, muestra la alerta solo si aún no se ha mostrado
        if (!alertaBeneficiarioMostradaLocal) {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron resultados.',
            confirmButtonColor: '#16a084',
            confirmButtonText: 'Aceptar'
          });
          alertaBeneficiarioMostradaLocal = true; // Marcamos la alerta como mostrada en esta llamada
        }
        idBeneficiario = null; // Reseteamos la variable idBeneficiario cuando no hay resultados en la búsqueda
        limpiarLibrosSeleccionados(); // Borrar los libros seleccionados al buscar un nuevo beneficiario
        return;
      }

      // Si se encontraron beneficiarios, reseteamos la variable alertaBeneficiarioMostradaLocal
      alertaBeneficiarioMostradaLocal = false;

      // Asigna el valor de idBeneficiario si se encuentra un beneficiario
      idBeneficiario = beneficiarios[0].idBeneficiario;
      plazo = beneficiarios[0].plazo;
      cantidadl = beneficiarios[0].cantidadl;
      cantidadp = beneficiarios[0].cantidadp;
      sinBeneficiario = false; // Actualiza la variable global sinBeneficiario

      if (beneficiarios[0].moduloPrestamoNoHabilitado) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este rol no tiene habilitado el módulo de préstamo.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        });
        sinBeneficiario = true;
      }
      
      if (beneficiarios[0].algunCampoNulo) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este beneficiario no puede realizar préstamos.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        });
        sinBeneficiario = true;
      }
      
      if (beneficiarios[0].tieneEstado0) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este beneficiario no está activo.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        });
        sinBeneficiario = true;
      }
      
      if (beneficiarios[0].tieneSancion) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este beneficiario tiene activa una sanción.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        });
        sinBeneficiario = true;
      }
      
      if (beneficiarios[0].alcanzoMaximo) {  
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este beneficiario ya alcanzó el máximo de préstamos activos.',
          confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
        });
        sinBeneficiario = true;
      }

      limpiarLibrosSeleccionados(); // borrar los libros seleccionados al buscar un nuevo beneficiario


    });
};





let sinBeneficiario;
let idBeneficiario;
let plazo;
let cantidadl;
let cantidadp;
/////////////FIN BUSCAR BENEFICIARIO/////////

/////////////LIMPIAR EL ARRAY LIBROS /////////
function limpiarLibrosSeleccionados() {
  librosSeleccionados.length = 0;
  generarRenderLibrosArray(librosSeleccionados);
}
/////////////FIN LIMPIAR EL ARRAY LIBROS /////////


////////////RENDER BENEFICIARIO///////////

// Variable para almacenar el contenido de los campos de entrada
let inputHTML = '';

const renderBeneficiariosResult = (beneficiarios) => {
  const CampoRegistro = document.getElementById('CampoRegistro');

  if (beneficiarios.length === 0) {
    inputHTML = `
      <div class="col-md-6">
        <label class="formulario__label">Nombre</label>
        <input class="form-control" type="text" value="" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Rol</label>
        <input class="form-control" type="text" value="" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  } else {
    const primerBeneficiario = beneficiarios[0];
    const nombre = primerBeneficiario.nombres || '';
    const rol = primerBeneficiario.nombreRol || '';

    inputHTML = `
      <div class="col-md-6">
        <label class="formulario__label">Nombre</label>
        <input class="form-control" type="text" value="${nombre}" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Rol</label>
        <input class="form-control" type="text" value="${rol}" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  }

  CampoRegistro.innerHTML = inputHTML;
};


const modalAddPrestamo = document.getElementById('modalAddPrestamo');
modalAddPrestamo.addEventListener('shown.bs.modal', () => {
  // No renderizar los campos si hay beneficiarios
  if (inputHTML === '') {
    renderBeneficiariosResult([]);
  }
});

//////////FIN RENDER BENEFICIARIO/////////


/////////////////////////////FIN BENEFICIARIOS////////////////////////////////////////////////////


/////////////////////////////LIBROS////////////////////////////////////////////////////


///////// BUSCAR//////////////////
const buscarLibros = (event) => {
  event.preventDefault(); // Evita que se recargue la página al enviar el formulario

  const buscarLibro = document.getElementById('buscarLibro');
  const valorBuscar = buscarLibro.value.trim(); // Obtiene el valor de búsqueda y elimina los espacios en blanco al principio y al final

  realizarBusquedaLibros(valorBuscar);

  if (valorBuscar === '') 
    // Si el campo de búsqueda está vacío, muestra la alerta solo si aún no se ha mostrado
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, ingrese un dato de búsqueda.',
        confirmButtonColor: '#16a084',
        confirmButtonText: 'Aceptar'
      });
    
    
};

const realizarBusquedaLibros = (filtroLibro) => {
  if (filtroLibro === '') {
    // Si no se especifica un filtro, no se realiza la búsqueda
    renderLibrosResult([]); // Se muestra un resultado vacío
    return;
  }
  fetch(`http://localhost:8282/api/prestamos/todosL?filtroLibro=${filtroLibro}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Ocurrió un problema al buscar los libros:', error);
      // Manejo del error, por ejemplo, mostrar una alerta
    })
    .then(async data => {
      const libros = data.libros;
      
      if (!libros || libros.length === 0) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontraron resultados.',
          confirmButtonColor: '#16a084',
          confirmButtonText: 'Aceptar'
        });
      }
      renderLibrosResult(libros);
    });
};
///////// FIN BUSCAR//////////////////


///////// RENDER LIBROS ARRAY//////////////////


function renderLibrosResult(libros) {
  const table = $('#tablaLibrosBuscar').DataTable();
  table.clear().draw();

  if (libros && libros.length > 0) {
    libros.forEach((libro) => {
      const idEjemplar = libro.idEjemplar;
      const isbn = libro.isbn;
      const titulo = libro.titulo;
      const ejemplar = libro.ejemplar;
      const idEstadoEjemplar = libro.idEstadoEjemplar;

      let tableLibros = `
        <tr>
          <td>${isbn}</td>
          <td>${titulo}</td>
          <td>${ejemplar}</td>
          <td style="text-align: center;">
            <button type="button" class="btn btn" id="actualizar" onclick="agregarLibro(${idEjemplar}, '${isbn}', '${titulo}', '${ejemplar}', '${idEstadoEjemplar}')">
              <i class="fa-solid fa-book-medical"></i>
            </button>
          </td>
        </tr>
      `;

      table.row.add($(tableLibros)).draw();
    });
  } else {
  }
}


const buscarLibro = document.getElementById('buscarLibro');
buscarLibro.addEventListener('input', () => {
  if (buscarLibro.value.trim() === '') {
    
  }
});

///////// FIN RENDER LIBROS ARRAY//////////////////



///////// RENDER ARRAY PRESTAMOS//////////////////

function generarRenderLibrosArray(libros) {
  const table = $('#tablaLibrosArray').DataTable();
  table.clear().draw();

  libros.forEach((libro) => {
    const idEjemplar = libro.idEjemplar;
    const isbn = libro.isbn;
    const titulo = libro.titulo;
    const ejemplar = libro.ejemplar;

    let tableLibros = `
      <tr>
        <td style="text-align: center;">${isbn}</td>
        <td style="text-align: center;">${titulo}</td>
        <td style="text-align: center;">${ejemplar}</td>
        <td style="text-align: center;">
          <button type="button" class="btn" id="libdelete" onclick="eliminarLibro('${idEjemplar}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;

    table.row.add($(tableLibros)).draw();
  });
}



///////// FIN RENDER ARRAY PRESTAMOS//////////////////



///////// AGREGAR LIBROS AL ARRAY  //////////////////


const librosSeleccionados = [];


async function agregarLibro(idEjemplar, isbn, titulo, ejemplar, idEstadoEjemplar) {
  if (!idBeneficiario) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se ha seleccionado un beneficiario. Por favor, busque y seleccione un beneficiario válido antes de agregar un ejemplar.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  if (librosSeleccionados.length >= cantidadl) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `La cantidad máxima de ejemplares (${cantidadl}) ya ha sido alcanzada.`,
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const libroExistente = librosSeleccionados.find((libro) => libro.idEjemplar === idEjemplar && libro.isbn === isbn && libro.titulo === titulo && libro.ejemplar === ejemplar && libro.idEstadoEjemplar === idEstadoEjemplar); 
  if (libroExistente) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El ejemplar ya ha sido agregado.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const libroSeleccionado = { idEjemplar, isbn, titulo, ejemplar, idEstadoEjemplar }; 
  librosSeleccionados.push(libroSeleccionado);
  Swal.fire({
    title: 'El ejemplar ha sido agregado.',
    icon: 'success',
    timer: 1500,
    showConfirmButton: false
  });
  

  generarRenderLibrosArray(librosSeleccionados);
}


function eliminarLibro(idEjemplar) {
  const index = librosSeleccionados.findIndex((libro) => libro.idEjemplar.toString() === idEjemplar.toString());

  if (index !== -1) {
    librosSeleccionados.splice(index, 1);
  } else {
  }

  
 
  generarRenderLibrosArray(librosSeleccionados);

  if (librosSeleccionados.length === 0) {
    Swal.fire({
      title: '¡Todos los ejemplares han sido eliminados!',
      icon: 'success',
      timer: 1500, 
      showConfirmButton: false
    });
  }
}

window.eliminarLibro = eliminarLibro;


/////////FIN AGREGAR LIBROS AL ARRAY  //////////////////

/////////////////////////////FIN LIBROS////////////////////////////////////////////////////


/////////////////////////////FECHAS////////////////////////////////////////////////////


/////////FUNCIONES FECHAS//////////////////

const obtenerFechaActual = () => {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  fechaActualGlobal = `${year}-${month}-${day}`;
  return fechaActualGlobal;
};

const obtenerFechaCompromiso = (plazo) => {
  if (sinBeneficiario == true)
  {
    // La variable idBeneficiario no está definida o es null, no se devuelve ningún valor
    return '';
  }
  
  const fechaActual = new Date();
  const fechaCompromiso = new Date(fechaActual);

  fechaCompromiso.setDate(fechaCompromiso.getDate() + plazo);

  // Verificar si la fecha compromiso supera el límite del 2 de diciembre del año actual
  const limiteFechaCompromiso = new Date(fechaActual.getFullYear(), 11, 2);
  if (fechaCompromiso > limiteFechaCompromiso) {
    fechaCompromiso.setDate(limiteFechaCompromiso.getDate());
    fechaCompromiso.setMonth(limiteFechaCompromiso.getMonth());
    fechaCompromiso.setFullYear(limiteFechaCompromiso.getFullYear());
  }

  const year = fechaCompromiso.getFullYear();
  const month = (fechaCompromiso.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaCompromiso.getDate().toString().padStart(2, '0');

  fechaCompromisoGlobal = `${year}-${month}-${day}`;
  return fechaCompromisoGlobal;
};

/////////FIN FUNCIONES FECHAS//////////////////



let inputHTMLFechas = '';

const renderBenefechasResult = (beneficiarios) => {
  const CampoFechas = document.getElementById('CampoFechas');

  if (beneficiarios.length === 0) {
    const fechaInicio = obtenerFechaActual();
    inputHTMLFechas = `
      <div class="col-md-6">
        <label class="formulario__label">Fecha Inicio</label>
        <input class="form-control" type="text" value="${fechaInicio}" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Fecha Compromiso</label>
        <input class="form-control" type="text" value="" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  } else {
    const primerBeneficiario = beneficiarios[0];
    const plazo = primerBeneficiario.plazo || '';
    const fechaInicio = obtenerFechaActual();
    const fechaCompromiso = obtenerFechaCompromiso(plazo);

    inputHTMLFechas = `
      <div class="col-md-6">
        <label class="formulario__label">Fecha Inicio</label>
        <input class="form-control" type="text" value="${fechaInicio}" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Fecha Compromiso</label>
        <input class="form-control" type="text" value="${fechaCompromiso}" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  }

  CampoFechas.innerHTML = inputHTMLFechas;
};


const modalAddPrestamos = document.getElementById('modalAddPrestamo');
modalAddPrestamos.addEventListener('shown.bs.modal', () => {
  // No renderizar los campos de fecha si ya se han renderizado antes
  if (inputHTMLFechas === '') {
    renderBenefechasResult([]);
  }
});


///////// FIN RENDER FECHAS//////////////////

/////////////////////////////FIN FECHAS////////////////////////////////////////////////////



/////////////////////////////AGREGAR PRESTAMO////////////////////////////////////////////////////


const agregarPrestamo = async () => {

  if (!idBeneficiario || idBeneficiario.length === 0) {
    console.error('No se ha seleccionado un beneficiario');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, busque un beneficiario.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  if (!librosSeleccionados || librosSeleccionados.length === 0) {
    console.error('No se han seleccionado libros');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, agregue algún ejemplar.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  if (!idBeneficiario || !fechaCompromisoGlobal || !fechaActualGlobal) {
    console.error('Faltan campos requeridos');
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, complete todos los campos requeridos.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const body = {
    idBeneficiario,
    fechaCompromisoGlobal,
    fechaActualGlobal,
    libros: librosSeleccionados
  };

  const response = await fetch('http://localhost:8282/api/prestamos/agregar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.ok) {
    await Swal.fire({
      icon: 'success',
      title: 'El préstamo se agregó correctamente.',
      confirmButtonColor: '#16a084',
      confirmButtonText: 'Aceptar'
    });
    window.location.href = 'préstamos.php';
  }



};
/////////////////////////////FIN AGREGAR PRESTAMO////////////////////////////////////////////////////
