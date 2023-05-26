const { Schema, model } = require('mongoose')

const NoticiasSchema = Schema({

  title: {
    type: String,
    required: [true, 'El título es obligatorio']
  },

  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },

  tags: {
    type: String
  },

  state: {
    type: Boolean,
    default: true
  },

})

module.exports = model('Noticias', NoticiasSchema)