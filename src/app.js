const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// conectando a la db

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/personascf',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db conectada'))
    .catch(err => console.log(err));

// importar rutas

const indexRoutes = require('./routes/index');
const dniRoutes = require('./routes/dni');
const nommbreRoutes = require('./routes/nombre')

// configuración

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// rutas

app.use(indexRoutes,dniRoutes,nommbreRoutes);

// arranca el server

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})