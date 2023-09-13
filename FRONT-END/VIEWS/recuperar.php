<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperar Contraseña</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/estiloRecuperar.css">
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="../assets/img/ien.ico" type="image/x-icon">
<style>
    .recuperar{
        margin-top: 50px;;
    }

    .con{
        margin-top: 55px;;
    }


    .container {
            /* Estilos para el div container */
            display: flex;
            flex-direction: column;
            align-items: center; /* Alineamos el contenido verticalmente en el centro */
        }

        .icono-salir {
            cursor: pointer; /* Agregamos un cursor de tipo puntero para indicar que es clickeable */
            /* Resto de estilos para el icono si es necesario */
            background-color: white;
            color:#16a084;

        }

        .icono-salir:hover{
            background-color: #16a084;
    color: white;
        }

        .recuperar-container ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        
.info{
  margin-top: 49px;

 }

 .social-media{
  margin-top: 55px;
}

        @media only screen and (max-width: 768px) {
            /* Aplicamos estilos adicionales para pantallas de hasta 768px */
            
            .icono-salir {
                position: relative; /* Cambiamos la posición para que sea relativo en pantallas pequeñas */
                top: 0; /* Restauramos la posición vertical */
                right: -150px; /* Ajustamos el valor right para mover el icono hacia la derecha */
                margin-top: 10px; /* Ajustamos el margen para que esté más cerca del botón */
            }
        }
</style>
</head>

<body>
    <div class="container">
    <div class="recuperar-container">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a href="login.php"  class="nav-link" role="button">
                        <i class="fa-solid fa-right-from-bracket icono-salir"></i>
                    </a>
                </li>
            </ul>
        </div>

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

                <form action="">
              
                    <br><br>
                    <h1 class="title" style="margin-top: 40px;">Recuperar Contraseña </h1>

                    <div class="con">
                        <div class="input-container">
                            <input type="number" id="documento" autocomplete="off" class="input" placeholder="Ingrese su documento"  style="margin-bottom: 35px;"/>

                        </div>

                    </div>


                    <button type="submit" id="recuperar" class="btn recuperar" style="margin-top: 10px;">RECUPERAR</button>


                </form>
            </div>
        </div>
    </div>


 <script src="../SRC/login/recover.js"></script>
  <!--Scripts Iconos -->
  <script src="https://kit.fontawesome.com/f669cfd668.js" crossorigin="anonymous"></script>

<!--CDN SWEETALERT2 --> 
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>   
</body>

</html>