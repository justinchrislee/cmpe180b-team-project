const passport = require('passport');

module.exports = app => {
    app.post('/auth/login', (req, res) => {
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' })(req, res);
    });
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};