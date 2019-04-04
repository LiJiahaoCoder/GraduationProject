/*
 * @Author: LiJiahao 
 * @Date: 2019-03-24 15:37:17 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-04-04 19:21:16
 */
/*
 * Map sql to nosql
 * Sql              NoSql               Description
 * database         database            数据库
 * table            collection          表/集合
 * row              document            数据记录行/文档
 * column           field               数据字段/域
 * index            index               索引
 * table jions                          MongoDB不支持表连接
 * primary key      primary key         主键,MongoDB自动将_id设置为主键
 */
const mongoose = require('mongoose');

// connect to mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/lijiahao-graduation-project';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
  console.log('mongodb connect success.');
});

// define models
const models = {
  user: {
    // essential information for general user
    'account': {type: String, require: true},
    'password': {type: String, require: true},
    'gender': {type: Number, require: true},  // 0: male, 1: female
    'mail': {type: String, require: true},
    'phoneNumber': {type: Number, require: true},
    'creationDate': {type: Date, default: Date.now},
    'isActive': {type: Boolean, default: false},
    'resetCode': {type: Number, default: -1},
    // essential information for real-name authentication
    'isCertification': {type: Boolean, default: false},
    'identityNumber': {type: Number, default: -1},
    'bankCard': [{'number': Number}],
    'stars': {type: Number, default: 0},  // virtual coin on plateform
    'experience': {type: Number, default: 0}, // buy/sale goods will increase experience
    // optional information
    'avatar': {type: String, default: `http://localhost:8888/static/images/avatar.default.${Math.ceil(Math.random() * 6)}.png`},
    'nickname': {type: String, default: Math.random().toString(36).substr(2, 6)},
    'introduction': {type: String, default: '还没有个人介绍耶( Ĭ ^ Ĭ )'}
  }
};
// create models
for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};