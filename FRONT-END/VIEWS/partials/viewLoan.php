<!-- MODAL VER DETALLES PRESTAMO -->
<div class="modal fade" id="modalViewPrestamo" data-bs-backdrop="static">
    <!-- CONTENIDO DEL MODAL -->
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- CONTENIDO HEADER DEL MODAL -->
            <div class="modal-header">
                <h5 class="modal-title">VISUALIZAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarRegistro"></button>
            </div>
            <!-- FINAL CONTENIDO HEADER MODAL -->
            <!-- SUB CONTENIDO MODAL -->
            <div class="modal-body">
                <!-- INCIO FURMULARIO -->
                <form class="row g-3">
                    <!--  Nombre -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Nombres</label>
                        <input class="form-control" type="text" id="NombreV" aria-label="readonly input example" readonly>
                    </div>
                    <!--  apellidos -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Apellidos</label>
                        <input class="form-control" type="text" id="apellidosV" aria-label="readonly input example" readonly>
                    </div>
                    <!--  DOCUMNENTO -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Documento</label>
                        <input class="form-control" type="text" id="DocumentoV" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Rol -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Rol</label>
                        <input class="form-control" type="text" id="RolV" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Fecha Inicio -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Fecha Inicio</label>
                        <input class="form-control" type="text" id="FechaInicioV" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Fecha Compromiso -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Fecha Compromiso</label>
                        <input class="form-control" type="text" id="FechaCompromisoV" aria-label="readonly input example" readonly>
                    </div>
                    <!-- INPUT DISABLED ESTADO -->
                    <div class="col-md-3 ">
                        <label class="formulario__label">Estado del prestamo</label>
                        <input class="form-control" type="text" id="EstadoV" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Grupo: HR -->
                    <hr class="mt-4">
                    <!-- CONTENIDO CUERPO -->
                    <section class="content">
                        <!-- SUB CONTENIDO CUERPO -->
                        <div class="container-fluid">
                            <!-- INICIO TABLA -->
                            <div class="container-fluid card p-3">
                            <table id="tablaLibrosPrestamo" class="table table-striped nowrap dt-responsive" style="width:100%">
                                <!-- ENCABEZADO TABLA -->
                                <thead >
                                    <tr>
                                        <th scope="col">ISBN</th>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Ejemplar</th>
                                        <th scope="col">Fecha Devolución</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <!-- FIN ENCABEZADO TABLA -->
                                <!-- CUERPO TABLA -->
                                <tbody >
                                </tbody>
                                <!-- FIN CUERPO TABLA -->
                            </table>
                            </div>
                            <!-- FIN TABLA -->
                        </div>
                        <!-- FIN SUB CONTENIDO CUERPO -->
                </form>
            </div>
        </div>
    </div>
    <!-- FINAL CONTENIDO DEL MODAL -->
</div>
<!-- FINAL MODAL VISUALIZAR PRESTAMO -->