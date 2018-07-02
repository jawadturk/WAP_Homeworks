var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');



const validator = require('express-validator');


var app = express();

let port = 4477;



app.set('env', 'development');
app.enable('trust proxy');
app.enable('case sensitive routing');
app.set('strict routing', true);
app.set('x-powered-by', false);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());



class Grade {
  constructor(id, name, course, grade) {
    this.id = id;
    this.name = name;
    this.course = course;
    this.grade = grade;
  }
}
let gradesData = [];
gradesData.push(new Grade(1, 'Asaad Saad', 'CS572', 95));
gradesData.push(new Grade(2, 'Jawad El Turk', 'CS471', 100));



app.get('/grades', function (req, res) {
  console.log('Getting All Grades!');

  if (gradesData.length > 0) {
    res.status(200);
    res.json(gradesData);
  } else {
    res.status(204);
    res.send();
  }

});
app.delete('/grades/:gradeId', function (req, res, next) {
  console.log('Getting Grade by ID: ' + req.params.gradeId);
  gradesData = gradesData.filter(grd => grd.id != req.params.gradeId);
  res.status(200);
  res.json({ success: true });
  res.send();
});
app.get('/grades/:gradeId', function (req, res, next) {
  console.log('Getting Grade by ID: ' + req.params.gradeId);
  for (let grd of gradesData) {
    if (grd.id == req.params.gradeId) {
      res.status(200);
      res.json(grd);
      return;
    }
  }

  res.status(204);

  res.send();
});

app.post('/grades/add', function (req, res) {
  console.log('Checking Grade Parameters for PUT Update!');

  req.assert('id', 'Id is required').notEmpty();
  req.assert('name', 'name is required').notEmpty();
  req.assert('course', 'course is required').notEmpty();
  req.assert('grade', 'grade is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.status(422).json({ errors: errors });
  } else {
    const grade = new Grade(req.body.id, req.body.name, req.body.course, req.body.grade);
    console.log('Adding Current Grade: ' + grade.id);
    gradesData.push(grade);
    res.status(201).json(grade);
  }

});


// update example
app.put('/grades/update', function (req, res) {
  console.log('Checking Grade Parameters for POST Add!');

  req.assert('id', 'Id is required').notEmpty();
  req.assert('name', 'name is required').notEmpty();
  req.assert('course', 'course is required').notEmpty();
  req.assert('grade', 'grade is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.status(422).json({ errors: errors });
  } else {

    //Find index of specific object using findIndex method.    
    objIndex = gradesData.findIndex((obj => obj.id === req.body.id));

    //Log object to Console.
    console.log("ObjectIndex ", objIndex)
    console.log("Before update: ", gradesData[objIndex])
    // check if object exist
    if (objIndex >= 0) {
      //Update object
      gradesData[objIndex].name = req.body.name;
      gradesData[objIndex].course = req.body.course;
      gradesData[objIndex].grade = req.body.grade;
      res.status(201).json(gradesData[objIndex]);
    } else {
      //Insert new object
      const grade = new Grade(req.body.id, req.body.name, req.body.course, req.body.grade);
      console.log('Adding Current Grade: ' + grade.id);
      gradesData.push(grade);
      res.status(201).json(grade);
    }


  }

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  /*res.render('error');*/

  res.json({ message: err.message, returnCode: err.status || 500 });

});

app.listen(port, function () {
  console.log('The Server is running on port %s', port);
});


