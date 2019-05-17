
// =========================
// PORT
// =========================

process.env.PORT = process.env.PORT || 3000


// =========================
// ENV
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// =========================
// DB
// =========================

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
  urlDB = 'mongodb://localhost:27017/cafe'
} else {
  urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB


// =========================
// Expirate Token
// =========================
// 60 segundos
// 60 minutos
// 24 hs
// 30 días
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30


// =========================
// Authentication Seed
// =========================

process.env.SEED = process.env.SEED || 'development-seed'


// =========================
// Google clientID
// =========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '588362429171-9hn39njbboora2sp4f42hd1v22j74hec.apps.googleusercontent.com'