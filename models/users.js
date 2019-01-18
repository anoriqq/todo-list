'use strict';

const mongoose = require('./_mongooseLoader');

//スキーマを定義
const usersSchema = new mongoose.Schema({
  id: String,
  username: String
});

// モデルを作成
const Users = mongoose.model('users', usersSchema);

module.exports = Users;
