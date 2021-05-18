const passport = require('passport');
const Persona = require('../models/Persona');

passport.serializeUser((persona, done) => {
    done(null, persona.id)
});

passport.deserializeUser(async (id, done) => {
    const persona = await Persona.findById(id);
    done(null, persona)
});


const localStrategy = require('passport-local').Strategy;

passport.use('local-signin', new localStrategy({
    usernameField: 'dni',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, dni, password, done) => {
    const persona = await Persona.findOne({dni:dni})
    persona.password = persona.encryptPassword(password);
    await persona.save()
    done(null, persona)
}))

passport.use('local-login', new localStrategy({
    usernameField: 'dni',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, dni, password, done) => {
    const persona = await Persona.findOne({dni:dni})
    if(!persona) {
        return done(null, false, req.flash('loginMessage', 'Usuarix no encontrado'))
    }
    if(persona.password === undefined) {
        return done(null, false, req.flash('loginMessage', 'Persona sin acceso'))
    }
    if(!persona.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Contraseña invalida'))
    }
    done(null, persona)
}))

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next()
    }
    //res.redirect('/login')
    return next()
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.id === "60302e7d177b55a07fa95670"){
        return next()
    }
    res.redirect('/login')
}

module.exports = isAuthenticated, isAdmin