const { Router } = require("express");
const { noticiasGet, noticiasPost, noticiasPut, noticiasDelete } = require("../controllers/noticias.js");


const router = Router()

router.get('/', noticiasGet)

router.post('/create', noticiasPost)

router.put('/update/:id', noticiasPut)

router.delete('/delete/:id', noticiasDelete)

module.exports = router