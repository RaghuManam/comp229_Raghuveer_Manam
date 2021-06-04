
module.exports.displayHomePage = (req, res) => {
    res.render('pages/home', { title: 'Express' });
}

module.exports.displayAboutPage = (req, res) => {
    res.render('pages/about', { title: 'Express' });
}

module.exports.displayContactPage = (req, res) => {
    res.render('pages/contact', { title: 'Express' });
}

module.exports.displayProjectsPage = (req, res) => {
    res.render('pages/projects', { title: 'Express' });
}

module.exports.displayServicesPage = (req, res) => {
    res.render('pages/services', { title: 'Express' });
}
