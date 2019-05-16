// =========================
// Token Verification
// =========================

const jwt = require('jsonwebtoken')

let tokenVerification = ( req, res, next ) => {
  let token = req.get('token')

  jwt.verify( token, process.env.SEED, (err, decoded) => {
    if ( err ) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Invalid token'
        }
      })
    }

    req.user = decoded.user
    next()
  })
}



// =========================
// Role Verification
// =========================

let roleVerification = ( req, res, next ) => {
  let user = req.user

  if ( user.role !== 'ADMIN_ROLE' ) {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'User has to be admin'
      }
    })
  }

  next()
}


module.exports = {
  tokenVerification,
  roleVerification
}