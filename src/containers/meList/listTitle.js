const listTitle = {
  idvertify: '我的实名制',
  bankcard: '我的银行卡',
  publish: '我的发布',
  order: '我的订单',
  favorite: '我的收藏',
  safe: '我的安全',
  about: '关于',
  modifypassword: '修改密码'
};

function getTitle(url) {
  let arr = url.split('/');
  return arr[arr.length - 1];
}

export {
  listTitle,
  getTitle
};