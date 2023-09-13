//FUNCION PARA OBTENER LOS TIPOS DE SANCIONES
const obtenerTsanciones = async () => {
  try {
    const response = await fetch('http://localhost:8282/api/sanciones/sancionesT');
    if (!response.ok) {
      throw new Error('Error al obtener los tipos de sancion');
    }
    const data = await response.json();
    return data.tsancion;
  } catch (error) {
    console.error('Error al obtener los tipos de sancion:', error);
    throw error;
  }
};


//FUNCION PARA OBTENER LOS ESTADOS DE SANCIONES
const obtenerEsanciones = async () => {
  try {
    const response = await fetch('http://localhost:8282/api/sanciones/sancionesE');
    if (!response.ok) {
      throw new Error('Error al obtener los estados de sancion');
    }
    const data = await response.json();
    return data.esancion;
  } catch (error) {
    console.error('Error al obtener los estados de sancion:', error);
    throw error;
  }
};


//FUNCION PARA CARGAR LOS TIPOS DE SANCIONES EN SELECT
const cargarTiposEnSelect = async () => {
  try {
    const tsancion = await obtenerTsanciones();
    const selectTipo = document.getElementById('sancionR');
    tsancion.forEach((sancion) => {
      const option = document.createElement('option');
      option.value = sancion.nombreTipo;
      option.text = sancion.nombreTipo;
      selectTipo.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los roles en el select:', error);
  }
};
cargarTiposEnSelect();


//FUNCION PRA CARGAR LOS ESTADOS DE SANCIONES EN SELECT
const cargarEstadoEnSelect = async () => {
  try {
    const esancion = await obtenerEsanciones();
    const selectEstado = document.getElementById('estadoR');
    esancion.forEach((sancion) => {
      const option = document.createElement('option');
      option.value = sancion.nombreEstado;
      option.text = sancion.nombreEstado;
      selectEstado.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los roles en el select:', error);
  }
};
cargarEstadoEnSelect();

//FUNCION PARA OBTENER EL DATO DE BUSQUEDAD DEL BENEFICIARIO
const buscarBeneficiarios = (event) => {
  event.preventDefault(); // Evita que se recargue la página al enviar el formulario
  const inputBuscar = document.getElementById('documentoR');
  const valorBuscar = inputBuscar.value.trim(); // Obtiene el valor de búsqueda y elimina los espacios en blanco al principio y al final
  if (valorBuscar !== '') {
    realizarBusqueda(valorBuscar);
  }
};


//FUNCION PARA REALIZAR LA BUSQUEDAD DE ACUERDO AL DATO DE BUSQUEDAD
let idBeneficiario;
const realizarBusqueda = (filtro) => {
  if (filtro === '') {
    renderBeneficiariosResult([]); // Muestra un resultado vacío
    return;
  }
  fetch(`http://localhost:8282/api/sanciones/bene?filtro=${filtro}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Ocurrió un problema al buscar los beneficiarios:', error);
    })
    .then(async data => {
      if (data.tieneSancion) {
        //alert('Este beneficiario ya tiene una sanción activa');
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este beneficiario ya tiene una sanción activa.',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#16a084'
        })
        // Borra los datos de las variables
        idBeneficiario = undefined;
        renderBeneficiariosResult([]);
      } else {
        const beneficiarios = data.beneficiarios;
        renderBeneficiariosResult(beneficiarios);
        if (beneficiarios.length === 0) {
          //alert('No se encontraron resultados.');
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron resultados.',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16a084'
          })
        } else {
          idBeneficiario = beneficiarios[0].idBeneficiario;
        }
      }
    });
};

//FUNCION PARA RENDERIZAR LOS RESULTADOS DE LA BUSQUEDAD
const renderBeneficiariosResult = (beneficiarios) => {
  const datosbeneficiario = document.getElementById('datosbeneficiario');
  let inputHTML = '';
  if (beneficiarios.length === 0) {
    inputHTML += `
      <div class="col-md-6">
        <label class="formulario__label">Nombres</label>
        <input class="form-control" type="text" value="" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Apellidos</label>
        <input class="form-control" type="text" value="" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  } else {
    const beneficiario = beneficiarios[0]; // Obtener solo el primer beneficiario
    const nombres = beneficiario.nombres || '';
    const apellidos = beneficiario.apellidos || '';
    inputHTML += `
      <div class="col-md-6">
        <label class="formulario__label">Nombres</label>
        <input class="form-control" type="text" value="${nombres}" aria-label="readonly input example" readonly>
      </div>
      <div class="col-md-6">
        <label class="formulario__label">Apellidos</label>
        <input class="form-control" type="text" value="${apellidos}" aria-label="readonly input example" readonly>
      </div>
      <br>
    `;
  }
  datosbeneficiario.innerHTML = inputHTML;
};



//FUNCION PARA OBTENER LA FECHA ACTUAL DEL SISTEMA
let fechaActualGlobal;
const obtenerFechaActual = () => {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  fechaActualGlobal = `${year}-${month}-${day}`;
  return fechaActualGlobal;
};

let fechaActualMuestra;
const obtenerActualMuestra = () => {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  fechaActualMuestra = `${day}-${month}-${year}`;
  return fechaActualMuestra;
};


//FUNCION PARA RENDERIZAR LA FECHA ACTUAL DEL SISTEMA
const renderBenefechasResult = () => {
  const fechaInicio = obtenerFechaActual();
  const CampoFechas = document.getElementById('CampoFechas');
  const fechaVer = obtenerActualMuestra();
  let inputHTML = '';

  inputHTML += `
    <div class="col-md-12">
      <label class="formulario__label">Fecha Inicio</label>
      <input class="form-control" type="text" value="${fechaVer}" aria-label="readonly input example" readonly>
    </div>
  `;

  CampoFechas.innerHTML = inputHTML;
};

//FUNCION BOTON QUE SE ENCARGA DE EJECUTAR LAS FUNCIONES AL ABRIR LA MODAL
const agregarSanciones = document.getElementById('agregarSanciones');
agregarSanciones.addEventListener('shown.bs.modal', () => {
  renderBeneficiariosResult([]);
  renderBenefechasResult([]);
});


//FUNCION PARA REALIZAR EL GUARDADO DE LA SANCION
const agregarRol = async (idBeneficiario, fechaActualGlobal, estado, sancion, fechaFin, observacion) => {
  try {
    const body = {
      idBeneficiario,
      fechaActualGlobal,
      estado,
      sancion,
      fechaFin,
      observacion
    };
    const response = await fetch('http://localhost:8282/api/sanciones/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    //alert('Registro Exitoso');
    await Swal.fire({
      icon: 'success',
      title: 'Sanción registrada exitosamente.',
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    window.location.href = "sanciones.php";
  } catch (error) {
    console.error('Registro Fallido:', error);
    throw error;
  }
};


const agregarButton = document.getElementById('agregar');
agregarButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const estado = document.getElementById('estadoR').value;
  const sancion = document.getElementById('sancionR').value;
  const fechaFin = document.getElementById('finalR').value;
  const observacion = document.getElementById('observacionR').value;
  const fechaInicio = new Date(fechaActualGlobal);
  const fechaFinUsuario = new Date(fechaFin);
  const fechaMinimaPermitida = new Date(fechaInicio);
  fechaMinimaPermitida.setDate(fechaMinimaPermitida.getDate() + 7);

  // Validar que idBeneficiario no esté vacío
  if (!idBeneficiario) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese un beneficiario valido.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  if (fechaFin === '') {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese una Fecha Finalizacion valida.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }
  if (observacion === '') {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese una Observacion valida.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }
  if (fechaFinUsuario < fechaMinimaPermitida) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La fecha de finalización debe ser al menos 7 días después de la fecha de inicio.',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    return;
  }

  try {
    agregarRol(idBeneficiario, fechaActualGlobal, estado, sancion, fechaFin, observacion);
    await Swal.fire({
      icon: 'success',
      title: 'Sanción registrada exitosamente.',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a084'
    });
    window.location.href = "sanciones.php";
    formu.reset();
  } catch (error) {
    // Manejo de errores en caso de que falle la función agregarRol
  }
});
