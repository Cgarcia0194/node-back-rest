const cors = require("cors"); //se requiere cors para el uso de peticiones fuera del servidor
const express = require("express"); //se impporta/requiere express para hacer más fácil la configuración del server
const {
  dbConnection
} = require("../../DB/config");

const {
  fileUpload
} = require("../../helpers");

require("dotenv").config(); //se requiere el dotenv para hacer uso de archivos .env

class Server {
  constructor() {
    this.app = express(); //se guarda el método express de arriba en app
    this.port = process.env.PORT != undefined ? process.env.PORT : "3001"; // se guarda el puerto desde el archivo .env

    //objeto donde se establecen las rutas que se van a estar usando o que se llevan creadas en el proyecto
    this.paths = {
      authPath: "/api/auth", //se establece la ruta donde están las rutas de authentication y se define api
      // buscarPath: "/api/buscar", //se establece la ruta donde están las rutas de authentication y se define api
      categoriasPath: "/api/categorias", //se establece la ruta donde están las rutas de categorias y se define api
      // coloniasPath: "/api/colonias", //se establece la ruta donde están las rutas de authentication y se define api
      // estadosPath: "/api/estados", //se establece la ruta donde están las rutas de authentication y se define api
      // movimientosPath: "/api/movimientos", //se establece la ruta donde están las rutas de authentication y se define api
      // paisesPath: "/api/paises", //se establece la ruta donde están las rutas de paises y se define api
      personasPath: "/api/personas", //se establece la ruta donde están las rutas de personas y se define api
      productosPath: "/api/productos", //se establece la ruta donde están las rutas de paises y se define api
      // uploadsPath: "/api/uploads", //se establece la ruta donde están las rutas de usuarios y se define api
      usuariosPath: "/api/usuarios", //se establece la ruta donde están las rutas de usuarios y se define api
    };

    //conecta a la base de datos
    this.dbConnect();

    //MIDDLEWARES Funciones que añaden funcionalidad al web server
    /**
     * CORS sirve para proteger el servidor como los errores de cross origin access error
     */
    this.middlewares(); //si manda llamar la función middlewares

    //rutas de la aplicación
    this.routes(); // se manda llamar la función routes
  }

  /**
   * Función que sirve para invocar a la función dbConnection que conecta a la base de datos
   */
  async dbConnect() {
    try {
      await dbConnection.authenticate();
      
      console.log('db Online');
    } catch (error) {
      throw new Error('error: ' + error);
    }
  }

  /**
   * Middlewares o funciones: que se ejecutan para que realicen algo
   * Es una fucnión que sirve para hacer algo (x acción) antes de que dar una respuesta
   */
  middlewares() {
    /**
     * use es la palabra clave use para decir que se usa un middleware
     * los cors son peticiones que se hacen a otro servidor, está prohibio que se hagan a un servidor ajeno
     * al de la aplicació, el CORS es el que regula o hace que esto sea posible y no haya problemas
     */
    //crea un middleware de la ibrería importada cors para poder dejar al servidor hacer peticiones fuera de donde está alojado el servidor
    this.app.use(cors());

    //middleware que sirve para poder mandar información desde el front al servidor/backend
    //cualquier información la va serializar en formato JSON
    //sirve para serializar el body en formato JSON, ya que si no se pone cuando se solicita la info desde el req.body manda undefined
    this.app.use(express.json());

    //Sirve para decir que donde se va a direccionar es a la carpeta public, se puede poner otro nombre, pero es recomendable este
    //Es donde se van a crear los archivos de tipo front como html, vue, angular etc
    this.app.use(express.static("public"));

    //carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  /**
   * Esta función sirve para crear un middleware (use) y se manda llamar a la ruta y donde están las rutas '../routes/user'
   */
  routes() {
    /**
     * se aplica un middleware donde se pasa una ruta (this.usuariosPath) donde está ubicadas las rutas
     * y se manda llamar a require('../routes/user')
     */
    this.app.use(this.paths.authPath, require("../../routes/auth")); //se define la ruta de authPath haciendo el require de la ruta ../routes/auth
    // this.app.use(this.paths.buscarPath, require("../../routes/buscar"));
    this.app.use(this.paths.categoriasPath, require("../../routes/catalogos/categorias"));
    // this.app.use(this.paths.coloniasPath, require("../../routes/catalogos/colonias"));
    // this.app.use(this.paths.estadosPath, require("../../routes/catalogos/estados"));
    // this.app.use(this.paths.movimientosPath, require("../../routes/gastos/movimientos"));
    // this.app.use(this.paths.paisesPath, require("../../routes/catalogos/paises"));
    this.app.use(this.paths.personasPath, require("../../routes/procesos/personas"));
    this.app.use(this.paths.productosPath, require("../../routes/catalogos/productos"));
    // this.app.use(this.paths.uploadsPath, require("../../routes/uploads"));
    this.app.use(this.paths.usuariosPath, require("../../routes/procesos/usuarios"));
  }

  /**
   * Esta función sirve para hacer escuchar al servidor en el puerto que se estableció en process.env.PORT
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor ejecutandose en puerto: ", this.port);
    });
  }
}

//se exporta la clase completa
module.exports = Server;