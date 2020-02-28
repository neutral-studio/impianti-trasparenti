/* Importazione Pacchetti necessari - Se non presenti lanciare 'npm i --save' per caricare come da package.json*/
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sslRedirect = require('heroku-ssl-redirect');

/* Definizione app */
const app = express();

/* Importazione Router */
const router_user = require('./routes/router_user');
const router_admin_impiantos = require('./routes/router_admin_impiantos');
const router_admin_society = require('./routes/router_admin_society');
const router_admin = require('./routes/router_admin');
const router_admin_resps = require('./routes/router_admin_users');
const router_basic = require('./routes/router_basic');
const router_impianti = require('./routes/router_impianti');
const router_error = require('./routes/router_error');

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
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

/* Impostazione del motore di rendering - Non è quindi necessario specificare l'estensione dei file nel 'res.render('nomeFile)' */
app.set('view engine', 'ejs');

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
app.use('/user', router_user);
app.use('/err', router_error);
app.use('/impianti', router_impianti);
app.use('/', router_basic);
/* Esportazione modulo app per l'utilizzo in server.js */
module.exports = app;