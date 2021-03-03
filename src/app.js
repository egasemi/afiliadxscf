const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./passport/local-auth');

// conectando a la db

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/personascf',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
    .then(db => console.log('db conectada'))
    .catch(err => console.log(err));

// importar rutas

const indexRoutes = require('./routes/index');
const dniRoutes = require('./routes/dni');
const nommbreRoutes = require('./routes/nombre');
const loginRoutes = require('./routes/login');
const singinRoutes = require('./routes/singin');
const listaRoutes  = require('./routes/lista');
const afiliadxRoutes = require('./routes/afiliadx');
const calleRoutes = require('./routes/calle');

// configuración

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SECRET || 'securesecret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.loginMessage = req.flash('loginMessage');
    next();
})

// rutas

app.use(indexRoutes,dniRoutes,nommbreRoutes, loginRoutes, singinRoutes, listaRoutes, afiliadxRoutes, calleRoutes);

// arranca el server

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})