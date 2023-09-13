<!DOCTYPE html>
<html>

<head>
	<title>Error 401 - Acceso no autorizado</title>
	<style>
		body {
			background-color: #f8f8f8;
			margin: 0;
			padding: 0;
			font-family: Arial, sans-serif;
		}

		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100vh;
			padding: 20px;
		}

		h1 {
			color: #2c3e50;
			font-size: 64px;
			font-weight: bold;
			margin: 0;
			padding: 0;
			text-align: center;
			text-shadow: 2px 2px 0px #7f8c8d;
		}

		h2 {
			color: #3498db;
			font-size: 24px;
			font-weight: bold;
			margin: 0;
			padding: 0;
			text-align: center;
			text-shadow: 1px 1px 0px #ecf0f1;
		}

		p {
			color: #2c3e50;
			font-size: 18px;
			margin: 20px 0;
			padding: 0;
			text-align: center;
			text-shadow: 1px 1px 0px #ecf0f1;
		}
	</style>
    <link rel="shortcut icon" href="../assets/img/ien.ico" type="image/x-icon">
</head>

<body>
	<div class="container">
		<h1>401</h1>
		<h2>Acceso no autorizado</h2>
		<p>Lo sentimos, pero no tienes permisos para acceder a esta página.</p>
	</div>


	<script>
		  function redireccionarALogin() {
            window.location.href = "login.php";
        }

        // Espera 5 segundos y luego redirecciona a login.php
        setTimeout(redireccionarALogin, 2000);
    </script>
	</script>

    <!--CDN SWEETALERT2 --> 
   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>   

</body>

</html>