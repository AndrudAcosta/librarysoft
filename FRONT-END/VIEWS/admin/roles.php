<!-- INCLUDE DE HEAD Y SIDEBAR -->
<?php include_once '../partials/head.php'; ?>
<?php include_once '../partials/sidebar.php'; ?>

<?php
if (!tienePermiso('Roles', $permisos)) {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/404.php";</script>';
    exit;
}
?>

<!-- INICIO CONTENIDO DE LA PÁGINA -->
<div class="content-wrapper" id="contenido">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <h1 class="text-center d-flex justify-content-start"><i
                                    class="fa-solid fa-gear iconsTitle"></i> Roles</h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="container-fluid d-flex justify-content-end">
                                <button type="button" class="btn btn-library" data-bs-toggle="modal"
                                    data-bs-target="#modalcrear"><i class="fa-solid fa-plus"></i> Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- INICIO SECCIÓN DE LA PÁGINA -->
    <section class="content">
        <div class="container-fluid card p-3">

            <!-- INICIO TABLA ROLES -->
            <table id="table_roles" class="table table-striped dt-responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col" hidden>ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estado</th>
                        <th style="text-align: center;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <!-- INICIO MODAL ACTUALIZAR ROLES -->
        <div class="modal fade" id="modalactualizar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">EDITAR</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            id="cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 formulario" id="formulario">
                            <input type="hidden" class="formulario__input" name="idrolU" id="idrolU">
                            <div class="col-md-12 formulario__grupo" id="grupo__nombres">
                                <label for="nombrerolU" class="formulario__label">Nombre</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="nombrerolU"
                                        id="nombrerolU" onkeypress="return sololetras(event)">
                                    <div class="invalid-feedback">
                                        Por favor, ingrese solo letras en este campo.
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 formulario__grupo">
                                <div id="modulosU"></div>
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="plazoU" class="formulario__label">Plazo Préstamo</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="plazoU" id="plazoU"
                                        onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="librosU" class="formulario__label">Cantidad Libros</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="librosU"
                                        id="librosU" onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="prestamosU" class="formulario__label">Cantidad Préstamos</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="prestamosU"
                                        id="prestamosU" onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="actualizar"
                            class="btn btn-library formulario__btn">Editar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- INICIO MODAL CREAR ROLES -->
        <div class="modal fade" id="modalcrear" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">AGREGAR</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            id="cerrarRegistro"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 formulario" method="POST" id="formulario">
                            <div class="col-md-12 formulario__grupo" id="grupo__nombres">
                                <label for="nombres" class="formulario__label">Nombre</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="nombreRol"
                                        id="nombreRol" onkeypress="return sololetras(event)">
                                    <div class="invalid-feedback">
                                        Por favor, ingrese solo letras en este campo.
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12" id="modulo">
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="plazo" class="formulario__label">Plazo Préstamo</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="plazo" id="plazo"
                                        onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="libros" class="formulario__label">Cantidad Libros</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="libros" id="libros"
                                        onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                            <div class="col-md-4 formulario__grupo" id="grupo__documento">
                                <label for="prestamos" class="formulario__label">Cantidad Préstamos</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" name="prestamos"
                                        id="prestamos" onkeypress="return solonumeros(event)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="agregar" class="btn btn-library formulario__btn">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- FIN CONTENIDO DE LA PÁGINA -->

<!-- SCRIPTS -->
<script>
$(document).ready(() => {
    listarRoles();
    $('#table_roles').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

});
</script>
<script src="../../assets/js/general.js"></script>
<script src="../../assets/js/validarRol.js"></script>
<script src="../../SRC/roles/add.js"></script>
<script src="../../SRC/roles/list.js"></script>
<script src="../../SRC/roles/update.js"></script>
<script src="../../SRC/roles/delete.js"></script>

<!-- INCLUDE DE FOOTER -->
<?php include_once '../partials/footer.php'; ?>