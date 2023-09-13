<?php include_once '../partials/head.php' ?>

<?php include_once '../partials/sidebar.php' ?>
<?php
if (!tienePermiso('Usuarios', $permisos)) {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/404.php";</script>';
    exit;
}
?>


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!--PIE DE PAGINA-->


<?php
include_once '../partials/footer.php' ?>