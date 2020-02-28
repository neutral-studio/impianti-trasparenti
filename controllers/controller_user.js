/* Definizione delle funzioni disponibili per il lato user dell'applicazione */
const User =  require ('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.get_home = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina home (home.ejs) */
    res.status(200).render('home');
};

exports.get_login = (req, res) => {
    res.status(200).render('login');
};

exports.post_login = (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
       // failureFlash: true
    })(req, res, next);
};

exports.get_register = (req, res) => {
    res.status(200).render('register');
};

exports.post_register = async (req, res) =>{
   //TODO error message
    if(req.body.password[0] === req.body.password[1] ){
        
        
        if(emailIsValid(req.body.mail)){
                /*Check if account is already stored*/ 

                User.findOne({mail: req.body.mail}).then(user =>{
                    if(user){
                           /*Account already on db*/
                           res.render("login");
                      }else{
                        
                          const newUser = new User({
                              mail: req.body.mail,
                              password:req.body.password[0]
                          });
                          bcrypt.genSalt(10, (err, salt) =>{
                          bcrypt.hash(newUser.password, salt, (err, hash) => { 
                             if(err){res.render("404")};
                             /*PWD TO HASHED*/
                             newUser.password = hash;
                             newUser.save()
                               .then(user =>{
                                   console.log('Impianti-Trasparenti | Nuovo utente creato ' + newUser);
                                   /*REDIRECT*/
                                   res.redirect('/user/login');
                               })
                               .catch(err => console.log(err));
                         });
   
                          
                       });
   
   
          }
                   });
        }

        else{
            /*email invalida*/
            res.render("register");
            
        }
    }
    else{
        
        res.render("register");
    }

};

/*Test validita' email inserita*/
function emailIsValid (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  }

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


