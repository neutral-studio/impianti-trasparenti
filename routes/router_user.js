const passport = require('passport');
/* Importazione pacchetti necessari */
const express = require('express');
const controller_user = require('./../controllers/controller_user');



/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/user' */
router.route('/').get(controller_user.get_home);

/*Redirecting to the home route*/
router.route('/index').get((req, res) => {
    res.redirect('/');
});

/*Redirecting to the home route*/
router.route('/home').get((req, res) => {
    res.redirect('/');
});

/* Login page */
router.route('/login').get(controller_user.get_login).post(controller_user.post_login);
router.route('/register').get(controller_user.get_register).post(controller_user.post_register);
router.route('/about').get(controller_user.get_about);
router.route('/logout').get(controller_user.get_logout);
router.route('/admin').get(controller_user.get_admin);
router.route('/superUser').get(controller_user.get_superUser);
router.route('/basicUser').get(controller_user.get_user);


/*using passport*/
//TODO Integrate google login in controller
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    switch(req.user.role) {
        case 0:
          res.redirect("/user/admin")
          break;
        case 1:
            res.redirect("/user/superUser")
          break;
        case 2:
            /*/user/basicUser*/
            /*URI changed for presentation*/
            res.redirect("/admin/dashboard")
            break;
        default:
         res.redirect("/err/404")
      }

});



/* Esportazione modulo router per app.js */
module.exports = router;

