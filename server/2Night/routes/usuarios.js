const { Router } = require("express");
const { usuariosGet, usuariosGetDeletedUsers, usuariosPost, usuariosPut, usuariosDelete, login } = require("../controllers/usuarios");


const router = Router()

router.get('/', usuariosGet)

router.get('/deletedUsers', usuariosGetDeletedUsers)

router.post('/create', usuariosPost)

router.post('/login', login)

router.put('/update/:id', usuariosPut)

router.delete('/delete/:id', usuariosDelete)

module.exports = router