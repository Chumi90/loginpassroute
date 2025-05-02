// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: APP.JS requerimos dentro de app.js las constantes validarPalabraMiddleware, verificarSesionMiddleware, setupAPP,

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: APP.JS parsemaos los datos introducidos por el usuario dentro del formulario

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: APP.JS requerimos a express sessions su configuración

// -------------------------------------------------------------------------------------

//Usado?: 
const express = require('express');
//--- Explicación: APP.JS requerimos la configuración de express

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: MIDDLEWARES.JS parsemaos los datos introducidos por el usuario dentro del formulario

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: MIDDLEWARES.JS requerimos a express sessions su configuración

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: APP.JS requerimos la contraseña configurada

// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: ROUTES.JS  requerimos dentro de app.js las constantes validarPalabraMiddleware, verificarSesionMiddleware, setupAPP,

// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación: APP.JS requerimos la cosntante setup

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: MIDDLEWARE.JS obentemos el valor de la contraseña que vamos a comparar

// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación: APP.JS ejecutamos el servidor express

// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación: APP.JS constante de configuración del puerto

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: MIDDLEWARE.JS requerimos la contraseña configurada

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: MIDDLWARES.JS obentemos el valor de la contraseña que vamos a comparar

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: APP.JS ejecutamos a los datos almacenados dentro del middleware en concreto a la variable
//setAPP que continen la función app para que se ejecute viene predeficina con una contraseña incorrecta.

// -------------------------------------------------------------------------------------

//Usado?: YES
routes.setup(app);
//--- Explicación: APP.JS ejecutamos el setup de routes para que se ejecute la función para comparar si es correcta la clave

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
/* Comparación de la clave secreta y la aportada por el usuario si es correta pasa al siguiente estado
  Si no es correcta emite un error del tipo 1
*/
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
/* Comprueba si la palabra introducida es correcta o no, si es correcta pasa al perfil de usuario
   Si no es correcta pide nuevamente la contraseña
*/
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
/* Visualización de la página de inicio mostrando el mensaje de error al introducer la contraseña*/
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
/*  se codifican los datos de la url
    no se salva la sesión para un futuro.
*/
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
/* Perfil del usuario  
*/
// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: APP.JS
// ejecutamso el uso del parse adherido al body codificando los datos
// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: APP.JS
// se codifican los datos de la url
// no se salva la sesión para un futuro.
// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: APP.JS
// escuchamos el puerto de salida del servidor para comprobar el funcionamiento de este
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
// si la palabra secreeta es correcta devulve true y por tanto continúa con la ejecución sino devuelve un error
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
// obtiene los datos para la ruta del perfil con su HTML
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
// Devolución de un error producido al cerrar la sesión
// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación: ROUTES.JS
// exportación de los datos del routes.js
// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: MIDDLEWARES.JS
// exportación de los datos del middlewares.js
// -------------------------------------------------------------------------------------

