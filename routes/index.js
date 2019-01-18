'use strict';

// パッケージの読み込み
const express = require('express');
const router = express.Router();

// モジュールの読み込み
const authenticationEnsurer = require('./authentication-ensurer');

/* ホームページ */
router.get('/', authenticationEnsurer, (req, res, next)=>{
  res.render('index', {user: req.user});
});

module.exports = router;
