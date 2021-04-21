const express = require('express');
var cors = require('cors');
//require('dotenv').config();


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.rutasUser = '/api/usuarios';

        // middleware
        this.middleware();
        // Rutas de mi aplicacion 
        this.routes();
        //this.start();
    }

    middleware() {
        //cors
        this.app.use(cors());
        //Lectura y parser del body
        this.app.use(express.json());
        //director publico
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.rutasUser, require('../routes/user'));

    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;