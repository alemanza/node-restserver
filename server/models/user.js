const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: 'invalid {VALUE}'
}

let Schema = mongoose.Schema


let userSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'The name is required' ]
  },
  email: {
    type: String,
    unique: true,
    required: [ true, 'The email is required' ]
  },
  password: {
    type: String,
    required: [ true, 'The password is required' ]
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.toJSON = function() {
  let newUser = this
  let newUserObj = newUser.toObject()
  delete newUserObj.password

  return newUserObj
}

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique'} )

module.exports = mongoose.model( 'user', userSchema )