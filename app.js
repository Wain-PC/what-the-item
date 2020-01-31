var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const proxy = require("http-proxy-middleware");
var ws = require('./ws');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

ws();

app.use('/ws', proxy({target: "http://localhost:3334", ws: true}));

module.exports = app;
