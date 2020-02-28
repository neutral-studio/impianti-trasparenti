/* Definizione delle funzioni disponibili per il lato user dell'applicazione */
exports.get_home = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina home (home.ejs) */
    res.status(200).render('home');
};

exports.get_login = (req, res) => {
    res.status(200).render('login');
};
exports.get_register = (req, res) => {
    res.status(200).render('register');
};

exports.get_about = (req, res) => {
    res.render('about');
};

exports.get_admin = (req, res) => {
    res.render('admin');
};

exports.get_superUser = (req, res) => {
    res.render('superUser');
};

exports.get_user = (req, res) => {
    res.render('user');
};


exports.get_logout = (req, res) => {
    res.send("Logging out");
};