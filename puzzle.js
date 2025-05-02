// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: 
const express = require('express');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: MIDDLEWARES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: MIDDLEWARES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: ROUTES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: MIDDLEWARE.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: MIDDLEWARE.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: MIDDLWARES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
routes.setup(app);
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: MIDDLEWARES.JS


// -------------------------------------------------------------------------------------


//Usado?: YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: ROUTES.JS


// -------------------------------------------------------------------------------------


//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: ROUTES.JS


// -------------------------------------------------------------------------------------

//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: MIDDLEWARES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: MIDDLEWARES.JS

// -------------------------------------------------------------------------------------


//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------


//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: APP.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación: ROUTES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: MIDDLEWARES.JS

// -------------------------------------------------------------------------------------

