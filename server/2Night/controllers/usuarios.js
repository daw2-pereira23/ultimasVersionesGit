const { response, request } = require("express");
const Usuario = require("../models/usuario.js");
const { genSaltSync, hashSync } = require("bcryptjs")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require("express-session");



const usuariosGet = async( req = request, res = response ) => {

    const query = { state: true }

    const [ usuarios ] = await Promise.all([
        Usuario.find( query )])

    
    const nombres = usuarios.map(usuario => usuario.name);
    const idUsuario = usuarios.map(usuario => usuario._id);
    const email = usuarios.map(usuario => usuario.email);
    const rol = usuarios.map(usuario => usuario.role);
    res.json({
        usuarios, nombres, email, rol, idUsuario
    })
}

const usuariosGetDeletedUsers = async( req = request, res = response ) => {

    const query = { state: false }

    const [ usuarios ] = await Promise.all([
        Usuario.find( query )])

    res.json({
        usuarios 
    })
}

const usuariosPost = async ( req, res ) => {

    const { name, email, password, rol } = req.body
    const usuario = new Usuario({ name, email, password, rol })

    //Encriptar la contraseña
    const salt = genSaltSync()
    usuario.password = hashSync( password, salt )
    //Guarda en DB
    await usuario.save()

    res.json(usuario)

}

const usuariosPut = async ( req, res ) => {
    
    const { id } = req.params
    const { _id, ...resto } = req.body

    if( resto.password ) {
        const salt = genSaltSync()
        resto.password = hashSync( resto.password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario)
} 

const usuariosDelete = async ( req, res ) => {

    const { id } = req.params
    
    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } )

    res.json({usuario})
}

const login = async ( req, res ) => {

    const { email, password  } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ 
                message : 'Usuario o contraseña incorrectos',
            });    
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                message : 'Usuario o contraseña incorrectos'
            });            }
        
           

        const token = jwt.sign({ userId: user._id }, 'holiwis');
        
        const rol = user.role
        const name = user.name
        const id = user.id
        req.session.user = {
            userId: user._id,
            rol: user.role,
            name: user.name
          };
        res.json({ "Usuario logueado y rol: " : user, token, rol, name, id, });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuariosGetDeletedUsers,
    login
}