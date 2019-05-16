const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user')
const { tokenVerification, roleVerification } = require('../middlewares/authentication')

const app = express();


// GET
app.get('/user', tokenVerification, (req, res) => {

  let from = req.query.from || 0
  from = Number(from)

  let limit = req.query.limit || 5
  limit = Number(limit)

  User.find({ status: true }, 'name email role status google img')
    .skip(from)
    .limit(limit)
    .exec( (err, users) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      User.count({ status: true }, (err, counter) => {

        res.json({
          ok: true,
          users,
          length: counter
        })
      })


    })
});

// POST
app.post('/user', [tokenVerification, roleVerification], (req, res) => {
  let body = req.body

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync( body.password, 10 ),
    role: body.role
  })

  user.save( (err, userDB ) => {
    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      user: userDB
    })
  })


});

// PUT
app.put('/user/:id', [tokenVerification, roleVerification], (req, res) => {

  let id = req.params.id
  let body = _.pick( req.body, ['name', 'email', 'img', 'role', 'status'])

  User.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, userDB) => {

    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      user: userDB
    });
  })
});

// DELETE
app.delete('/user/:id', [tokenVerification, roleVerification], (req, res) => {

  let id = req.params.id

  let changeStatus = {
    status: false
  }

  User.findByIdAndUpdate( id, changeStatus, { new: true }, (err, userDeleted) => {

    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    if (!userDeleted) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'User not found'
        }
      })
    }

    res.json({
      ok: true,
      user: userDeleted
    })

  })

});

module.exports = app