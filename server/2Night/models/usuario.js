const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },

  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  
  role: {
    type: String,
    default: "USER_ROLE"
  },

  state: {
    type: Boolean,
    default: true
  },

  google: {
    type: Boolean,
    default: false
  },

  coupons: {
    type: Number,
    default: 0
  }

})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)
