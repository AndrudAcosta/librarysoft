<?php include_once '../partials/head.php' ?>
<?php include_once '../partials/sidebar.php' ?>

<?php
if (!tienePermiso('Libros', $permisos)) {
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
                            <h1 class="text-center d-flex justify-content-start titlePages"><i class="fa-solid fa-book iconsTitle"></i>
                                Libros </h1>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
                                <div class="container-fluid d-flex justify-content-end">
                                    <?php if ($nombreRol === 'Administrador') : '' ?>
                                        <button id="" type="button" class="btn btn-library" data-bs-toggle="modal" data-bs-target="#modalAddBook"><i class="fa-solid fa-plus"></i> Agregar

                                        </button>
                                    <?php endif; ?>
                                </div>
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
            <table class="table table-striped nowrap dt-responsive" style="width:100%" id="tableBooks">
                <!-- ENCABEZADO TABLA -->
                <thead class="thead">
                    <tr>
                        <th scope="col " hidden>Id</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Título</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Editorial</th>
                        <th scope="col">Disponibles</th>
                        <th style="text-align: center;">Acciones</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="list-books">

                </tbody>
            </table>
        </div>
    </section>
</div>

<!-- Modal Registrar Libros-->
<div class="modal fade" id="modalAddBook" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">AGREGAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeFormAddBook"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3" id="formAddBook" autocomplete="off">
                    <!-- Grupo: isbn -->
                    <div class="col-md-6 ">
                        <label for="isbn">ISBN</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="isbn" id="isbn" onkeypress="return soloNumerosYGuiones(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números y guiones en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: titulo -->
                    <div class="col-md-6 ">
                        <label for="titulo">Título</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="titulo" id="titulo">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>


                    <!-- Grupo: ilustrador -->
                    <div class="col-md-6 ">
                        <label for="ilustrador">Ilustrador</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="ilustrador" id="ilustrador">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>

                    </div>

                    <!-- Grupo: impresion -->
                    <div class="col-md-6 ">
                        <label for="impresion">Impresión</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="impresion" id="impresion">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: autor -->
                    <div class="col-md-6 ">
                        <label for="autor">Autor</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="autor" id="autor" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: editorial -->
                    <div class="col-md-6 ">
                        <label for="editorial">Editorial</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="editorial" id="editorial">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Ciudad -->
                    <div class="col-md-6 ">
                        <label for="ciudad">Ciudad</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="ciudad" id="ciudad" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: categoria -->

                    <div class="col-md-6 ">
                        <label for="select-categories">Categoría</label>
                        <div class="has-validation">
                            <select id="select-categories" class="form-select">

                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="agregarLibro" class="btn btn-library formulario__btn">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal editar Libro-->

<div class="modal fade" id="modalUpdateBook" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">EDITAR</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeFormUpdateBook"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3 formulario" id="formUpdateBook" autocomplete="off" action="libros.html">
                    <!-- Grupo: id -->
                    <div class="col-md-4 " hidden>
                        <label for="idLibroU">Id</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="idLibroU" id="idLibroU">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números y guiones en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: isbn -->
                    <div class="col-md-4">
                        <label for="isbnU">ISBN</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="isbnU" id="isbnU" onkeypress="return soloNumerosYGuiones(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números y guiones en este campo.
                            </div>
                        </div>
                    </div>


                    <!-- Grupo: titulo -->
                    <div class="col-md-4 ">
                        <label for="tituloU">Título</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="tituloU" id="tituloU">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: ilustrador -->
                    <div class="col-md-4 ">
                        <label for="ilustradorU">Ilustrador</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="ilustradorU" id="ilustradorU">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: impresion -->
                    <div class="col-md-4 ">
                        <label for="impresionU">Impresión</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="impresionU" id="impresionU">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: autor -->
                    <div class="col-md-4 ">
                        <label for="autorU">Autor</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="autorU" id="autorU" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: editorial -->
                    <div class="col-md-4 ">
                        <label for="editorialU">Editorial</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="editorialU" id="editorialU">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras y números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: Ciudad -->
                    <div class="col-md-4 ">
                        <label for="ciudad">Ciudad</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="ciudad" id="ciudadU" onkeypress="return sololetras(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo letras en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: categoria -->

                    <div class="col-md-4 ">
                        <label for="categoriaU">Categoría</label>
                        <div class="has-validation">
                            <select class="form-select" id="select-categoriesU">

                            </select>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" id="actualizarLibro" class="btn btn-library formulario__btn">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal VER copyes -->
<div class="modal fade" id="modalCopies" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">EJEMPLARES</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeFormlistCopies"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <button type="button" class="btn btn-library" data-bs-toggle="modal" data-bs-target="#modalAddEjemplar">
                        <i class="fa-solid fa-plus"></i> Agregar
                    </button>
                </div>
                <section class="content">
                    <!-- CONTENIDO Y TABLAS -->
                    <div class="container-fluid p-2">
                        <table class="table table-bordered  list-copies nowrap dt-responsive" style="width:100%" id="tableCopies">
                            <thead class="table">
                                <tr>
                                    <th style="text-align: center;" hidden>idBook</th>
                                    <th style="text-align: center;" hidden>IdEjemplar</th>
                                    <th style="text-align: center;">Ejemplar</th>
                                    <th style="text-align: center;">Observación</th>
                                    <th style="text-align: center;">Estado</th>
                                    <th style="text-align: center;">Ubicación</th>
                                    <th style="text-align: center;">Disponibilidad</th>
                                    <th style="text-align: center;">Editar</th>
                                    <th style="text-align: center;">Info</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider" id="list-copies">

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <div class="modal-footer">

            </div>
        </div>
    </div>
</div>

<!-- Modal VER DETALLES -->
<div class="modal fade" id="modalViewEjemplares" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">DETALLE</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrar"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3" id="Form-detalles">

                    <!--  ISBN -->
                    <div class="col-md-4 ">
                        <label>ISBN</label>
                        <input id="isbnD" class="form-control" type="text" value="1221212" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Titulo -->
                    <div class="col-md-4 ">
                        <label>Título</label>
                        <input id="tituloD" class="form-control" type="text" value="Principito" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Ilustrador -->
                    <div class="col-md-4 ">
                        <label>Ilustrador</label>
                        <input id="ilustradorD" class="form-control" type="text" value="Ilustraciones S.A.S" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Impresión -->
                    <div class="col-md-4 ">
                        <label>Impresión</label>
                        <input id="impresionD" class="form-control" type="text" value="Impresiones S.A.S" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Autor -->
                    <div class="col-md-4 ">
                        <label>Autor</label>
                        <input id="autorD" class="form-control" type="text" value="Castro Pastrana" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Editorial -->
                    <div class="col-md-4 ">
                        <label>Editorial</label>
                        <input id="editorialD" class="form-control" type="text" value="Editoriales S.A.S" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Ciudad -->
                    <div class="col-md-4 ">
                        <label>Ciudad</label>
                        <input id="ciudadD" class="form-control" type="text" value="Medellín" aria-label="readonly input example" readonly>
                    </div>
                    <!--  Categoria -->
                    <div class="col-md-4 ">
                        <label>Categoría</label>
                        <input id="categoriaD" class="form-control" type="text" value="Cuento" aria-label="readonly input example" readonly>
                    </div>

                    <!--  Disponibles -->
                    <div class="col-md-4 ">
                        <label>Disponibles</label>
                        <input id="disponiblesD" class="form-control" type="text" value="2" aria-label="readonly input example" readonly>
                    </div>

                    <!-- Grupo: HR -->
                    <hr class="mt-4">
                    <!-- Grupo: Tabla -->
                    <div class="container-fluid">
                        <h5 class="modal-title" id="staticBackdropLabel">Ejemplares</h5>
                    </div>

                    <div class="container-fluid text-end">
                    </div>
                    <section class="content">
                        <div class="container-fluid table-responsive">
                            <!-- CONTENIDO Y TABLAS -->
                            <table class="table table-bordered table-secondary">
                                <thead class="table table-secondary">
                                    <tr>
                                        <th style="text-align: center;">Ejemplar</th>
                                        <th style="text-align: center;">Observación</th>
                                        <th style="text-align: center;">Estado</th>
                                        <th style="text-align: center;">Ubicación</th>
                                        <th style="text-align: center;">Disponibilidad</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider table-secondary " id="list-details">

                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div class="modal-footer">

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal editar ejemplar-->
<div class="modal fade" id="modalUpdateEjemplar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">EDITAR</h5>
                <button type="button" class="btn-close" id="closeFormUpdateCopy" data-bs-toggle="modal" data-bs-target="#modalCopies"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3 formulario dt-responsive" id="formUpdateCopy">

                    <div class="col-md-6 " hidden>
                        <label for="idLibroEjemplarUpdate">IdLibro</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="idLibroEjemplarUpdate" id="idLibroEjemplarUpdate">
                        </div>
                    </div>

                    <div class="col-md-6 " hidden>
                        <label for="idEjemplarUpdate">IdEjemplar</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="idEjemplarUpdate" id="idEjemplarUpdate">
                        </div>
                    </div>

                    <!-- Grupo: NUMERO DE EJEMPLAR -->
                    <div class="col-md-6 ">
                        <label for="ejemplarUpdate">Ejemplar</label>
                        <div class="has-validation">
                            <input class="form-control" type="number" name="ejemplarUpdate" id="ejemplarUpdate" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: estado -->
                    <div class="col-md-6 ">
                        <label for="estado">Estado</label>
                        <div class="has-validation">
                            <select class="form-select" aria-label="select example" id="select-updateCopy">

                            </select>
                        </div>
                    </div>

                    <!-- Grupo: Observacion -->
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="observacionUpdate">Observación</label>
                            <div class="has-validation">
                                <textarea class="form-control" id="observacionUpdate" name="observacionUpdate" rows="4" cols="60" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" onclick="UpdateCopy()" class="btn btn-library formulario__btn">Editar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal AGREGAR EJEMPLAR-->
<div class="modal fade" id="modalAddEjemplar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">AGREGAR EJEMPLAR</h5>
                <button type="button" class="btn-close" aria-label="Close" id="closeFormAddCopy" data-bs-toggle="modal" data-bs-target="#modalCopies"></button>
            </div>
            <div class="modal-body">

                <form class="row g-3 formulario" id="formAddCopy">
                    <!-- Grupo: NUMERO DE EJEMPLAR -->

                    <div class="col-md-6 " hidden>
                        <label for="idLibroEjemplarAdd">IdLibro</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="idLibroEjemplarAdd" id="idLibroEjemplarAdd">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="ejemplarAdd">Ejemplar</label>
                        <div class="has-validation">
                            <input class="form-control" type="text" name="ejemplarAdd" id="ejemplarAdd" onkeypress="return solonumeros(event)">
                            <div class="invalid-feedback">
                                Por favor, ingrese solo números en este campo.
                            </div>
                        </div>
                    </div>

                    <!-- Grupo: estado -->
                    <div class="col-md-6 ">
                        <label for="estadoAddCopy">Estado</label>
                        <div class="has-validation">
                            <select class="form-select" id="select-statecopy">

                            </select>
                        </div>
                    </div>

                    <!-- Grupo: Observacion -->
                    <div class="col-md-12 ">
                        <div class="form-group">
                            <label for="observacionAdd">Observación</label>
                            <textarea class="form-control" id="observacionAdd" name="observacionAdd" rows="4" style="resize: none;"></textarea>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" id="AddCopy" class="btn btn-library formulario__btn" data-bs-target="#modalUpdateBook">Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include_once '../partials/viewLoan.php' ?>

<script>
    $(document).ready(() => {
        listBooks()


        $('#tableBooks').dataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtp',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })

    $(document).ready(() => {
        $('#tableCopies').dataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Brtp',
            pageLength: 5,
            lengthChange: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

    })
</script>

<!-- AQUI SCRIPTS APIS -->
<script src="../../SRC/books/list.js"></script>
<script src="../../SRC/books/add.js"></script>
<script src="../../SRC/books/selects.js"></script>
<script src="../../SRC/books/Update.js"></script>
<script src="../../SRC/books/details.js"></script>
<script src="../../SRC/prestamos/view.js"></script>
<script src="../../assets/js/validationBooks.js"></script>
<script src="../../assets/js/general.js"></script>

<?php include_once '../partials/footer.php' ?>