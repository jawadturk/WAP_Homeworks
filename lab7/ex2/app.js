var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');



const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;


var app = express();


const decipher = crypto.createDecipher('aes256', 'asaadsaad');
let port = 7171;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'homework7';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/secret', function (req, res) {

  console.log('Getting The Secret!');

  MongoClient.connect(mongoUrl, function (err, client) {
    if (err) throw err;

    console.log("Connected to DB Server!");

    const db = client.db(dbName);
    db.collection('homework7').findOne({}, function (err, doc) {
      if (err) throw err;

      const encrypted = doc.message;
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      const resultM = 'The Secret is: ' + decrypted;

      // console.log(doc);

      console.log(resultM);
      res.send(resultM);

      client.close();

    });
    console.log('Called FindOne!');
  });

});
/* End */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log('The Server is running on port %s', port);
});
