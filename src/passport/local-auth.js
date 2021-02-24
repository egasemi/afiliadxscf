const passport = require('passport');
const Afiliadx = require('../models/Afiliadx');

passport.serializeUser((afiliadx, done) => {
    done(null, afiliadx.id)
});

passport.deserializeUser(async (id, done) => {
    const afiliadx = await Afiliadx.findById(id);
    done(null, afiliadx)
});


const localStrategy = require('passport-local').Strategy;

passport.use('local-signin', new localStrategy({
    usernameField: 'dni',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, dni, password, done) => {
    const afiliadx = await Afiliadx.findOne({dni:dni})
    afiliadx.password = afiliadx.encryptPassword(password);
    await afiliadx.save()
    done(null, afiliadx)
}))

passport.use('local-login', new localStrategy({
    usernameField: 'dni',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, dni, password, done) => {
    const afiliadx = await Afiliadx.findOne({dni:dni})
    if(!afiliadx) {
        return done(null, false, req.flash('loginMessage', 'Usuarix no encontrado'))
    } 
    if(!afiliadx.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Contraseña invalida'))
    }
    console.log('pasó')
    done(null, afiliadx)
}))

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() || req.user.dni === 37145336){
        return next()
    }
    res.redirect('/login')
}

module.exports = isAuthenticated, isAdmin