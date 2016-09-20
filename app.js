var g = require('./global');
var app = g.express();

// view engine setup
app.set('views', g.path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(g.logger('dev'));
app.use(g.bodyParser.json());
app.use(g.bodyParser.urlencoded({ extended: false }));
app.use(g.cookieParser());
app.use(g.express.static(g.path.join(__dirname, 'public')));

app.get('/get', g.get);
app.get('/*', g.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('_error', {
            message: err.message,
            error: err
        });
    });

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('_error', {
      message: err.message,
      error: err
    }); 
  });

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('_error', {
      message: err.message,
      error: err
    });
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('_error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
