<?php include_once '../partials/head.php' ?>
<?php include_once '../partials/sidebar.php' ?>

<?php
$token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;

$documentoDelUsuario = null; // Obtén el documento del usuario desde el token

$permisos = [];

if ($token) {
    $tokenParts = explode('.', $token);
    if (count($tokenParts) === 3) {
        $decodedToken = json_decode(base64_decode($tokenParts[1]), true);
        $permisos = $decodedToken['permisos'];
        $documentoDelUsuario = $decodedToken['documento']; // Reemplaza 'documento' con la clave correcta en el token
    }
}

if (!tienePermiso('Préstamos', $permisos)) {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/404.php";</script>';
    exit;
}
?>

<!-- Agrega un elemento HTML con el valor del documento -->
<span id="documentoDelUsuario" style="display: none;"><?php echo $documentoDelUsuario; ?></span>

<!-- INICIO CONTENIDO DE LA PÁGINA -->
<div class="content-wrapper" id="contenido">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <h1 class="text-center d-flex justify-content-start"><i class="fas fa-handshake iconsTitle"></i>Préstamos</h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="container-fluid d-flex justify-content-end">
                                <?php if (in_array('Dashboard', $permisos) || in_array('Roles', $permisos) || in_array('Usuarios', $permisos)) : ?>
                                    <button type="button" class="btn btn-library" data-bs-toggle="modal" data-bs-target="#modalAddPrestamo"><i class="fa-solid fa-plus"></i> Agregar
                                    </button>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- INICIO SECCIÓN DE LA PÁGINA -->

    <!-- CONTENIDO CUERPO -->
    <section class="content">
        <div class="container-fluid card p-3">

            <!-- Tabla de préstamos -->
            <div class="container-fluid">
                <table id="table_prestamos" class="table table-striped dt-responsive nowrap" style="width:100%">
                    <thead class="table">
                        <tr>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Compromiso</th>
                            <th>Estado</th>
                            <th style="text-align: center;">Acciones</th>
                        </tr>
                    </thead>
                    <!-- CUERPO TABLA -->
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <!-- FIN CONTENIDO CUERPO -->
</div>
<!-- MODAL CREAR PRÉSTAMO -->
<div class="modal fade" id="modalAddPrestamo" data-bs-backdrop="static">
    <!-- CONTENIDO DEL MODAL -->
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- CONTENIDO HEADER DEL MODAL -->
            <div class="modal-header">
                <h5 class="modal-title">AGREGAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarRegistro" onclick="limpiarModales(event)"></button>
            </div>
            <!-- FIN CONTENIDO HEADER DEL MODAL -->
            <!-- SUB CONTENIDO MODAL -->
            <div class="modal-body">
                <!-- INICIO FORMULARIO -->
                <form class="row g-3" id="formularioC">
                    <div class="col-md-6 mb-2 formulario__grupo" id="grupo__documento">
                        <label for="documento" class="formulario__label">Documento</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control ml-1" name="BuscarDocumento" id="BuscarDocumento" autocomplete="off" onkeypress="return solonumeros(event)">

                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                            <button type="button" class="btn btn-library" id="library" onclick="buscarBeneficiarios(event)"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                    <!-- CONTENIDO REGISTRO -->
                    <div class="row " id="CampoRegistro">
                    </div>
                    <!-- FIN CONTENIDO REGISTRO -->
                    <br>
                    <div class="row " id="CampoFechas">
                    </div>
                    <!-- HR -->
                    <hr class="mt-4">
                    <!-- BOTÓN MODAL AGREGAR LIBROS -->
                    <div class="container-fluid text-end">
                        <button type="button" class="btn btn-library" data-bs-toggle="modal" data-bs-target="#modalAddLibro">
                            <i class="fa-solid fa-plus"></i> Ejemplares
                        </button>
                    </div>
                    <!-- CONTENIDO CUERPO -->
                    <section class="content">
                        <!-- SUB CONTENIDO CUERPO -->
                        <div class="container-fluid">
                            <!-- Tabla de libros -->
                            <div class="container-fluid card p-3">
                                <table id="tablaLibrosArray" class="table table-striped nowrap dt-responsive" style="width:100%">
                                    <thead class="table table-secondary">
                                        <tr>
                                            <th style="text-align: center;">ISBN</th>
                                            <th style="text-align: center;">Titulo</th>
                                            <th style="text-align: center;">Ejemplar</th>
                                            <th style="text-align: center;">Acciones</th>
                                        </tr>
                                    </thead>
                                    <!-- CUERPO TABLA -->
                                    <tbody>
                                    </tbody>
                                    <!-- FIN CUERPO TABLA -->
                                </table>
                            </div>
                            <!-- FIN TABLA -->
                        </div>
                        <!-- FIN SUB CONTENIDO CUERPO -->
                    </section>
                    <!-- FIN CONTENIDO CUERPO -->
                </form>
                <!-- FINAL FORMULARIO -->
            </div>
            <!-- FINAL SUB CONTENIDO MODAL -->
            <!-- CONTENIDO FOOTER MODAL -->
            <div class="modal-footer">
                <button type="button" id="actualizar" onclick="agregarPrestamo(event)" class="btn btn formulario__btn">Agregar</button>
            </div>
            <!-- FINAL CONTENIDO FOOTER MODAL -->
        </div>
    </div>
    <!-- FINAL CONTENIDO DEL MODAL -->
