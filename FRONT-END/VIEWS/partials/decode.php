<?php
$token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;

// Verifica si el token está presente y tiene un formato válido
if ($token) {
    $tokenParts = explode('.', $token);
    if (count($tokenParts) === 3) {
        // Decodifica el token JWT
        $decodedToken = json_decode(base64_decode($tokenParts[1]), true);

        $nombreRol = $decodedToken['nombreRol'];
        // Obtiene los permisos directamente del token
        $permisos = $decodedToken['permisos'];

        // Array con los elementos del sidebar
        $sidebarItems = ['Dashboard', 'Roles', 'Usuarios', 'Libros', 'Préstamos', 'Reservas', 'Sanciones'];

         // Verificar permiso 'Usuarios'
        // Función para determinar si un elemento debe mostrarse u ocultarse
        function mostrarElemento($item, $permisos) {
            return isset($permisos[$item]) ? 'block' : 'none';
        }
    } else {
        echo 'Error en el formato del token';
        exit;
    }
} else {
    echo '<script>window.location.href = "http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/401.php";</script>';
    exit;
}

function tienePermiso($item, $permisos) {
    return in_array($item, $permisos);
}


$icons = [
    'Dashboard' => 'fas fa-tachometer-alt',
    'Roles' => 'fas fa-users-cog',
    'Usuarios' => 'fas fa-user',
    'Beneficiarios' => 'fas fa-user-friends',
    'Libros' => 'fas fa-book',
    'Préstamos' => 'fas fa-handshake',
    'Reservas' => 'fas fa-clipboard',
    'Sanciones' => 'fas fa-user-slash',
    // Agrega más enlaces y sus íconos según sea necesario
];

?>

<?php if (isset($decodedToken['nombreRol'])): ?>
    <?php
        $nombreRolArray = explode(' ', $decodedToken['nombreRol']);
        $nombreRol = $nombreRolArray[0];
    ?>
<?php endif; ?>

<?php if (isset($decodedToken['documento'])): ?>
    <?php
        $documentoArray = explode(' ', $decodedToken['documento']);
        $documento = $documentoArray[0];
    ?>
<?php endif; ?>

<div id="valor-container" data-valor="<?php echo $nombreRol; ?>"></div>

<div id="valor-documento" data-valor="<?php echo $documento; ?>"></div>