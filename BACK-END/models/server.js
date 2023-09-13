const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8282;
        this.loginPath = "/api/login";
        this.pruebaPath = "/api/prueba";
        this.usuariosPath = "/api/usuarios";
        this.librosPath = "/api/libros";
        this.bookingsPath = "/api/bookings";
        this.rolesPath = "/api/roles";
        this.prestamosPath = "/api/prestamos";
        this.sancionesPath = "/api/sanciones";
        this.dashboardPath = "/api/dashboard";
        this.dashboardRPath = "/api/dashboardR";
        this.middlewares()
        this.routes() 
    }


middlewares() {
  this.app.use(cors({
    origin: ['http://localhost', 'http://localhost:8100'],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
  }));
  

  this.app.use(cookieParser());
  this.app.use(express.json());
}





routes(){
        this.app.use(this.loginPath, require("../routes/index"));
        this.app.use(this.pruebaPath, require("../routes/index"));
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
        this.app.use(this.rolesPath, require("../routes/roles"))
        this.app.use(this.prestamosPath, require("../routes/prestamos"))
    this.app.use(this.librosPath, require("../routes/libros"));
    this.app.use(this.bookingsPath, require("../routes/bookings"));
    this.app.use(this.sancionesPath, require("../routes/sanciones"));
    this.app.use(this.dashboardPath, require("../routes/dashboard"));
    this.app.use(this.dashboardRPath, require("../routes/reservas"));

}

listen(){
        this.app.listen(this.port,()=>{
        console.log(`Escuchando desde http://localhost:${this.port}`)
        })
    }
}

module.exports = Server