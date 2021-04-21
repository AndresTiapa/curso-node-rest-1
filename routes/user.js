 const { Router } = require('express');

 const { getUsuarios, putUsuarios, patchUsuarios, deleteUsuarios, postUsuarios } = require('../controllers/usuarios.controllers');

 const router = Router();

 router.get('/', getUsuarios);

 router.put('/:id', putUsuarios);

 router.post('/', postUsuarios);

 router.patch('/', patchUsuarios);

 router.delete('/', deleteUsuarios);

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