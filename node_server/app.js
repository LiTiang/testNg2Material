
var express      = require('express');
var path         = require('path');
var pg      = require('pg');
//var favicon      = require('serve-favicon');
var logger       = require('morgan');
////var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes/index'); // Get routing system, index.js
var app          = express();
var connectionString = require(path.join(__dirname, 'config'));
var timexe = require('timexe');
// view engine setup
//app.set('views', path.join(__dirname, 'views')); // location of view dir  ??????????
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist'))); // serves all the frontend app code
app.use('/app', express.static(path.join(__dirname, '../dist/app')));
//app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// uncomment after placing your favicon in /public
// the  func each locate in follow 5 app.use
// will be executed for every request to the app.
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use('/', routes);// process if url = [host]/ or [host]
app.use('/', routes);

// execute everyday at 12:30, 9:30
timexe('* * * 0 30', resetDB); timexe('* * * 21 30', resetDB);

function resetDB() {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    client.query("DELETE FROM unpaidlist;");
    client.query("DELETE FROM paidlist;");
    client.query("ALTER SEQUENCE unpaidlist_id_seq RESTART;");
    client.query("ALTER SEQUENCE paidlist_id_seq RESTART;");
    client.query("UPDATE system_status set menu_verified = false;");
  });
}

//app.use('/ordered', routes); // why i use this, but after refresh, /ordered still cant not found ?????
// app.use('/unpaid', routes);
// app.use('/menu', routes);
// app.use('/ordering', routes); // process if url = [host]/ordering

// catch 404 and forward to error handler
// ------------------------------------------
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// ------------------------------
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// ------------------------------
// app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
