const validaCampos = require('../middleware/validar-campos');
const validaJWT = require('../middleware/validarJWT');
const validaRoles = require('../middleware/validarRole');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
}