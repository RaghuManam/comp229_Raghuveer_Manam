let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');

let indexController = require('../controllers/index.js');

//helper function for gaurd purposes
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', function (req, res) {
    return res.redirect('/');
});

/* GET route for displaying the Login page. */
router.get('/login', indexController.displayLoginPage);

/* GET route for processing the Login page. */
router.post('/login', indexController.processLoginPage);

/* GET route for processing the Logout page. */
router.get('/logout', indexController.processLogout);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);


/* GET Bussiness page. */
router.get('/bussiness', requireAuth, indexController.displayBussinessPage);

/* Redirect from contact page. */
router.get('/postcontact', function (req, res) {
    return res.redirect('/');
});


module.exports = router;
