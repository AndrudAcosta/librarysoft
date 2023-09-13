const ListarPrestamos = async () => {
  try {
    load();
    const response = await fetch('http://localhost:8282/api/prestamos/todosP');

    if (response.status === 200) {
      const data = await response.json();

      const prestamos = data.prestamos;
      const documento = parseInt(document.getElementById('documentoDelUsuario').textContent); // Convertir el valor a número
      const filteredPrestamos = filterPrestamosByDocumentoAndPermisos(prestamos, documento);

      renderPrestamosResult(filteredPrestamos);
    } else {
      console.error('Ocurrió un problema al obtener los prestamos');
    }
  } catch (error) {
    console.error('Ocurrió un problema al obtener los prestamos:', error);
  } finally {
  }
};


function filterPrestamosByDocumentoAndPermisos(prestamos, documento) {
  // Obtén los permisos desde PHP
  if (permisos.includes('Dashboard') || permisos.includes('Roles') || permisos.includes('Usuarios')) {
    return prestamos; // Mostrar todos los préstamos si el usuario tiene los permisos
  } else {
    return prestamos.filter(prestamo => prestamo.documento === documento);
  }
}


const renderPrestamosResult = (prestamos) => {
  const table = $('#table_prestamos').DataTable();
  table.clear().draw();

  prestamos.forEach((prestamos) => {

    const documento = prestamos.documento;
    const nombres = prestamos.nombres;
    const nombreRol = prestamos.nombreRol;
    const fechaInicio = prestamos.fechaInicio;
    const fechaCompromiso = prestamos.fechaCompromiso;
    const estadoPrestamo = prestamos.estadoPrestamo;
    const librosNoDevueltos = prestamos.librosNoDevueltos;

    let editButton = '';
    if (permisos.includes('Dashboard') || permisos.includes('Roles') || permisos.includes('Usuarios')) {
      editButton = `
      <button type="button" class="btn" id="libedit" data-bs-target="#modalUpdatePrestamo"
      data-bs-toggle="modal" onclick="verPrestamoUpdate(${prestamos.idPrestamo})"><i class="fa-solid fa-pen-to-square"></i></button>`;
    } 
      
    const fileTable = `
    <tr>
      <td scope="col">${documento}</td>
      <td scope="col">${nombres}</td>
      <td scope="col">${nombreRol}</td>
      <td scope="col">${fechaInicio}</td>
      <td scope="col">${fechaCompromiso}</td>
      <td scope="col">
       ${estadoPrestamo}  ${librosNoDevueltos ? ` <i class="fa-solid fa-triangle-exclamation fa-fade fa-lg" style="color: #fe9706;"></i>  ` : ''}
      </td>
      <td style="text-align: center;">
        ${editButton}
        <button type="button" class="btn" id="libver" data-bs-target="#modalViewPrestamo"
        data-bs-toggle="modal" onclick="verPrestamo(${prestamos.idPrestamo})"><i class="fa-solid fa-eye"></i></button>
      </td>
    </tr>
  `;

    table.row.add($(fileTable)).draw();
  });

  setTimeout(()=>{
    closeLoad()
  },1000)
}




