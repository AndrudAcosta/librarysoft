<?php
include_once '../partials/decode.php'
?>


<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">

        <!--SUB MENU SUPERIOR IZQUIERDA-->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="/" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" role="button" onclick="salir()"><i class="fa-solid fa-right-from-bracket"></i></a>
                </li>
            </ul>
        </nav>

        <!--SIDEBAR LATERAL-->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                <?php if ($nombreRol === 'Estudiante') : ?>
                    <img src="../../assets/img/estudiante.png" class="img-circle elevation-2" alt="User Image">
                <?php elseif ($nombreRol === 'Profesor') : ?>
                    <img src="../../assets/img/profesor.png" class="img-circle elevation-2" alt="User Image">
                <?php else : ?>
                    <img src="../../assets/img/avatar.png" class="img-circle elevation-2" alt="User Image">
                <?php endif; ?>
            </div>
                    <div class="info">
                        <?php if (isset($decodedToken['nombres']) && isset($decodedToken['apellidos'])) : ?>
                            <?php
                            // Obtener el primer nombre y el primer apellido
                            $nombresArray = explode(' ', $decodedToken['nombres']);
                            $apellidosArray = explode(' ', $decodedToken['apellidos']);
                            $nombres = $decodedToken['nombres'];
                            $apellidos = $decodedToken['apellidos']; 
                            $primerNombre = $nombresArray[0];
                            $primerApellido = $apellidosArray[0];
                            ?>
                            <p href="" class="d-block" id="name-user-sidebar">
                                <?php echo $primerNombre . ' ' . $primerApellido; ?>
                            </p>
                            <div id="valor-container-nameUser" data-valor="<?php echo $nombres. ' ' .$apellidos; ?>"></div>
                        <?php endif; ?>
                    </div>

                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <?php foreach ($sidebarItems as $item) : ?>
                            <?php if (in_array($item, $permisos) && isset($icons[$item])) : ?>
                                <li class="nav-item">
                                    <?php if ($item === 'Usuarios') : ?>
                                        <a href="#" class="nav-link">
                                            <i class="<?= $icons[$item] ?>"></i>
                                            <p>
                                                <?= $item ?>
                                                <i class="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <!-- Agrega aquí los enlaces específicos para 'Usuarios' -->

                                            <li class="nav-item">
                                                <a href="tableAdmin.php" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Administrativos</p>
                                                </a>
                                            </li>

                                            <li class="nav-item">
                                                <a href="tableTeacher.php" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Profesor</p>
                                                </a>
                                            </li>

                                            <li class="nav-item">
                                                <a href="tableStudent.php" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Estudiante</p>
                                                </a>
                                            </li>
                                            <!-- Agrega más elementos de submenú según sea necesario -->
                                        </ul>
                                    <?php else : ?>
                                        <a href="<?= strtolower($item) ?>.php" class="nav-link">
                                            <i class="<?= $icons[$item] ?>"></i>
                                            <p>
                                                <?= $item ?>
                                            </p>
                                        </a>
                                    <?php endif; ?>
                                </li>
                                <br>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </ul>
                </nav>
            </div>
        </aside>
    </div>