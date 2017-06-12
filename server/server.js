// PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var Router = require('react-router').Router;
// IMPORTS //
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');

// CREATE APP //
var app = express();

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));

// ROUTES //
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.get('*', function (req, res) { // This wildcard method handles all requests

    Router.run(routes, req.path, function (Handler, state) {
        var element = React.createElement(Handler);
        var html = React.renderToString(element);
        res.render('app', { content: html });
    });
});

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
