   const jwt = require('jsonwebtoken');

   const generarJWT = (uid = '') => {
       return new Promise((resolve, reject) => {
           const paylaod = { uid };

           jwt.sign(paylaod, process.env.SECRETORPRIVATEKEY, {
               expiresIn: '4h'
           }, (err, token) => {
               if (err) {
                   console.log(err);
                   reject('No se pudo generar el JWT');
               } else {
                   resolve(token);
               }
           })
       });
   }

   module.exports = {
       generarJWT
   }