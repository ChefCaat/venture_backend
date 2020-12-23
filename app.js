const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const helmet = require("helmet");
const winston = require('winston'),
  expressWinston = require('express-winston');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');



//declare routers
const indexRouter = require('./routes/index');
const newsletterRouter = require('./routes/newsletter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));


app.use('/', function (req, res, next) {
  console.log(req.body);
  next();
});

app.use('/', indexRouter);
app.use('/newsletter', newsletterRouter);

app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

app.use(errorMiddleware);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
