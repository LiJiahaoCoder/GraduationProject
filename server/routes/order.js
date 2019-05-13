/*
 * @Author: LiJiahao 
 * @Date: 2019-05-13 17:44:53 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-13 19:39:49
 */
const express = require('express');
const Router = express.Router();
const model = require('../model');
const Order = model.getModel('order');

module.exports = Router; 