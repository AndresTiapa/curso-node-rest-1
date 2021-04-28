// getting-started.js
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /*   useCreateIndex: true,
              useFindAndModify: false */
        });

        console.log('Base de Datos conectada !');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la conección con la base de datos: ');
    }
}

module.exports = {
    dbConnection
}