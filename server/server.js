/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 10:47:52 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-13 17:46:45
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// create express app
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

// customize router
const routes = require('./routes')
const { userRouter, uploadRouter, goodsRouter, orderRouter } = routes;

// socket
io.on('connection', function(socket) {
  console.log('user login');
});

// allow cors
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","*");
  // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// use middleware
app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// use customize router
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/goods', goodsRouter);
app.use('/order', orderRouter);

// set assets access permission
app.use('/static', express.static('public'));
app.use('/static/upload', express.static('upload'));

// info showed in homepage
app.get('/', function(req, res) {
  console.log('Recive request from homepage.');
  res.send(`<h1 style='color: red; text-align: center;'>Welcome to LiJiahao's node server.</h1>`);
});

// app listener at port: 8888
server.listen(8888, function() {
  console.log('LiJiahao\'s node server at port 8888 is starting.');
});