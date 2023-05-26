const { response, request } = require("express");
const Discoteca = require("../models/discoteca.js");

const discotecasGet = async( req = request, res = response ) => {

    const query = { state: true }

    const [ discotecas ] = await Promise.all([
        Discoteca.find( query )])

    res.json({
        discotecas 
    })
}

const discotecasPost = async ( req, res ) => {

    const { name, email, description, img, address, tags, longitude, latitude } = req.body
    const discoteca = new Discoteca({ name, email, description, img, address, tags, longitude, latitude })

    //Guarda en DB
    await discoteca.save()

    res.json(discoteca)

}

const discotecasPut = async ( req, res ) => {
    
    const { id } = req.params
    const { ...resto } = req.body

    const discoteca = await Discoteca.findByIdAndUpdate( id, resto )

    res.json(discoteca)

} 

const discotecasDelete = async ( req, res ) => {

    const { id } = req.params
    
    const discoteca = await Discoteca.findByIdAndUpdate( id, { state: false } )

    res.json({discoteca})
}


module.exports = {
    discotecasGet,
    discotecasDelete,
    discotecasPost,
    discotecasPut
}