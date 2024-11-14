var express = require('express');
var app = express();
var path = require('path');

// var mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect('');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API routes
var virusRoutes = require('./routes/virus'); //rotas
app.use('/api/virus', virusRoutes); //endpoint

var recomendacoesRoutes = require('./routes/recomendacoes'); //rotas
app.use('/api/recomendacoes', recomendacoesRoutes); //endpoint

var port = 8080;
app.listen(port);
console.log(" ==> OMS-Api running in port: " + port + "\n");

// const cors = require('cors');
// app.use(cors());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;

