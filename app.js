const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer= require("multer")
const multiPart=multer().none();

const indexRouter= require("./routes/index.route")
const signupRouter= require("./routes/signup.route")
const loginRouter= require("./routes/login.route")
const companyRouter= require("./routes/company.route")
const userRouter= require("./routes/user.route")
const tokenService=require("./services/token.service")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multiPart)

app.use("/",indexRouter)
app.use("/api/signup",signupRouter)
app.use("/api/login",loginRouter)

app.use(async(request,response,next)=>{
  const isVerified= await tokenService.verifyToken(request)
  if(isVerified.isVerify)
    
    {
      // console.log(isVerified.isVerify)
      next();
    }
    else{
      response.status(401)
      response.json({
        message: "Authenticaton decliined"
      })
    }
  })
  app.use("/api/private/company",companyRouter)
  app.use("/api/private/user",userRouter)
  
  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
