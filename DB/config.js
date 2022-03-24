const mongoose = require('mongoose');
const mysql = require('mysql');

//función que sirve para crear la conexión con mongoDB
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
            //estos dos ultimos están en desuso
        });

        console.log('base de datos online');
    } catch (error) {
        console.log(error);
        throw new error('Error en la conexión');
    }
}

//
// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345678'
// });

// const mySqlConn = async () => {
//     try {
//         await con.connect(err => {
//             if (err) throw err;
//             console.log("Connected!");
//         });
//     } catch (error) {
//         console.log(error);
//         throw new error('Error en la conexión de mysql');
//     }
// }

//exporto la función dbConnection
module.exports = {
    dbConnection,
    // mySqlConn
};