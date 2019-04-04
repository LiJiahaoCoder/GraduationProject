/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 15:37:06 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-04-04 22:25:54
 */
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
const { sendMail, mailOptions} = require('../mailer');
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

// user login
Router.post('/login', function(req, res) {
  const {account, password} = req.body;
  const query = account.includes('@') ?
      {mail: account, password: md5Password(password)} :
      {account, password: md5Password(password)};
  User.findOne(query, _filter, function(err, doc) {
    if(!doc)
      return res.json({code: 1, msg: '用户名或密码错误'});
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc});
  });
});

// user register
Router.post('/register', function(req, res) {
  // console.log(req.query);
  // const {account, password, gender, mail, phoneNumber} = req.query;
  // console.log(req.body);
  const {account, password, gender, mail, phoneNumber} = req.body;

  User.findOne({account: account}, function(err, doc) {
    if(doc) {
      return res.json({code: 1, msg: '已存在该用户名'});
    }
    User.findOne({mail: mail}, function(err, doc) {
      if(doc)
        return res.json({code: 1, msg: '该邮箱已被注册'});
      const userModel = new User({account, gender, mail, phoneNumber, password: md5Password(password)});
      userModel.save(function(err, doc) {
        if(err) {
          return res.json({code: 1, msg: '后端出现了问题'});
        }
        const {account, _id} = doc;
        res.cookie('userid', _id);
        return res.json({code: 0,msg: '注册成功', data: {account, _id}});
      });
    });
  });
});

// user password reset
Router.post('/refind', function(req, res) {
  const {mail} = req.body;
  // create random code
  const resetCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  User.findOneAndUpdate({mail: mail}, {resetCode}, function(err, doc) {
    if(err)
      return res.json({code: 0, msg: '该邮箱未注册'});
    sendMail(mailOptions(mail, resetCode), function(err, response) {
      if(err)
        return res.json({resetCode: 1});
      return res.json({resetCode: 0});
    });
  });
});

// get user info
Router.get('/info', function(req, res) {
  const {userid} = req.cookies;
  if(!userid)
    return res.json({code: 1});
  User.findOne({_id: userid}, _filter, function(err, doc) {
    if(err)
      return res.json({code: 1, msg: '后端出现了问题'});
    if(doc)
      return res.json({code: 0, data: doc});
  });
});

function md5Password(password) {
  const salt = 'lijiahao-graduation+a90382afa#H#41';
  return utils.md5(utils.md5(password + salt));
}

module.exports = Router;