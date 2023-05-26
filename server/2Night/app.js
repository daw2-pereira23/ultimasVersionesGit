const dotenv = require('dotenv')

const Server = require('./models/server.js')
const session = require('express-session');

dotenv.config()

const server = new Server()

server.listen()
