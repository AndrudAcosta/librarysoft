<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>actualizar Contraseña</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/estiloLogin.css">
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="../assets/img/ien.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        .recuperar {
            margin-top: 50px;
        }

        .con {
            margin-top: 85px;
        }

        .title{
            margin-top: -5px;
        }

       

    

        #actualizar{
            margin-top: 50px;
        }


        .validation-message {
            margin-top: 0.375em;
            color: rgb(247, 247, 247);
        }
    </style>
</head>

<body>
    <div class="container">
        <span class="big-circle"></span>
        <img src="../assets/img/shape.png" class="square" alt="" />
        <div class="form">
            <div class="contact-info">
                <div class="info">
                    <img src="../assets/img/logo2.png"  width="250px">
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

                <form id="form" action="login.html">
                    <br><br>
                    <h1 class="title">Cambio de Contraseña </h1>
                    <div class="con">
                        <div class="input-container">
                            <input type="password" id="password" autocomplete="off" class="input" placeholder="Ingrese su nueva contraseña" />
                        </div>
                    </div>

                    <div class="form-check contra" style="margin-top: 30px;">
                        <input hidden class="form-check-input ojito" type="checkbox" value="" id="ojoo">
                        <label style="cursor: pointer;" class="form-check-label" for="ojoo"><i style="cursor: pointer;" class="fa-solid fa-eye"></i> Ver Contraseña</label>
                    </div>


                    <button type="submit" id="actualizar" class="btn recuperar">ACTUALIZAR</button>
                </form>

            </div>
        </div>
    </div>

    <script>
    const passwordInput = document.getElementById('password');
    let timeoutId;

    passwordInput.addEventListener('input', function(event) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(function() {
            if (passwordInput.value.length < 8) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contraseña debe tener como mínimo 8 caracteres.',
                    confirmButtonColor: '#16a084'
                });
            }
        }, 550); // Espera 1 segundo de inactividad antes de mostrar la alerta
    });

    passwordInput.addEventListener('blur', function(event) {
        clearTimeout(timeoutId);
    });
</script>


    <script src="../assets/js/valo.js"></script>
    <script src="../SRC/login/update.js"></script>
    <!--CDN SWEETALERT2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>