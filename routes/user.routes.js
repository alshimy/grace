const router = require('express').Router();
const userController = require('../controllers/Auth/user.controller');
const check = require('express-validator').check;
const authGuards = require('./guards/auth.guards');
const bodyParser = require('body-parser');

router.get('/login', authGuards.isNotAuth, (req, res, next) => {
    res.render('users/login', {
        isUser: req.session.userID
    });
});
router.get('/register', authGuards.isNotAuth, (req, res, next) => {
    res.render('users/register', {
        isUser: req.session.userID
    });
});

router.post('/login',
    authGuards.isNotAuth,
    bodyParser.urlencoded({ extended: false }),
    check('email').notEmpty().withMessage('Email field is required!').isEmail().withMessage('Email not valid!'),
    check('password').notEmpty().withMessage('Password field is required').isLength({ min: 6, max: 12 }).withMessage('Password Length from 6 to 12!'),
    userController.postLoginUser);

router.post('/register',
    authGuards.isNotAuth,
    bodyParser.urlencoded({ extended: false }),
    check('firstName').notEmpty().withMessage('First name field is required!'),
    check('lastName').notEmpty().withMessage('Last Name is required!'),
    check('email').notEmpty().withMessage('Email field is required!').isEmail().withMessage('Email not valid!'),
    check('password').notEmpty().withMessage('Password field is required').isLength({ min: 6, max: 12 }).withMessage('Password Length from 6 to 12!'),
    userController.postNewUser);
    
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
});



module.exports = router;