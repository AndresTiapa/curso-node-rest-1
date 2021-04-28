 const { Router } = require('express');
 const { check } = require('express-validator');

 const { getUsuarios, putUsuarios, patchUsuarios, deleteUsuarios, postUsuarios } = require('../controllers/usuarios.controllers');
 const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validaors');
 const { validarCampos } = require('../middleware/validar-campos');

 const router = Router();

 router.get('/', getUsuarios);

 router.put('/:id', [
     check('id', 'No es un id válido').isMongoId(),
     check('id', 'No existe este id').custom(existeUsuarioId),
     check('rol').custom((rol) => esRoleValido(rol)),
     validarCampos
 ], putUsuarios);

 router.post('/', [
     check('nombre', 'Debe ingresar un nombre').not().isEmpty(),
     check('password', 'Contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
     check('correo', 'Debe ingresar un correo válido').isEmail(),
     check('correo', 'El correo ya existe').custom(existeEmail), //(correo) => existeEmail(correo)
     //check('rol', 'Rol no válido').isIn(['ADMIN_ROL', 'USER_ROL']),
     check('rol').custom((rol) => esRoleValido(rol)),
     validarCampos
 ], postUsuarios);

 router.patch('/', patchUsuarios);

 router.delete('/:id', [
     check('id', 'No es un id válido').isMongoId(),
     check('id', 'No existe este id').custom(existeUsuarioId),
     validarCampos
 ], deleteUsuarios);

 /* 
  router.put('/', (req, res) => {
      res.send('Put: Hello my World');
  });


  router.delete('/', (req, res) => {
      res.send('Delete: Hello my World');
  });


  router.post('/', (req, res) => {
      res.send('Post: Hello my World');
  });


  router.patch('/', (req, res) => {
      res.send('Patch: Hello my World')
  }); */

 module.exports = router;