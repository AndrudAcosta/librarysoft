async function deleteBooking() {
    try {
        const idReserva = parseInt(document.getElementById("idReserva").value)
        const documento = document.getElementById("documentoUpdate").value

        console.log(idReserva)

        const confirmed = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16a084'
        })
        if (confirmed.isConfirmed === true) {

            const response1 = await fetch('http://localhost:8282/api/bookings/emailDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idReserva : idReserva})
            });
            if (!response1.ok) {
                throw new Error('Error al enviar correo de eliminacion de la reserva')
            }

            const response = await fetch('http://localhost:8282/api/bookings/delete', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idReserva : idReserva})
            });
            

            if (!response.ok) {
                throw new Error('Error al eliminar la reserva')
            }
            else {
                if(NameRole === 'Administrador' && documento == documentoUser){
                    await Swal.fire({
                        confirmButtonColor: '#16a084',
                        icon: 'success',
                        title: 'Reserva eliminada.',
                        text: 'Reserva eliminada exitosamente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                    location.assign('reservas.php');
                    reset();
                }else if(NameRole === 'Administrador' && documento != documentoUser){
                    await Swal.fire({
                        confirmButtonColor: '#16a084',
                        icon: 'success',
                        title: 'Reserva eliminada.',
                        text: 'Reserva eliminada exitosamente, se notificará al correo del reservante.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                    location.assign('reservas.php');
                    reset();
                }else{
                    await Swal.fire({
                        confirmButtonColor: '#16a084',
                        icon: 'success',
                        title: 'Reserva eliminada.',
                        text: 'Reserva eliminada exitosamente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                    location.assign('reservas.php');
                    reset();
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}


