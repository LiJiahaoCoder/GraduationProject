const express = require('express');
const Router = express.Router();
const model = require('../model');
const Chat = model.getModel('chat');

Router.get('/getmsglist', function(req, res) {
  const user = req.cookies.userid;
  Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc) {
    if(doc) {
      return res.json({code: 0, msgList: doc});
    }
  });
});

module.exports = Router;