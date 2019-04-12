/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 20:44:47 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-04-12 15:31:05
 */
const userRouter = require('./user');
const uploadRouter = require('./upload');

// exports routes
module.exports = {
  userRouter,
  uploadRouter
};