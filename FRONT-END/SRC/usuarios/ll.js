//LISTAR EN LA VISTA DE USUARIOS DEL FRONT-END
const listarUsuariosE = () => {
  load();
  let url = 'http://localhost:8282/api/usuarios/todos';

  fetch(url)
      .then(response => response.json())
      .catch(error => {
          console.error('Ocurrió un problema al obtener los Usuarios:', error);
      })
      .then(data => {
          const beneficiarios = data.beneficiarios;

          // Filtrar beneficiarios por el rol "profesor"
          const estudiantes = beneficiarios.filter(beneficiario => beneficiario.nombreRol === 'Estudiante');
          
          // renderUsuariosResult(profesores);
          renderUsuariosStudentResult(estudiantes);
      });
};



function renderUsuariosStudentResult(beneficiarios) {
  const table = $('#tablaEstudiante').DataTable();
  table.clear().draw();

  beneficiarios.forEach((beneficiario) => {
      const switchId = `estado-switch-${beneficiario.idBeneficiario}`;
      const estadoActualId = `estado-actual-${beneficiario.idBeneficiario}`;
      const isChecked = beneficiario.estado;

      let tableTeacher = `
      <tr>
      <td>${beneficiario.nombreRol}</td>  
      <td>${beneficiario.documento}</td>
      <td>${beneficiario.correo}</td>
      <td>${beneficiario.nombres}</td>
      <td>${beneficiario.apellidos}</td>
      <td>${beneficiario.grado}</td>
      <td>${beneficiario.grupo}</td>
      <td>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" ${isChecked ? 'checked' : ''} id="${switchId}" onchange="validarEstado(${beneficiario.idBeneficiario})">
          <span id="${estadoActualId}">${isChecked ? 'Activo' : 'Inactivo'}</span> 
        </div>
      </td>   
      <td style="text-align: center;">
        <button type="button" class="btn btn-z" data-bs-toggle="modal" data-bs-target="#modalUpdateStudent" onclick="obtenerBeneficiario(${beneficiario.idBeneficiario})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
      `;
      table.row.add($(tableTeacher)).draw();

      
  });

  setTimeout(() => {
      closeLoad()
  }, 1000)

  
}







