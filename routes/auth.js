const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');


const router = Router();


router.post('/login', [
    check('password', 'Contraseña es obligatoria y debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'Debe ingresar un correo válido').isEmail(),
    validarCampos
], login);


module.exports = router;