'use strict';

// パッケージの読み込み
const mongoose = require('mongoose');
const debugMongo = require('debug')('app:mongodb');

// DBに接続
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_list';
mongoose.connect(url, {useNewUrlParser: true}, (err)=>{
  if(err){
    debugMongo(err);
  }else{
    debugMongo('connected');
  }
});
const db = mongoose.connection;
db.on('error', console.log);

module.exports = mongoose;