</div>
<!-- FINAL MODAL CREAR PRÉSTAMO -->

<!-- MODAL AÑADIR LIBRO -->
<div class="modal fade" id="modalAddLibro" data-bs-backdrop="static">
    <!-- CONTENIDO DEL MODAL -->
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- CONTENIDO HEADER DEL MODAL -->
            <div class="modal-header">
                <h5 class="modal-title">AÑADIR EJEMPLAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarRegistro" onclick="limpiarModalLibros(event)" data-bs-toggle="modal" data-bs-target="#modalAddPrestamo"></button>
            </div>
            <!-- FIN CONTENIDO HEADER DEL MODAL -->
            <!-- SUB CONTENIDO MODAL -->
            <div class="modal-body">
                <!-- BUSCAR -->
                <div class="container-fluid">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2 " type="text" id="buscarLibro" name="buscarLibro">
                        <button type="submit" class="mt-0 btn btn-library mb-3" id="library" onclick="buscarLibros(event)"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <!-- INICIO FORMULARIO -->
                <form class="row g-3" action="/prestamos" id="formularioL">

                    <!-- CONTENIDO CUERPO -->
                    <section class="content">
                        <!-- SUB CONTENIDO CUERPO -->
                        <div class="container-fluid">
                            <!-- Tabla de libro agregar -->
                            <div class="container-fluid card p-3">
                                <table id="tablaLibrosBuscar" class="table table-striped nowrap dt-responsive" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">ISBN</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Ejemplar</th>
                                            <th style="text-align: center;">Accciones</th>
                                        </tr>
                                    </thead>
                                    <!-- CUERPO TABLA -->
                                    <tbody>
                                    </tbody>
                                    <!-- FIN CUERPO TABLA -->
                                </table>
                            </div>
                            <!-- FIN TABLA -->
                        </div>
                        <!-- FIN SUB CONTENIDO CUERPO -->
                    </section>
                    <!-- FIN CONTENIDO CUERPO -->
                </form>
                <!-- FINAL FORMULARIO -->
            </div>
            <!-- FINAL SUB CONTENIDO MODAL -->
            <!-- CONTENIDO FOOTER MODAL -->
            <div>
            </div>
            <!-- FINAL CONTENIDO FOOTER MODAL -->
        </div>
    </div>
    <!-- FINAL CONTENIDO DEL MODAL -->
</div>
<!-- FINAL MODAL AÑADIR LIBRO -->

