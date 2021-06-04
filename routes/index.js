let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index.js');

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', function (req, res) {
    return res.redirect('/');
});

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* Redirect from contact page. */
router.get('/postcontact', function (req, res) {
    return res.redirect('/');
});

module.exports = router;
