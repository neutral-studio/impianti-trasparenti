/* Importazione Pacchetti necessari - Se non presenti lanciare 'npm i --save' per caricare come da package.json*/
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sslRedirect = require('heroku-ssl-redirect');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const session = require('express-session');
const keys = require('./config/keys');

/* Definizione app */
const app = express();

/* Importazione Router */
const userRouter = require('./routes/router_user');

/* Costanti utils */
const path = require('path');

/* Middlewares di base */
app.use(sslRedirect());
app.use(express.static(__dirname + '/public'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/*app.use(session({
    secret: 'Amistad',
    resave: true,
    saveUninitialized: true,
}));
*/
app.use(passport.initialize());
app.use(passport.session());
/*
app.use(flash());

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.console_msg = req.flash('errorr_msg');
    next();
});
*/

/* Impostazione del motore di rendering - Non è quindi necessario specificare l'estensione dei file nel 'res.render('nomeFile)' */
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

/*Initializing passport*/
app.use(passport.initialize());
app.use(passport.session());

/* Impostazione del middleware di body-parser - Ci permette di ottenere un oggetto dalla POST di un form HTML debitamente costruito */
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

/* Richiamo dei diversi router precedentemente importati */

app.use('/admin/impianti', router_admin_impiantos);
app.use('/admin/society', router_admin_society);
app.use('/admin/resps', router_admin_resps);
app.use('/admin', router_admin);
app.use('/err', errorRouter);
app.use('/user', userRouter);
app.use('/', basicRouter);

/* Esportazione modulo app per l'utilizzo in server.js */
module.exports = app;
