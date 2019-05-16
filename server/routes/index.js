/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 20:44:47 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-16 13:41:00
 */
const userRouter = require('./user');
const uploadRouter = require('./upload');
const goodsRouter = require('./goods');
const orderRouter = require('./order');
const chatRouter = require('./chat');

// exports routes
module.exports = {
  userRouter,
  uploadRouter,
  goodsRouter,
  orderRouter,
  chatRouter
};