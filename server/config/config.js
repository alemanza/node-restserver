
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
  urlDB = 'mongodb+srv://sarlanga:P6PtaKm08sNeD2nr@cluster0-rlopy.mongodb.net/caffe'
}

process.env.URLDB = urlDB