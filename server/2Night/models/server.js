const  express =  require('express')
const { dbConnection } =  require('../database/config.js')
const  cors  =  require('cors')
const session = require('express-session');

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000

    this.app.use(session({
      secret: 'mi_secreto', // Cambia esto por una cadena de caracteres segura y aleatoria
      resave: false,
      saveUninitialized: false
    }));

    this.paths = {
      usuarios: '/api/usuarios' ,
      discotecas: '/api/discotecas',
      noticias: '/api/noticias'
    }

    this.conectarDB()

    this.middlewares()

    

    this.routes()
  }

  async conectarDB() {

    await dbConnection()

  }

  middlewares() {

    this.app.use( cors() )

    this.app.use( express.json() )

  }

  routes() {

    this.app.use( this.paths.usuarios, require('../routes/usuarios'))
    this.app.use( this.paths.discotecas, require('../routes/discotecas'))
    this.app.use( this.paths.noticias, require('../routes/noticias'))

  }

  listen() {

    this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto ', this.port);
    })

  }
 
}



module.exports = Server