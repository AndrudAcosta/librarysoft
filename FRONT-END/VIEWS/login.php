<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LibrarySoft</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/estiloLogin.css">
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="../assets/img/ien.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div class="container">
        <span class="big-circle"></span>
        <img src="../assets/img/shape.png" class="square" alt="" />
        <div class="form">
        <div class="contact-info">
    <div class="info">
        <img src="../assets/img/logo2.png" alt="185px" width="250px">
    </div>
    <div class="social-media">
        <p>Redes sociales :</p>
        <div class="social-icons">
            <a href="https://www.facebook.com/ienuevohorizonte.medellin" target="_blank">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://ienuevohorizontemedellin.edu.co" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://ienuevohorizontemedellin.edu.co" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://ienuevohorizontemedellin.edu.co" target="_blank">
            <i class="fa-brands fa-google"></i>
            </a>
        </div>
    </div>
</div>

            <div class="contact-form">
                <span class="circle one"></span>
                <span class="circle two"></span>

                <form id="login-form">

                    <h1 class="title">Iniciar Sesión</h1>

                    <div class="con">
                        <div class="input-container">
                            <input type="text" id="documento" class="input" autocomplete="off" name="documento" placeholder="Ingrese su documento" onkeypress="return solonumeros(event)">

                        </div>
                        <div class="input-container">
                            <input type="password" class="input" id="password" autocomplete="off" name="password" placeholder="Ingrese su contraseña" />

                        </div>

                    </div>


                    <div class="form-check contra ">
                        <input hidden class="form-check-input ojito" type="checkbox" value="" id="ojoo">
                        <label style="cursor: pointer;"  class="form-check-label" for="ojoo"><i style="cursor: pointer;" class="fa-solid fa-eye"></i> Ver Contraseña</label>

                    </div>

                    <div class="form-group mx-sm-4 olvide">
                        <span class=""><a href="../VIEWS/recuperar.php" class="olcontra">¿Olvidaste tu contraseña?</a></span>
                    </div>


                    <button type="submit" class="btn ingresar">INGRESAR</button>

                </form>
            </div>
        </div>
    </div>
    <script src="../SRC/login/login.js"></script>
    <script src="../assets/js/validacionCampos.js"></script>
    <script src="../assets/js/valo.js"></script>
    <script src="../assets/js/general.js"></script>
     <!--CDN SWEETALERT2 --> 
     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>   
     
    <!-- <script src="../assets/js/validarLogin.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</body>

</body>

</html>