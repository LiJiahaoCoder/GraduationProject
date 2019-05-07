const express = require('express');
const Router = express.Router();
const model = require('../model');
const Goods = model.getModel('goods');
const mongoose = require('mongoose');

const filter = {'__v': 0};

Router.post('/mypublish', function(req, res) {
  const {mail} = req.body;
  if(!mail)
    return res.json({code: 1});
  Goods.find({owner: mail}, filter, function(err, doc) {
    if(err)
      return res.json({code: 1, msg: '后端出现了问题'});
    if(doc)
      return res.json({code: 0, data: doc});
  });
});

Router.post('/deletepublish', function(req, res) {
  const {mail, _id} = req.body;
  Goods.deleteOne({_id}, function(err) {
    if(err)
      return res.json({code: 1, msg: '后端出错了！'});
    Goods.find({owner: mail}, filter, function(err, doc) {
      if(err)
        return res.json({code: 1, msg: '后端出现了问题'});
      if(doc)
        return res.json({code: 0, data: doc});
    });
  });
});

Router.post('/getfavorite', function(req, res) {
  let {option} = req.body;
  Goods.find({'$or': option}, filter, function(err, doc) {
    return res.json({code: 0, data: doc});
  });
});

Router.post('/getcart', function(req, res) {
  let {option} = req.body;
  Goods.find({'$or': option}, filter, function(err, doc) {
    return res.json({code: 0, data: doc});
  });
});

Router.get('/loadbytype', function(req, res) {
  const {type, page, itemNum} = req.query;
  Goods.find({status: '未出售', type: type}, filter)
    .skip(page * itemNum)
    .limit(Number(itemNum))
    .sort({_id: -1})
    .exec(function(err, doc) {
      if(err)
        return res.json({code: 1, msg: '后端出现了问题'});
      if(doc)
        return res.json({code: 0, data: doc});
    });
});

Router.get('/loadbypage', function(req, res) {
  const {page, itemNum} = req.query;
  Goods.find({status: '未出售'}, filter)
    .skip(page * itemNum)
    .limit(Number(itemNum))
    .sort({_id: -1})
    .exec(function(err, doc) {
      if(err)
        return res.json({code: 1, msg: '后端出现了问题'});
      if(doc)
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;