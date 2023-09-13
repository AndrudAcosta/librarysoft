const listarSanciones = async () => {
  try {
    load();
    const response = await fetch('http://localhost:8282/api/sanciones/todos');

    if (response.status === 200) {
      const data = await response.json();

      const sanciones = data.sanciones;
      const documento = parseInt(document.getElementById('documentoDelUsuario').textContent); // Convertir el valor a número
      const filteredSanciones = filterSancionesByDocumentoAndPermisos(sanciones, documento);

      renderSancionesResult(filteredSanciones);
    } else {
    }
  } catch (error) {
    console.error('Ocurrio un problema al obtener las sanciones:', error);
  } finally {
    close.load();
  }
};

function filterSancionesByDocumentoAndPermisos(sanciones, documento) {
   // Obtén los permisos desde PHP

  if (permisos.includes('Dashboard') || permisos.includes('Roles') || permisos.includes('Usuarios')) {
    return sanciones; // Mostrar todas las sanciones si el usuario tiene los permisos
  } else {
    return sanciones.filter(sancion => sancion.documento === documento);
  }
}

function renderSancionesResult(sanciones) {
  const table = $('#table_sanciones').DataTable();
  table.clear().draw(); 
  sanciones.forEach((sancion) => {
    const fechaAsignacion = new Date(sancion.fechaAsignacion).toLocaleDateString();
    const fechaCierre = new Date(sancion.fechaCierre).toLocaleDateString();

    let editButton = '';
    let viewButton = '';

    if (permisos.includes('Dashboard') || permisos.includes('Roles') || permisos.includes('Usuarios')) {
      editButton = `
        <button type="button" class="btn btn" id="libedit" data-bs-toggle="modal" data-bs-target="#EditSan" onclick="obtenerSancion(${sancion.idSancion})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>`;
    } else {
      viewButton = `
        <button type="button" class="btn" id="libver" data-bs-target="#VerSan" data-bs-toggle="modal" onclick="verSancion(${sancion.idSancion})">
          <i class="fa-solid fa-eye"></i>
        </button>`;
    }

    let fileTable = `
      <tr>
        <td hidden>${sancion.idSancion}</td>
        <td>${sancion.documento}</td>
        <td>${sancion.nombres} ${sancion.apellidos}</td>
        <td>${sancion.nombreTipo}</td>
        <td>${fechaAsignacion}</td>
        <td>${fechaCierre}</td>
        <td>${sancion.nombreEstado}</td>
        <td style="text-align: center;">
          ${editButton}
          ${viewButton}
        </td>
      </tr>
    `;

    table.row.add($(fileTable)).draw();
  });

  setTimeout(() => {
    closeLoad()
  }, 1000);
}
