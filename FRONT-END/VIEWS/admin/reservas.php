
<?php include_once '../partials/head.php' ?> 
<?php include_once '../partials/sidebar.php' ?>

<?php
if (!tienePermiso('Reservas', $permisos)) {
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
                            <h1 class="text-center d-flex justify-content-start titlePages"><i class="fa-solid fa-clipboard iconsTitle"></i>
                                Reservas </h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="dashboard.php">Inicio</a> /</li>
                                    <li class="breadcrumb-item active" aria-current="page">Agenda de Reservas</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid card p-3">
            <!-- CONTENIDO Y TABLAS -->
            <main class="main-container">
                <div class="container-fluid " style="width: 900px;" id='calendar' data-bs-toggle="modal">

                </div>
            </main>
        </div>
    </section>
</div>

<!-- Modal Registrar Reservas-->
<div class="modal fade" id="modalAddReserva" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">AGREGAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAddBooking"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3" id="formAddBooking" autocomplete="off">
                    <div class="col-md-12" id="CheckDocument">
                        
                        
                    </div>
                    <div class="col-md-12" id="documento_div" style="display: none;">
                        <label for="documentoAdd">Documento</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="documentoAdd" id="documentoAdd" onkeypress="return soloNumerosYGuiones(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese un documento válido.
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <label for="evento">Evento</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="eventoAdd" id="eventoAdd">
                            <div class="invalid-feedback">
                                Por favor, no ingrese carecteres especiales en este campo.
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                            <div class="form-group">
                                <label for="descripcionAdd">Descripcion</label>
                                <div class="has-validation">
                                    <textarea class="form-control" id="descripcionAdd" name="descripcionAdd" rows="3" cols="60" style="resize: none;"></textarea>
                                </div>
                            </div>
                    </div>

                    <!-- Grupo: fecha -->
                    <div class="col-md-12">
                        <label for="fechaAdd">Fecha</label>
                        <div class="has-validation">
                            <input min="" type="date" class="form-control" name="fechaAdd" id="fechaAdd">
                            <div class="invalid-feedback">
                                Por favor, ingrese una fecha válida.
                            </div>
                        </div>
                    </div>


                    <!-- Grupo: horaInicioAdd -->
                    <div class="col-md-6 ">
                        <label for="horaInicioAdd">Hora de inicio</label>
                        <div class="has-validation">
                            <input type="time" class="form-control" name="horaInicioAdd" id="horaInicioAdd" min="08:00" max="16:00" required>
                            <div class="invalid-feedback">
                                Por favor, ingrese una hora inicial válida.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: fechaAdd -->
                    <div class="col-md-6">
                        <label for="horaFinAdd">Hora de finalización</label>
                        <div class="has-validation">
                            <input type="time" class="form-control" name="horaFinAdd" id="horaFinAdd" min="08:00" max="16:00" required>

                            <div class="invalid-feedback">
                                Por favor, ingrese una hora final válida.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" id="addBooking" class="btn btn-library formulario__btn">Agregar</button>

            </div>
        </div>
    </div>
</div>

<!-- Modal editar Reservas-->
<div class="modal fade" id="modalUpdateReserva" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title "id="titleModalUpdateBookins">EDITAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalUpdateBooking"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3" id="formUpdateBooking" autocomplete="off">
                    <div class="col-md-12" hidden>
                        <label for="idReserva">idReserva</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="idReserva" id="idReserva" 
                            aria-label="readonly input example" readonly>
                        </div>
                    </div>
                    <div class="col-md-12" hidden>
                        <label for="documentoUpdate">documentoUpdate</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="documentoUpdate" id="documentoUpdate" 
                            aria-label="readonly input example" readonly>
                        </div>
                    </div> 

                    <div class="col-md-12">
                        <label for="nombreUpdate">Reservante</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="nombreUpdate" id="nombreUpdate" 
                            aria-label="readonly input example" readonly>
                        </div>
                    </div> 
                    <div class="col-md-12">
                        <label for="evento">Evento</label>
                        <div class="has-validation">
                            <input type="text" class="form-control" name="eventoUpdate" id="eventoUpdate" aria-label="readonly input example" readonly>
                            <div class="invalid-feedback">
                                Por favor, no ingrese carecteres especiales en este campo.
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                            <div class="form-group">
                                <label for="descripcionUpdate">Descripción</label>
                                <div class="has-validation">
                                    <textarea class="form-control" id="descripcionUpdate" name="descripcionUpdate" rows="3" cols="60" style="resize: none;" aria-label="readonly input example" readonly></textarea>
                                </div>
                            </div>
                    </div>

                    <!-- Grupo: fecha -->
                    <div class="col-md-12">
                        <label for="fechaUpdate">Fecha</label>
                        <div class="has-validation">
                            <input min="" type="date" class="form-control" name="fechaUpdate" id="fechaUpdate">
                            <div class="invalid-feedback">
                                Por favor, ingrese una fecha válida.
                            </div>
                        </div>
                    </div>


                    <!-- Grupo: horaInicioUpdate -->
                    <div class="col-md-6 ">
                        <label for="horaInicioUpdate">Hora de inicio</label>
                        <div class="has-validation">
                            <input type="time" class="form-control" name="horaInicioUpdate" id="horaInicioUpdate" required>
                            <div class="invalid-feedback">
                                Por favor, ingrese una hora inicial válida.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: fechaUpdate -->
                    <div class="col-md-6">
                        <label for="horaFinUpdate">Hora de finalización</label>
                        <div class="has-validation">
                            <input type="time" class="form-control" name="horaFinUpdate" id="horaFinUpdate" required>

                            <div class="invalid-feedback">
                                Por favor, ingrese una hora final válida.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 " id="accions">
                        
                    </div>
                </form>
            </div>
            <div class="modal-footer " id="footerModalUpdate">
                    
            </div>
        </div>
    </div>
</div>

<script>
    
</script>
<!-- AQUI SCRIPT -->
<script src='../../assets/js/main.js'></script>
<script src='../../assets/js/es.js'></script>
<script src="../../SRC/bookings/calendar.js"></script>
<script src="../../SRC/bookings/add.js"></script>
<script src="../../SRC/bookings/update.js"></script>
<script src="../../SRC/bookings/delete.js"></script>
<script src="../../assets/js/validationBookings.js"></script>

<?php include_once '../partials/footer.php' ?>