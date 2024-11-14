var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.set('strictQuery', true);

try {
	mongoose.connect('mongodb+srv://ebmarque:ebmarque@ebmarque.udfns.mongodb.net/OMS_API');
	console.log('Conexão com a base de dados estabelecida com sucesso.')
} catch (err) {
	console.log('Error ao conectar com a base de dados:' + err);
}

var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://leilaticiane1:leila@cluster0.snjbq.mongodb.net/omsApi');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var port = 8080;
app.listen(port);
console.log("OMS-Api running in port " + port);

const cors = require('cors');
app.use(cors());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var paisRouter = require('./routes/paisRoutes');
var zonaRouter = require('./routes/zonaRoutes');
app.use('/api/paises', paisRouter);
app.use('/api/zonas', zonaRouter);
// var indexRouter = require('./routes/index');
// app.use('/', indexRouter);

var SurtoRoutes = require('./routes/surtosRoute');
app.use('/api/surtos/', SurtoRoutes);


module.exports = app;

