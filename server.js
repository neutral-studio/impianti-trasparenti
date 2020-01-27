/* Richiesta modulo esportato da app.js nella root */
const app = require('./app');

/* Importazione pacchetto mongoose per gestione DB */
const mongoose = require('mongoose');

/* Definizione porta di accesso per deploy e test in locale */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `IMPIANTI-TRASPARENTI | Server started on port ${PORT} - use 'localhost:${PORT}`
  );
});

/* Impostazione Mongoose e Connessione a MongoDB Atlas - E' necessario disporre del file keys.js per poter accedere al DB */
let db = require('./config/keys').MongoURI;
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/* Se la connessione è andata a buon fine loggiamo a console il messaggio */
db.once('open', () => {
  console.log('IMPIANTI-TRASPARENTI | MongoDB Connected');
});
