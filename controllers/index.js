let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let UserModel = require('../models/user');
let User = UserModel.userModel; //alias


//create user model instance
let BusinessModel = require('../models/bussiness');
let Business = BusinessModel.businessModel; //alias


module.exports.displayHomePage = (req, res) => {
    req.body = {
        username: 'abc',
        name: 'abc',
        password: 'abc',
        email: 'abc@gmail.com'
    }
    // processRegisterPage(req, res);
    res.render('pages/home', { title: 'Express' });
}

module.exports.displayAboutPage = (req, res) => {
    res.render('pages/about', { title: 'Express', displayName: req.user ? req.user.name : '' });
}

module.exports.displayContactPage = (req, res) => {
    res.render('pages/contact', { title: 'Express', displayName: req.user ? req.user.name : '' });
}

module.exports.displayProjectsPage = (req, res) => {
    res.render('pages/projects', { title: 'Express', displayName: req.user ? req.user.name : '' });
}

module.exports.displayServicesPage = (req, res) => {
    res.render('pages/services', {
        title: 'Express',
        displayName: req.user ? req.user.name : ''
    });
}

module.exports.displayBusinessPage = (req, res) => {

    Business.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.render('pages/business',
                {
                    data: data || [],
                    title: 'Business',
                    displayName: req.user ? req.user.name : ''
                });
        }
    })

}

/* GET Login page. */
module.exports.displayLoginPage = (req, res, next) => {
       req.body = {
        username: 'abc',
        name: 'abc',
        password: 'abc',
        email: 'abc@gmail.com'
    }
    processRegisterPage(req, res);
    //check if user has already logged in
    if (!req.user) {
        return res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginmessage'),
                displayName: req.user ? req.user.name : ''
            })
    }
    else {
        return res.redirect('/');
    }
    // res.render('index', { title: 'Login' });
}
/*Process Login Page*/
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        {
            failureFlash: true
        },
        (err, userModel, info) => {
            //server err?
            if (err) {
                return next(err);
            }
            //is there a user login error?
            if (!userModel) {
                res.locals.displayName = req.user ? req.user.name : '';
                return res.render('auth/login',
                    {
                        title: "Login",
                        messages: 'Authentication Error: ' + info.message,
                        displayName: req.user ? req.user.name : ''
                    });
            }
            req.login(userModel, (err) => {
                //server err?
                if (err) {
                    return next(err);
                }
                return res.redirect('/business');
            });
        })(req, res, next);
}


/*process Logout*/
module.exports.processLogout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
}



/* Process Register page */
processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error:", err.message);
        }
        else {
            //if no error exists then registration is successful
            return passport.authenticate('local')(req, res, () => {
                return res.redirect('login');
            });
            return res.redirect('login');
        }
    });

}

/* GET business edit page.  */
module.exports.displayEditBusinessPage = (req, res, next) => {
    Business.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const dataEdit = {
                contact_number: data[0].contact_number,
                email: data[0].email,
                name: data[0].name,
                title: data[0].title,
            }
            return res.render('pages/business_edit',
                {
                    id: req.params.id,
                    contact_number: data[0].contact_number,
                    email: data[0].email,
                    name: data[0].name,
                    title: data[0].title,
                    displayName: ''
                });

        }
    })

}


/* GET business edit page.  */
module.exports.processEditBusiness = (req, res, next) => {
    Business.updateOne({
        _id: req.params.id
    }, req.body, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            return res.redirect('/business');
        }
    });
}



/* GET business add page.  */
module.exports.displayAddBusinessPage = (req, res, next) => {
    return res.render('pages/business_add',
        { title: 'Express', displayName: req.user ? req.user.name : '' });
}

/* Process Register page */
module.exports.processAddBusiness = (req, res, next) => {
    let newBusiness = new Business({
        contact_number: req.body.contact_number,
        email: req.body.email,
        name: req.body.name,
        title: req.body.title,
    });
    Business.insertMany(newBusiness, (insertError) => {
        if (insertError) {
            return res.redirect('/business');
        } else {
            return res.redirect('/business');
        }
    });

}

/* Process Register page */
module.exports.deleteBusiness = (req, res, next) => {
    Business.findOneAndDelete({
        _id: req.params.id
    }, function (err, data) {
        return res.redirect('/business');
    });
}
