'use strict';

const mongoose = require('./_mongooseLoader');

//スキーマを定義
const todosSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: String,
  done: Boolean,
  created_at: Date,
  completed_at: Date,
  deleted_at: Date
});

// モデルを作成
const Todos = mongoose.model('todos', todosSchema);

module.exports = Todos;
