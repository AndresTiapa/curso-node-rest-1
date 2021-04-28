 const { validationResult } = require('express-validator');

 const validarCampos = (req, res, next) => {

     const validacion = validationResult(req);
     if (!validacion.isEmpty()) {
         return res.status(400).json(validacion);
     }

     next();
 }

 module.exports = {
     validarCampos
 }