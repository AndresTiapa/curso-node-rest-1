const { response } = require('express');

const getUsuarios = (req, res = response) => {

    // query params
    const { name, id, ok, estatus, n = 10 } = req.query;
    res.json({
        msg: 'put: Hello my World desde controller',
        name,
        ok,
        id,
        estatus,
        n
    });
}

const putUsuarios = (req, res = response) => {
    // parametro de segmento
    const { id } = req.params;
    res.json({
        msg: 'put: Hello my World desde controller',
        id
    });
}

const postUsuarios = (req, res = response) => {

    const { nombre, edad, id } = req.body;

    res.json({
        msg: ' Post: Hello world ',
        nombre,
        edad,
        id
    });
}

const patchUsuarios = (req, res = response) => {

    res.send('patch: Hello my World desde controller');
}

const deleteUsuarios = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put: Hello my World desde controller',
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