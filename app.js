var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//including the index.js file(routing-inbuild)
var index = require('./routes/index');
//including the users.js file(routing-userdefined)
var users = require('./routes/users');
//create application using the express framework
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//invoking methods from connection.js(database creation)
var connection = require('./connection');
//invoking routing methods from modelroutes.js(page routing)
var routes = require('./routes/modelroutes');

//initiate the connection
connection.init();
routes.configure(app);
// specify the desired portnumner
var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//exporting app to use in other files
module.exports = app;
