<?php include_once '../partials/head.php' ?>

<?php include_once '../partials/sidebar.php' ?>
<?php
if (!tienePermiso('Usuarios', $permisos)) {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/404.php";</script>';
    exit;
}
?>


<!--CONTENIDO DE LA PAGINA-->
<div class="content-wrapper" id="contenido">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <h1 class="text-center d-flex justify-content-start titlePages"><i class="fa-solid fa-user iconsTitle"></i>
                                Usuarios </h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
                                <div class="container-fluid d-flex justify-content-end mb-4">
                                    <button type="button" class="btn btn-library" data-bs-toggle="modal" data-bs-target="#modalAddUsers">
                                        <i class="fa-solid fa-plus"></i> Agregar</button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="content ">
        <div class="container-fluid card p-3">

            <!-- CONTENIDO Y TABLAS -->




            <div class="tab-content">

                <table id="tablaAdministrador" class="table table-striped nowrap dt-responsive" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Rol</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>

                            <th>Estado</th>
                            <th style="text-align: center;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>


        </div>



</div>

</div>



<!-- Modal Actualizar Usuario-->
<div class="modal fade" id="modalUpdateUsers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">EDITAR </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrar"></button>
            </div>
            <div class="modal-body">
                <form class="row g-3 formularior" action="usuarios.html" id="formulari">

                    <!-- Grupo: id -->

                    <input type="hidden" class="formulario__input" name="idBeneficiario" id="idBeneficiario">




                    <!-- Grupo: Rol -->
                    <div class="col-md-6 formulario__grupo" id="grupo__rol">
                        <label for="nombreRol" class="formulario__label">Rol</label>
                        <div class="formulario__grupo-input">
                            <select class="form-control form-select" id="nombrerol" name="nombreRol">

                            </select>
                        </div>
                    </div>

                    <!-- Grupo: Documento -->
                    <div class="col-md-6 formulario__grupo" id="grupo__documento">
                        <label for="documento" class="formulario__label">Documento</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="documento" id="documento" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Nombres -->
                    <div class="col-md-6 formulario__grupo" id="grupo__nombres">
                        <label for="nombres" class="formulario__label">Nombres</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="nombres" id="nombres" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Apellidos-->
                    <div class="col-md-6 formulario__grupo" id="grupo__apellidos">
                        <label for="apellidos" class="formulario__label">Apellidos</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="apellidos" id="apellidos" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>
                    <!-- Grupo: Correo Electrónico -->
                    <div class="col-md-6 formulario__grupo" id="grupo__correo">
                        <label for="correo" class="formulario__label">Correo Electrónico</label>
                        <div class="input-group has-validation">
                            <input type="email" class="form-control" autocomplete="off" name="correo" id="correo">
                            <div class="invalid-feedback">
                                Por favor, ingrese un correo electrónico válido.
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" id="actualiza" class="btn btn-library">Editar</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

</section>
</div>



<!-- Modal Registrar Usuario -->
<div class="modal fade" id="modalAddUsers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">AGREGAR </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarRegistro"></button>
            </div>
            <div class="modal-body">
                <form class="row g-3 formulario" method="POST" action="usuarios.php" id="formulario">

                    <!-- Grupo: Rol -->
                    <div class="col-md-6 formulario__grupo" id="grupo__rol">
                        <label for="nombreRol" class="formulario__label">Rol</label>
                        <div class="formulario__grupo-input">
                            <select class="form-control form-select" id="nombreRol" name="nombreRol">

                            </select>

                        </div>
                    </div>

                    <!-- Grupo: Documento -->
                    <div class="col-md-6 formulario__grupo" id="grupo__documento">
                        <label for="document" class="formulario__label">Documento</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="document" id="document" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Nombres -->
                    <div class="col-md-6 formulario__grupo" id="grupo__nombres">
                        <label for="nombre" class="formulario__label">Nombres</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="nombre" id="nombre" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Apellidos-->
                    <div class="col-md-6 formulario__grupo" id="grupo__apellidos">
                        <label for="apellido" class="formulario__label">Apellidos</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" autocomplete="off" name="apellido" id="apellido" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Correo Electrónico -->
                    <div class="col-md-6 formulario__grupo" id="grupo__correo">
                        <label for="correos" class="formulario__label">Correo Electrónico</label>
                        <div class="input-group has-validation">
                            <input type="email" class="form-control" autocomplete="off" name="correos" id="correos">
                            <div class="invalid-feedback">
                                Por favor, ingrese un correo electrónico válido.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Grado -->
                    <div class="col-md-6 formulario__grupo" id="grupo__grado">
                        <label for="grados" class="formulario__label">Grado</label>
                        <div class="input-group has-validation">
                            <input type="number" class="form-control" autocomplete="off" name="grados" id="grados" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Grupo -->
                    <div class="col-md-6 formulario__grupo" id="grupo__grupo">
                        <label for="grupos" class="formulario__label">Grupo</label>
                        <div class="input-group has-validation">
                            <input type="number" class="form-control" autocomplete="off" name="grupos" id="grupos" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" id="agregar" class="btn btn-library">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(() => {
        listarUsuarios();

        $('#tablaAdministrador').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtp',
            responsive: true, // Enable responsive behavior
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    });
</script>

<script src="../../SRC/usuarios/list.js"></script>
<script src="../../assets/js/validarUser.js"></script>
<script src="../../assets/js/validarUser_Add.js"></script>
<script src="../../assets/js/validacionCampos.js"></script>
<script src="../../SRC/usuarios/add.js"></script>
<script src="../../SRC/usuarios/updateAdmin.js"></script>
<script src="../../SRC/usuarios/update2.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!--PIE DE PAGINA-->


<?php
include_once '../partials/footer.php' ?>