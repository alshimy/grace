exports.isNotAuth = (req, res, next) => {
    if (!req.session.userID) next();
    else res.redirect('/');
}
exports.isAuth = (req, res, next) => {
    if (req.session.userID) next();
    else res.redirect('/');
}

exports.isAdmin = (req, res, next) => {
    if (req.session.adminID) next();
    else res.redirect('/custom/login');
}
exports.isNotAdmin = (req, res, next) => {
    if (req.session.adminID) next();
    else res.redirect('/custom/login');
}
exports.isNotAuthAdmin = (req, res, next) => {
    if (!req.session.adminID) next();
    else res.redirect('/custom');
}