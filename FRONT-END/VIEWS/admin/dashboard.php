<?php include_once '../partials/head.php' ?>
<?php include_once '../partials/sidebar.php' ?>

<?php
if (!tienePermiso('Dashboard', $permisos)) {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/404.php";</script>';
    exit;
}
?>
<!--CONTENIDO DE LA PAGINA-->
<div class="content-wrapper" id="contenido">

    <!-- CONTENIDO CABEZA -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-12">

                    <!-- ENCABEZADO CONTENIDO -->
                    <div>
                    <div>
                        <h1 class="text-center">DASHBOARD <i class="fa-solid fa-chart-line"></i></h1>
                        <hr>
                    </div>
                    <?php if (isset($decodedToken['nombres']) && isset($decodedToken['apellidos'])) : ?>
                            <?php
                            // Obtener el primer nombre y el primer apellido
                            $nombresArray = explode(' ', $decodedToken['nombres']);
                            $apellidosArray = explode(' ', $decodedToken['apellidos']);
                            $primerNombre = $nombresArray[0];
                            $primerApellido = $apellidosArray[0];
                            ?>
                        <?php endif; ?>
                        <h1>¡Saludos  <?php echo $primerNombre . ' ' . $primerApellido; ?>!</h1>
                        <p>¡Es un placer tenerte de nuevo aquí! Disfruta de los servicios de LibrarySoft.</p>
                    </div>
                    <!-- FIN ENCABEZADO CONTENIDO -->

                </div>
            </div>
        </div>
    </div>
    <!-- FIN CONTENIDO CABEZA -->

    <!-- CONTENIDO CUERPO -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">

                <!-- INCIO ESTADISTICAS -->
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-chart-bar me-1"></i>
                            Préstamos
                        </div>
                        <div class="card-body">
                            <canvas id="myBarChart1" width="100%" height="50"></canvas>
                        </div>
                        <div class="card-footer small text-muted">
                            <div class="d-flex justify-content-between">
                                <select id="yearSelector" class="form-control col-md-2"></select>
                                <button id="generateExcelButton" class="btn btn" type="button"><i class="fa-solid fa-download"></i></button>
                            </div>
                        </div>
                    </div>

                </div>


                 <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-chart-bar me-1"></i>
                            Reservas
                        </div>
                        <div class="card-body">
                            <canvas id="myBarChart2" width="100%" height="50"></canvas>
                        </div>
                        <div class="card-footer small text-muted">
                            <div class="d-flex justify-content-between">
                                <select id="yearSelectorReservas" class="form-control col-md-2"></select>
                                <button id="generateExcelButtonR" class="btn btn" type="button"><i class="fa-solid fa-download"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
         
                <!-- FIN ESTADISTICAS -->

            </div>
        </div>
    </section>
    <!-- FIN CONTENIDO CUERPO -->

</div>
<!-- FIN CONTENIDO DE LA PAGINA -->


<!--PIE DE PAGINA-->
<footer class="main-footer text-center">
<div class="footer-top">
        <strong> Juan Galaraga, Jhorman Bustamante, Andrud Acosta, Cristian Jaramillo</strong>
    </div>
        <div class="footer-bottom">
        <strong>&copy; 2023 <a>LibrarySoft</a>.</strong>
    </div>

    <!-- AQUI SCRIPT -->
    <script src="../../assets/js/scripts.js"></script>
    <script src="../../SRC/dashboard/prestamosFet.js"></script>
    <script src="../../SRC/dashboard/reservas.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="../../assets/demo/chart-bar-demo.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Scripts Sidebar-->
    <script src="../../SRC/login/login.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../assets/plugins/jquery/jquery.min.js"></script>
    <script src="../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <script src="../../assets/dist/js/adminlte.js"></script>
    <script src="../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

    <!--Scripts Iconos -->
    <script src="https://kit.fontawesome.com/f669cfd668.js" crossorigin="anonymous"></script>
</footer>


</body>

</html>