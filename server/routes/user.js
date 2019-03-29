/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 15:37:06 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-03-25 17:58:04
 */
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
// define hidden item
const _filter = {'password': 0, '__v': 0};

// get all user information
Router.get('/list', function(req, res) {
  console.log('Get all user information.');
  // User.remove({}, function(err, docm) {});
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

// user register
Router.post('/register', function(req, res) {
  // console.log(req.query);
  const {account, password, gender, mail, phoneNumber} = req.query;
  // console.log(req.body);
  // const {account, password, gender, mail, phoneNumber} = req.body;

  User.findOne({account: account}, function(err, doc) {
    if(doc) {
      return res.json({msg: '已存在该用户名'});
    }
    const userModel = new User({account, gender, mail, phoneNumber, password: md5Password(password)});
    userModel.save(function(err, doc) {
      if(err) {
        return res.json({msg: '后端出现了问题'});
      }
      const {account, _id} = doc;
      return res.json({code: 0,msg: '注册成功', data: {account, _id}});
    });
  });
});

function md5Password(password) {
  const salt = 'lijiahao-graduation+a90382afa#H#41';
  return utils.md5(utils.md5(password + salt));
}

module.exports = Router;