<!-- INCLUDE DE HEAD Y SIDEBAR -->
<?php include_once '../partials/head.php'; ?>
<?php include_once '../partials/sidebar.php'; ?>

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

if (!tienePermiso('Sanciones', $permisos)) {
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
                            <h1 class="text-center d-flex justify-content-start"><i
                                    class="fa-solid fa-user-slash iconsTitle"></i>Sanciones</h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="container-fluid d-flex justify-content-end">
                                <?php if (in_array('Dashboard', $permisos) || in_array('Roles', $permisos) || in_array('Usuarios', $permisos)): ?>
                                <button type="button" class="btn btn-library" data-bs-toggle="modal"
                                    data-bs-target="#agregarSanciones"><i class="fa-solid fa-plus"></i> Agregar</button>
                                <?php endif; ?>
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
            <!-- INICIO TABLA SANCIONES -->
            <table id="table_sanciones" class="table table-striped dt-responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col" hidden>ID</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Beneficiario</th> <!-- Corregido: Beneficiario con tilde en la "i" -->
                        <th scope="col">Motivo Sanción</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Cierre</th>
                        <th scope="col">Estado</th>
                        <th style="text-align: center;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <!-- INICIO MODAL ACTUALIZAR SANCIONES -->
        <div class="modal fade" id="EditSan" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">EDITAR</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            id="cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 formulario" method="POST" id="formulario">
                            <input type="hidden" class="formulario__input" id="idSancion">
                            <div class="col-md-6 formulario__grupo" id="grupo__nombres">
                                <label for="nombresU" class="formulario__label">Nombres</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" disabled id="nombresU">
                                </div>
                            </div>
                            <div class="col-md-6 formulario__grupo" id="grupo__apellidos">
                                <label for="apellidosU" class="formulario__label">Apellidos</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" disabled id="apellidosU">
                                </div>
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__sancion">
                                <label for="sancionU" class="formulario__label">Motivo</label>
                                <div class="formulario__grupo-input">
                                    <select class="form-control form-select" id="sancionU" name="sancionU"></select>
                                </div>
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__estado">
                                <label for="estadoU" class="formulario__label">Estado</label>
                                <div class="formulario__grupo-input">
                                    <select class="form-control form-select" id="estadoU" name="estadoU"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="inicioU" class="formulario__label">Fecha Inicio</label>
                                <input class="form-control" type="text" aria-label="readonly input example" readonly
                                    id="inicioU">
                            </div>
                            <div class="col-md-3">
                                <label for="finalU" class="formulario__label">Fecha Final</label>
                                <input class="form-control" type="text" aria-label="readonly input example" readonly
                                    id="finalU">
                            </div>
                            <div class="col-12">
                                <label for="observacionU" class="formulario__label">Observación</label>
                                <textarea class="form-control" id="observacionU" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="actualizar" class="btn btn-library formulario__btn">Editar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- INICIO MODAL CREAR SANCIONES -->
        <div class="modal fade" id="agregarSanciones" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">AGREGAR</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            id="cerrarRegistro"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 formulario" method="POST" id="formulario">
                            <div class="col-md-6 formulario__grupo" id="grupo__documento">
                                <label for="documentoR" class="formulario__label">Documento</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" name="documentoR" id="documentoR"
                                        autocomplete="off" onkeypress="return solonumeros(event)">
                                    <div class="invalid-feedback">
                                        Por favor, ingrese solo números en este campo.
                                    </div>
                                    <button type="button" class="btn btn-library" id="library"
                                        onclick="buscarBeneficiarios(event)"><i
                                            class="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>

                            <div class="d-flex col-md-12" id="datosbeneficiario">
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__rol">
                                <label for="sancion" class="formulario__label">Motivo</label>
                                <div class="formulario__grupo-input">
                                    <select class="form-control form-select" id="sancionR" name="sancionR">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__rol">
                                <label for="estado" class="formulario__label">Estado</label>
                                <div class="formulario__grupo-input">
                                    <select class="form-control form-select" id="estadoR" name="estadoR">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3" id="CampoFechas">
                            </div>
                            <div class="col-md-3 ">
                                <label class="formulario__label">Fecha Final</label>
                                <input class="form-control" type="date" aria-label="readonly input example" id="finalR">
                            </div>
                            <div>
                                <label for="exampleFormControlTextarea1" class="form-label">Observación</label>
                                <textarea class="form-control" id="observacionR" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="agregar" class="btn btn-library formulario__btn">Agregar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- INICIO MODAL VISUALIZAR SANCIONES -->
        <div class="modal fade" id="VerSan" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">VISUALIZAR</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 formulario" method="POST" id="formulari">
                            <div class="col-md-6 formulario__grupo" id="grupo__nombres">
                                <label for="nombres" class="formulario__label">Nombres</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" id="nombresV" disabled>
                                </div>
                            </div>
                            <div class="col-md-6 formulario__grupo" id="grupo__nombres">
                                <label for="nombres" class="formulario__label">Apellidos</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" autocomplete="off" id="apellidosV" disabled>
                                </div>
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__rol">
                                <label for="sancion" class="formulario__label">Motivo</label>
                                <div class="formulario__grupo-input">
                                    <input class="form-control" id="sancionV" name="sancionV" disabled>
                                </div>
                            </div>
                            <div class="col-md-3 formulario__grupo" id="grupo__rol">
                                <label for="estado" class="formulario__label">Estado</label>
                                <div class="formulario__grupo-input">
                                    <input class="form-control" id="estadoV" name="estadoV" disabled>
                                </div>
                            </div>
                            <div class="col-md-3 ">
                                <label class="formulario__label">Fecha Inicio</label>
                                <input class="form-control" type="text" aria-label="readonly input example" readonly
                                    id="inicioV">
                            </div>
                            <div class="col-md-3 ">
                                <label class="formulario__label">Fecha Final</label>
                                <input class="form-control" type="text" aria-label="readonly input example" readonly
                                    id="finalV">
                            </div>
                            <div>
                                <label for="exampleFormControlTextarea1" class="form-label">Observación</label>
                                <textarea class="form-control" type="text" rows="3" id="observacionV"
                                    disabled></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
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
    listarSanciones();
    $('#table_sanciones').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
})
</script>
<script>
const permisos = <?php echo json_encode($permisos); ?>;
</script>
<script src="../../assets/js/validacionCampos.js"></script>
<script src="../../assets/js/ValidarSanciones.js"></script>
<script src="../../SRC/sanciones/add.js"></script>
<script src="../../SRC/sanciones/list.js"></script>
<script src="../../SRC/sanciones/update.js"></script>
<script src="../../SRC/sanciones/view.js"></script>

<!-- INCLUDE DE FOOTER -->
<?php include_once '../partials/footer.php'; ?>