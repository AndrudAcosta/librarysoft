const listarRoles = async () => {
  try {
    load();
    const response = await fetch('http://localhost:8282/api/roles/todos');

    if (response.status === 200) {
      const data = await response.json();
      renderRolesResult(data.roles);
    } else {
    }
  } catch (error) {
    console.error('Ocurrió un problema al obtener los roles:', error);
    // Manejo del error, por ejemplo, mostrar una alerta
  } finally {
    close_load();
  }
};

function renderRolesResult(roles) {
  const table = $('#table_roles').DataTable();
  table.clear().draw();

  roles.forEach((rol) => {
    const switchId = `estado-switch-${rol.idRol}`;
    const estadoActualId = `estado-actual-${rol.idRol}`;
    const isChecked = rol.estado;

    let fileTable = `
        <tr>
          <td hidden>${rol.idRol}</td>
          <td>${rol.nombreRol}</td>
         
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" ${isChecked ? 'checked' : ''} id="${switchId}" onchange="actualizarEstado(${rol.idRol})"> <span id="${estadoActualId}">${isChecked ? 'Activo' : 'Inactivo'}</span>
            </div>
          </td> 
          <td style="text-align: center;">
            <button type="button" class="btn btn" id="libedit" data-bs-toggle="modal" data-bs-target="#modalactualizar" onclick="obtenerRol(${rol.idRol})">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="btn btn" id="libdelete" onclick="eliminarRol(${rol.idRol})">
                <i class="fa-solid fa-trash"></i>
              </button>
          </td>
        </tr>
    `;

    table.row.add($(fileTable)).draw();
  });
  setTimeout(()=>{
    closeLoad()
  },1000)
};
