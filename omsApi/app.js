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


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var port = 8080;
app.listen(port);
console.log("OMS-Api running in port " + port);

const cors = require('cors');
app.use(cors());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var paisRouter = require('./routes/paisRoutes');
app.use('/api/paises', paisRouter);

module.exports = app;

