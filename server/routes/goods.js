const express = require('express');
const Router = express.Router();
const model = require('../model');
const Goods = model.getModel('goods');
const Order = model.getModel('order');
const User = model.getModel('user');
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

Router.get('/getgoodsbyid', function(req, res) {
  const {_id} = req.query;
  Goods.findOne({_id}, function(err, doc) {
    if(doc)
      return res.json({code: 0, goods: doc});
  });
});

Router.post('/changeorderstatus', function(req, res) {
  const {_id, status, expressNumber, price} = req.body;
  // console.log(price);
  let option = expressNumber ? {status: status, expressNumber: expressNumber} : {status: status};
  if(status === '已收货') {
    // 查找物品的所有者
    Goods.findOne({_id: _id}, function(err, doc) {
      if(doc) {
        let mail = doc.owner;
        // 将钱转入卖家
        User.findOne({mail})
        .exec(function(err, doc) {
          if(doc) {
            // console.log(doc);
            doc.stars += Number(price);
            doc.save();
            // 更新物品状态
            Goods.updateOne({_id: _id}, {status: status}, function(err, doc) {
              if(doc) {
                // 修改order collection中的status
                Order.updateOne({goodsId: _id}, {status: status}, function(err, doc) {
                  if(doc)
                    return res.json({code: 0});
                });
              }
            });
          }
        });
      }
    });
  } else {
    // 修改goods collection中的status
    Goods.updateOne({_id: _id}, {status: status}, function(err, doc) {
      if(doc) {
        // 修改order collection中的status/expressNumber
        Order.updateOne({goodsId: _id}, option, function(err, doc) {
          if(doc)
            return res.json({code: 0});
        });
      }
    });
    }
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

Router.post('/getorder', function(req, res) {
  let {option} = req.body;
  Goods.find({'$or': option}, filter, function(err, doc) {
    return res.json({code: 0, data: doc});
  });
});

Router.get('/search', function(req, res) {
  let {name, brand} = req.query;
  name = new RegExp(name, 'i');
  brand = new RegExp(brand, 'i');
  const option = [{name: name}, {brand: brand}];
  console.log(option)
  Goods.find({status: '未出售', '$or': option}, filter, function(err, doc) {
    if(err)
      return res.json({code: 1, msg: '后端出现了问题'});
    if(doc)
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

Router.post('/loadbybrand', function(req, res) {
  let {brand, page, itemNum} = req.body;
  brand = brand.reduce((acc, cur) => {
    acc.push({brand: new RegExp(`^${cur}$`, 'i')});
    return acc;
  }, []);
  Goods.find({status: '未出售', '$or': brand}, filter)
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