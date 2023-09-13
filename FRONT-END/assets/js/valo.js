
//---------VALIDAR LOGIN------

var ojoo = document.getElementById("ojoo")
var contraseña = document.getElementById("password")



function validarojo() {

  if (contraseña.type == "password") {
    contraseña.type = "text"

  }
  else {
    contraseña.type = "password"

  }

}

ojoo.addEventListener("click", validarojo)

