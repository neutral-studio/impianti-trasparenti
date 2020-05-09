exports.adminCheck = (req, res, next) => {
    if (!req.user) {
      res.redirect('/err/403');
    } else if (req.user.role < 1) {
      res.redirect('/err/403');
    } else if(!req.user.isOnBoard) {
      res.redirect('/onboarding');
    } else {
      next();
    }
  };
  
  exports.userCheck = (req, res, next) => {
    if (!req.user) {
      res.redirect('/err/403');
    } else if(!req.user.isOnBoard) {
      res.redirect('/user/onboarding');
    } else {
      next();
    }
  };

  exports.customOnboardCheck = (req, res, next) => {
    if(!req.user) {
      res.redirect('/err/403');
    } else {
      next();
    }
  }
