const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-jwt');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const reqUsuario = await Usuario.findById(uid);

        if (!reqUsuario) {
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        if (!reqUsuario.estado) {
            return res.status(401).json({
                msg: 'Usuario no está activo'
            });
        }
        //req.uid = uid;
        req.usuario = reqUsuario;
        console.log(uid);
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'

        });
    }

    // next();
}

module.exports = {
    validarJWT
}