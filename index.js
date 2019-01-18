'use strict';
require('dotenv').config();

// パッケージの読み込み
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debugServer = require('debug')('app:server');
const app = express();
const server = require('http').Server(app);
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');

// ルーターの読み込み
const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');
const logoutRouter = require('./routes/logout');

// モデルを読み込み
const Users = require('./models/users');

// パスポート処理
const GitHubStrategy = require('passport-github2').Strategy;
passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((obj, done)=>{
  done(null, obj);
});
passport.use(new GitHubStrategy(
  {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done)=>{
    process.nextTick(()=>{
      Users.update({id: profile.id}, {id: profile.id, username: profile.username}, {upsert: true}, ()=>(done(null, profile)));
    })
  }
));

// ポートの設定
const port = process.env.PORT || '8000';
app.set('port', port);

// ビューエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ミドルウェアの設定
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

// ルート設定
app.use('/', indexRouter);
app.use('/todo', todoRouter);
app.use('/logout', logoutRouter);
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res)=>{});
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res)=>(res.redirect('/')));

// 404ハンドラー
app.use((req, res, next)=>{
  next(createError(404));
});

// エラーハンドラー
app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ポート待機
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * HTTPサーバーエラーハンドラー
 * @param {string} error エラー
 */
function onError(error){
  if(error.syscall !== 'listen'){
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port '+ port;
  switch(error.code){
    case 'EACCES':
      console.error(bind + ' ');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * HTTPサーバーリスナーハンドラー
 */
function onListening(){
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debugServer('Listening on ' + bind);
}
