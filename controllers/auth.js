const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuarios = await Usuario.findOne({ correo });
        if (!usuarios) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        //si usuario esta activo
        if (!usuarios.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado: False'
            });
        }

        //verificar  contraseña
        const validPass = bcryptjs.compareSync(password, usuarios.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }
        //generar JWT
        const token = await generarJWT(usuarios.id);


        res.json({
            msg: 'Login ok',
            usuarios,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    login
}