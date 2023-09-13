function limpiarModales() {
  const BuscarDocumento = document.getElementById('BuscarDocumento');
  BuscarDocumento.value = ''; // Limpia el campo de búsqueda

  inputHTML = ''; // Limpia los datos del beneficiario
  renderBeneficiariosResult([]); // Borra los datos del render de beneficiarios
  renderBenefechasResult([]); // Borra los datos del render de fechas
  idBeneficiario = null; // Resetea la variable idBeneficiario
  limpiarLibrosSeleccionados(); // Borra los libros seleccionados


  // Borrar información de las variables globales
  beneficiarios=0;
  librosSeleccionados.length = 0;
  idBeneficiario = null;
  plazo = null;
  cantidadl = null;
  cantidadp = null;
  sinBeneficiario = false;
}



function limpiarModalLibros() {
  // Borrar información de la modal de libros
  const buscarLibro = document.getElementById('buscarLibro');
  buscarLibro.value = ''; // Limpiar el campo de búsqueda de libros
  renderLibrosResult([]); // Borrar resultados de búsqueda de libros
}

