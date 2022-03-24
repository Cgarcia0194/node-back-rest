const Server = require('./models/server/server'); //sirve para requerir el archivo server que es el que levanta el servidor
const server = new Server(); //se guarda la variable anterior como variable que inicializa en server

//require('dotenv').config();//se requiere el dotenv para hacer uso de archivos .env

server.listen(); //se escucha el servidor con la función listen de la clase Server