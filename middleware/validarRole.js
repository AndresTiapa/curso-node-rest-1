const { response } = require("express");





const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no está autorizado para eliminar usuarios`
        });
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token'
            });
        }


        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `${ req.usuario.nombre } no está autorizado para eliminar usuarios - debe ser roles: ${roles}`
            });
        }
        console.log(roles);
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}