/*
 * @Author: LiJiahao 
 * @Date: 2019-05-13 17:44:53 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-14 23:23:17
 */
const express = require('express');
const Router = express.Router();
const model = require('../model');
const Order = model.getModel('order');

Router.get('/loadorder', function(req, res) {
  const {buyer, saler} = req.query;
  let condition = buyer ? {buyer} : (saler ? {saler} : '');
  if(!condition)
    return res.json({code: 1});
  Order.find(condition, function(err, doc) {
    if(doc)
      return res.json({code: 0, data: doc});
  });
});

module.exports = Router; 