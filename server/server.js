/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 10:47:52 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-03-24 21:24:41
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// customize router
const routes = require('./routes')
const { userRouter } = routes;

// create express app
const app = express();

// use middleware
app.use(cookieParser());
app.use(bodyParser.json());

// use customize router
app.use('/user', userRouter);

// set assets access permission
app.use('/static', express.static('public'));

// info showed in homepage
app.get('/', function(req, res) {
  console.log('Recive request from homepage.');
  res.send(`<h1 style='color: red; text-align: center;'>Welcome to LiJiahao's node server.</h1>`);
});

// app listener at port: 8888
app.listen(8888, function() {
  console.log('LiJiahao\'s node server at port 8888 is starting.');
});