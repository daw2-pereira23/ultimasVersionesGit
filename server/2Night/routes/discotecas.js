const { Router } = require("express");
const { discotecasGet, discotecasPost, discotecasPut, discotecasDelete } = require("../controllers/discotecas");


const router = Router()

router.get('/', discotecasGet)

router.post('/create', discotecasPost)

router.put('/update/:id', discotecasPut)

router.delete('/delete/:id', discotecasDelete)


module.exports = router