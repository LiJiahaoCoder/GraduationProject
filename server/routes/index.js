/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 20:44:47 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-04-25 15:53:13
 */
const userRouter = require('./user');
const uploadRouter = require('./upload');
const goodsRouter = require('./goods');

// exports routes
module.exports = {
  userRouter,
  uploadRouter,
  goodsRouter
};