const { response, request } = require("express");
const Noticias = require("../models/noticias.js");

const noticiasGet = async( req = request, res = response ) => {

    const query = { state: true }

    const [ noticias ] = await Promise.all([
        Noticias.find( query )])

    res.json({
        noticias 
    })
}

const noticiasPost = async ( req, res ) => {

    const { title, description, tags } = req.body
    const noticias = new Noticias({ title, description, tags})

    //Guarda en DB
    await noticias.save()

    res.json(noticias)

}

const noticiasPut = async ( req, res ) => {
    
    const { id } = req.params
    const { ...resto } = req.body

    const noticias = await Noticias.findByIdAndUpdate( id, resto )

    res.json(noticias)

} 

const noticiasDelete = async ( req, res ) => {

    const { id } = req.params
    
    const noticias = await Noticias.findByIdAndUpdate( id, { state: false } )

    res.json({noticias})
}

module.exports = {
    noticiasGet,
    noticiasDelete,
    noticiasPost,
    noticiasPut
}