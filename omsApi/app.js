var express = require('express');
var app = express();
var path = require('path');

// MongoDB connection
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
try {
  mongoose.connect('mongodb+srv://u24t05:estaeapassword@upskilldb.hlsqn.mongodb.net/oms_db');
  console.log(' ==> Connected to MongoDB');
}
catch (err) {
  console.log(' ==> Error connecting to MongoDB');
  console.log(err);
}

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API routes
var virusRoutes = require('./routes/virusRoutes'); //rotas
app.use('/api/virus', virusRoutes); //endpoint

var recomendacoesRoutes = require('./routes/recomendacoesRoutes'); //rotas
app.use('/api/recomendacoes', recomendacoesRoutes); //endpoint

var paisRouter = require('./routes/paisRoutes');
var zonaRouter = require('./routes/zonaRoutes');
app.use('/api/paises', paisRouter);
app.use('/api/zonas', zonaRouter);




var port = 8080;
app.listen(port);
console.log(" ==> OMS-Api running in port: " + port + "\n");

// const cors = require('cors');
// app.use(cors());

// var indexRouter = require('./routes/index');
// app.use('/', indexRouter);

module.exports = app;

