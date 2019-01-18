'use strict';

// パッケージの読み込み
const express = require('express');
const router = express.Router();
const debugRouter = require('debug')('app:router');
const debugMongo = require('debug')('app:mongodb');

// モデルを読み込み
const Todos = require('../models/todos');

/* todoを取得するWebAPI */
router.get('/', (req, res, next)=>{
  const userId = req.user.id;
  debugRouter(userId);
  if(!userId){
    res.end();
    return;
  }
  Todos.find({done: false, user_id: userId, deleted_at: null}, ['title','description','user_id','done','created_at','completed_at','deleted_at'], {sort: {created_at: -1}}, (err, todo)=>{
    if(err){
      debugMongo(err);
      return;
    }
    Todos.find({done: true, user_id: userId, deleted_at: null}, ['title','description','user_id','done','created_at','completed_at','deleted_at'], {sort: {created_at: -1}}, (err, completed)=>{
      if(err){
        debugMongo(err);
        return;
      }
      Todos.find({user_id: userId}, ['title','description','user_id','done','created_at','completed_at','deleted_at'], {sort: {created_at: -1}}, (err, hists)=>{
        if(err){
          debugMongo(err);
          return;
        }
        res.send({todos:todo, comptodos:completed, hists:hists});
      });
    });
  });
})

/* todoを追加するWebAPI */
router.put('/', (req, res, next)=>{
  const title = req.body.title;
  const description = req.body.description;
  debugMongo(description);
  const userId = req.user.id;
  Todos.create({
    title: title,
    user_id: userId,
    description: description,
    done: false,
    created_at: new Date(),
    completed_at: null,
    deleted_at: null
  }, (err, a)=>{
    if(err){
      debugMongo(err);
    }
    debugMongo('Add todo');
    res.end();
  });
});

/* todoを完了にするWebAPI */
router.post('/done', (req, res, next)=>{
  const id = req.body.id;
  debugMongo(id);
  Todos.updateOne({_id:id}, {$set:{done: true, completed_at: new Date()}}, (err, raw)=>{
    if(err){
      debugMongo('error', err);
    }else{
      debugMongo(raw);
      res.end();
    }
  });
})

/* todoを未完了にするWebAPI */
router.post('/undone', (req, res, next)=>{
  const id = req.body.id;
  Todos.updateOne({_id:id}, {$set:{done: false, completed_at: null}}, (err, raw)=>{
    if(err){
      debugMongo('error', err);
    }else{
      debugMongo(raw);
      res.end();
    }
  });
})

/* todoを削除するWebAPI */
router.post('/delete', (req, res, next)=>{
  const id = req.body.id;
  Todos.updateOne({_id:id}, {$set:{deleted_at: new Date()}}, (err, raw)=>{
    if(err){
      debugMongo('error', err);
    }else{
      debugMongo(raw);
      res.end();
    }
  });
})

/* todoを編集するWebAPI */
router.post('/edit', (req, res, next)=>{
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  Todos.updateOne({_id:id}, {$set:{title: title, description: description}}, (err, raw)=>{
    if(err){
      debugMongo('error', err);
    }else{
      debugMongo(raw);
      res.end();
    }
  });
})

module.exports = router;
