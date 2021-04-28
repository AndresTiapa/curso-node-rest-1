const Role = require('../models/role');
const Usuario = require('../models/usuario');
//const response = require('express');
//const { correo } = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no es valido`);
    }
}


const existeEmail = async(correo = '') => {
    const existeMail = await Usuario.findOne({ correo });
    console.log(correo);
    if (existeMail) {
        throw new Error(`El correo ${ correo } ya existe`);
    }
}

const existeUsuarioId = async(id = '') => {
    const existeID = await Usuario.findById(id);
    //console.log(correo);
    if (!existeID) {
        throw new Error(`El ID:  ${ id } no existe`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId
}