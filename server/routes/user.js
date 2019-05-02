/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 15:37:06 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-02 18:03:57
 */
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
const mailer = require('nodemailer');

// create mail transporter
const transport = mailer.createTransport({
  service: 'qq',
  secureConnection: true,
  secure: true,
  port: 456,
  auth: {
    user: 'george.1997@qq.com',
    pass: 'enpwodeuloxcdiej'
  }
});

// define hidden item
const _filter = {'password': 0, '__v': 0, 'resetCode': 0};

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
        const {_id, gender, mail, avatar, introduction, bankCard, stars, experience, nickname, account, name, isActive, isCertification, phoneNumber, identityNumber} = doc;
        res.cookie('userid', _id);
        return res.json({
          code: 0,
          msg: '注册成功',
          data: {_id, gender, mail, avatar, introduction, bankCard, stars, experience, nickname, account, name, isActive, isCertification, phoneNumber, identityNumber}
        });
        /* const {account, _id} = doc;
        res.cookie('userid', _id);
        return res.json({code: 0,msg: '注册成功', data: {account, _id}}); */
      });
    });
  });
});

// user add/remove goods to favorite list
Router.post('/addfavorite', function(req, res) {
  const {mail, _id} = req.body;
  User.findOne({mail}, function(err, doc) {
    if(doc)
      doc.favorite = doc.favorite.concat({goodsId: _id});
    doc.save();
    return res.json({code: 0, data: doc});
  });
});

Router.post('/removefavorite', function(req, res) {
  const {mail, _id} = req.body;
  User.findOne({mail}, function(err, doc) {
    if(doc)
      doc.favorite.splice(doc.favorite.indexOf(_id), 1);
    doc.save();
    return res.json({code: 0, data: doc});
  });
});

// user password reset
Router.post('/refind', function(req, res) {
  const {mail} = req.body;
  // create random code
  const resetCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  User.findOneAndUpdate({mail: mail}, {resetCode}, function(err, doc) {
    if(!doc)
      return res.json({code: 0, msg: '该邮箱未注册'});
    console.log('Reset code: ' + resetCode);
    transport.sendMail(mailOptions(mail, resetCode), function(err) {
      if(err)
        return res.json({resetCode: 1});
      console.log('send mail success');
      return res.json({resetCode: 0});
    });
  });
});

Router.post('/ensurecode', function(req, res) {
  const {mail, code} = req.body;
  User.findOneAndUpdate({mail: mail, resetCode: Number(code)}, {resetCode: -1}, function(err, doc) {
    if(!doc)
      return res.json({ensureCode: 1});
    return res.json({ensureCode: 0});
  });
});

// user updates info
Router.post('/update', function(req, res) {
  const {mail, password, ...obj} = req.body;
  const data = password ? {password: md5Password(password), ...obj} : obj;
  User.findOneAndUpdate({mail: mail}, {"$set": data}, function(err, doc){
    if(!doc)
      return res.json({isUpdate: 1, msg: '修改失败'});
    if(password)
      res.cookie('userid', doc._id, {maxAge: 0});
    return res.json({isUpdate: 0});
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

function mailOptions(to, resetCode) {
  return {
    from: 'george.1997@qq.com',
    to: to,
    subject: '易 - 找回密码',
    text: '请勿告诉别人，验证码：' + resetCode
  };
}

module.exports = Router;