<!-- MODAL DEVOLUCIÓN PRÉSTAMO -->
<div class="modal fade" id="modalUpdatePrestamo" data-bs-backdrop="static">
    <!-- CONTENIDO DEL MODAL -->
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- CONTENIDO HEADER DEL MODAL -->
            <div class="modal-header">
                <h5 class="modal-title">DEVOLUCIÓN</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarRegistro"></button>
            </div>
            <!-- FINAL CONTENIDO HEADER MODAL -->
            <!-- SUB CONTENIDO MODAL -->
            <div class="modal-body">
                <!-- INICIO FORMULARIO -->
                <form class="row g-3" action="" id="formularioE">
                    <!-- Nombre -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Nombres</label>
                        <input class="form-control" type="text" id="NombreU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Apellidos -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Apellidos</label>
                        <input class="form-control" type="text" id="apellidosU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Documento -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Documento</label>
                        <input class="form-control" type="text" id="DocumentoU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Rol -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Rol</label>
                        <input class="form-control" type="text" id="RolU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Fecha Inicio -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Fecha Inicio</label>
                        <input class="form-control" type="text" id="FechaInicioU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Fecha Compromiso -->
                    <div class="col-md-4 ">
                        <label class="formulario__label">Fecha Compromiso</label>
                        <input class="form-control" type="text" id="FechaCompromisoU" aria-label="readonly input example" readonly>
                    </div>
                    <!-- Grupo: HR -->
                    <hr class="mt-4">

                    <!-- CONTENIDO CUERPO -->
                    <section class="content">
                        <!-- SUB CONTENIDO CUERPO -->
                        <div class="container-fluid">
                            <!-- INICIO TABLA -->
                            <div class="container-fluid card p-3">
                                <table id="tablaLibrosPrestamoU" class="table table-striped nowrap dt-responsive" style="width:100%">
                                    <!-- ENCABEZADO TABLA -->
                                    <thead>
                                        <tr>
                                            <th scope="col">ISBN</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Ejemplar</th>
                                            <th style="text-align: center;">Estado libro</th>
                                            <th style="text-align: center;">Confirmación</th>
                                        </tr>
                                    </thead>
                                    <!-- FIN ENCABEZADO TABLA -->
                                    <!-- CUERPO TABLA -->
                                    <tbody>
                                    </tbody>
                                    <!-- FIN CUERPO TABLA -->
                                </table>
                            </div>
                            <!-- FIN TABLA -->
                        </div>
                        <!-- FIN SUB CONTENIDO CUERPO -->
                    </section>
                    <!-- FIN CONTENIDO CUERPO -->
                </form>
                <!-- FINAL FORMULARIO -->
            </div>
            <!-- SUB FINAL CONTENIDO MODAL -->
            <!-- CONTENIDO FOOTER MODAL -->
            <div class="modal-footer">
                <button type="button" id="actualizar" class="btn btn formulario__btn" onclick="actualizarPrestamo()">Devolución</button>
            </div>
            <!-- FINAL CONTENIDO FOOTER MODAL-->
        </div>
    </div>
    <!-- FINAL CONTENIDO DEL MODAL -->
</div>
<!-- FINAL MODAL EDITAR PRÉSTAMO -->

<!-- MODAL VER DETALLES -->
<?php include_once '../partials/viewLoan.php' ?>

<!-- TABLA LISTAR PRÉSTAMO -->
<script>
    $(document).ready(() => {
        ListarPrestamos()

        $('#table_prestamos').dataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtp',
            responsive: true,
            pageLength: 8,
            LengthChange: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<!-- TABLA MODAL AÑADIR LIBRO -->
<script>
    $(document).ready(() => {

        $('#tablaLibrosBuscar').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Brtp',
            responsive: true,
            pageLength: 8,
            LengthChange: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<!-- TABLA MODAL REGISTRAR PRÉSTAMO -->
<script>
    $(document).ready(() => {

        $('#tablaLibrosArray').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Brtp',
            responsive: true,
            pageLength: 5,
            LengthChange: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<!-- TABLA MODAL DEVOLUCIÓN PRÉSTAMO -->
<script>
    $(document).ready(() => {

        $('#tablaLibrosPrestamoU').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtp',
            responsive: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<!-- TABLA MODAL VER DETALLES -->
<script>
    $(document).ready(() => {

        $('#tablaLibrosPrestamo').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtp',
            responsive: true,
            pageLength: 5,
            LengthChange: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<script>
    const permisos = <?php echo json_encode($permisos); ?>;
</script>
<!-- PRINCIPIO SCRIPTS MÓDULO -->
<script src="../../assets/js/validarPrestamo.js"></script>
<script src="../../SRC/prestamos/add.js"></script>
<script src="../../SRC/prestamos/list.js"></script>
<script src="../../SRC/prestamos/view.js"></script>
<script src="../../SRC/prestamos/update.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- FINAL SCRIPTS MÓDULO -->
<!-- PIE DE PÁGINA -->
<?php
include_once '../partials/footer.php' ?>