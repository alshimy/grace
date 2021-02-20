const validatorResult = require('express-validator').validationResult;

exports.postLoginUser = (req, res, next) => {
    if (!validatorResult(req).array().length > 0) {
        if (req.body.password === '12345678') {
            req.session.adminID = 'done';
            res.redirect('/custom');
        }
        else {
            res.render('admin/loginAdmin', {
                err: 'password not correct',
                isAdmin: req.session.adminID
            });
        }
    }
    else {
        res.render('admin/loginAdmin', {
            err: 'password not correct',
            isAdmin: req.session.adminID
        });
    }
}
