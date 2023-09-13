//LISTAR EN LA VISTA DE BENEFICIARIOS

const listarBeneficiarios = () => {
  let url = 'http://localhost:8282/api/usuarios/bene';

  fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Ocurrió un problema al obtener los beneficiarios:', error);
      // Manejo del error, por ejemplo, mostrar una alerta
    })
    .then(data => {
      const info = data.infoBeneficiarios;
      renderBeneficiariosResult(info);
      console.log(info);
    });
};



function renderBeneficiariosResult (info)  {
  const table = $('#table_beneficiarios').DataTable();
  table.clear().draw();



    info.forEach(bene => {
      if (bene.nombreRol === 'profesor' || bene.nombreRol === 'estudiante') {
       let tableBeneficiariosHTML = `
          <tr>
            <td>${bene.nombreRol}</td>
            <td>${bene.nombres}</td>
            <td>${bene.apellidos}</td>
            <td>${bene.grado}</td>
            <td>${bene.grupo}</td>
          </tr>
        `;
        table.row.add($(tableBeneficiariosHTML)).draw();
      }
    
    });
  }

  