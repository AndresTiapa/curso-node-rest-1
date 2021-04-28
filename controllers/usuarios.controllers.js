const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req, res = response) => {

    // query params
    // const { name, id, ok, estatus, n = 10 } = req.query;
    const condicion = { estado: true };
    const { limit = 5, desde = 0 } = req.query;
    /*     const usuarios = await Usuario.find(condicion)
            .limit(Number(limit))
            .skip(Number(desde));
        const total = await Usuario.countDocuments(condicion); */
    const [usuarios, total] = await Promise.all(
        [
            Usuario.find(condicion)
            .limit(Number(limit))
            .skip(Number(desde)),
            Usuario.countDocuments(condicion)
        ]
    );
    res.json({
        // resp
        total,
        usuarios
        /*  msg: 'put: Hello my World desde controller',
         name,
         ok,
         id,
         estatus, */
    });
}

const putUsuarios = async(req, res = response) => {
    // parametro de segmento
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar en db

    if (password) {

        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuarios = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        //msg: 'put: Hello my World desde controller',
        usuarios
    });
}

const postUsuarios = async(req, res = response) => {
    // Express-valdator

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // verificar correo existe
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //Guarddar en DB
    await usuario.save();


    res.json({
        //msg: ' Post: Hello world ',
        usuario
    });
}

const patchUsuarios = (req, res = response) => {

    res.send('patch: Hello my World desde controller');
}

const deleteUsuarios = async(req, res = response) => {
    const { id } = req.params;
    /*  // se elimina fisicamente
     const usuario = await Usuario.findByIdAndDelete(id); */
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario,
        id
    });
}

module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    patchUsuarios,
    deleteUsuarios
}