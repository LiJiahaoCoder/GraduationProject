import Axios from 'axios';
import { Toast } from 'antd-mobile';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const REFIND_SEND_MAIL_SUCCESS = 'REFIND_SEND_MAIL_SUCCESS';
const REFIND_ENSURE_CODE = 'REFIND_ENSURE_CODE';
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
const ADD_FAVORITE = 'ADD_FAVORITE';
const ADD_CART = 'ADD_CART';
const REMOVE_CART = 'REMOVE_CART';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const LOAD_DATA = 'LOAD_DATA';
const PAY = 'PAY';

const initState = {
  isAuth: false,
  msg: '',
  account: ''
};

// reducer
export const user = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, isAuth: true, msg: '', ...action.payload};
    case ADD_FAVORITE:
      return {...state, ...action.payload};
    case ADD_CART:
      return {...state, ...action.payload};
    case REMOVE_CART:
      return {...state, ...action.payload};
    case REMOVE_FAVORITE:
      return {...state, ...action.payload};
    case REFIND_SEND_MAIL_SUCCESS:
      return {...state, sentReset: true, ...action.payload};
    case REFIND_ENSURE_CODE:
      return {...state, ensureCode: true, ...action.payload};
    case UPDATE_SUCCESS:
      return {...state, isUpdate: true, ...action.payload};
    case UPLOAD_SUCCESS:
      return {...state, isUpload: true, ...action.payload};
    case LOAD_DATA:
      return {...state, isAuth: true, ...action.payload};
    case PAY:
      return {...state, isPay: true, ...action.payload};
    default:
      return state;
  }
}

function login({account, password}) {
  if(!account || !password)
    Toast.info('用户名和密码不能为空');

  return dispatch => {
    Axios.post('/user/login', {account, password})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          Toast.info(res.data.msg, 1.5);
        }
      });
  }
}

function register({account, password, gender, mail, phoneNumber}) {
  // clear space in string
  phoneNumber = phoneNumber.replace(/\s+/g, '');

  return dispatch => {
    Axios.post('/user/register', {account, password, gender, mail, phoneNumber})
      .then(
        res => {
          if(res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data));
          } else {
            Toast.info(res.data.msg, 1.5);
          }
        }
      );
  }
}

function addFavorite({mail, _id}) {
  return dispatch => {
    Axios.post('/user/addfavorite', {mail, _id})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('收藏成功', 1.5);
          dispatch(addFavoriteSuccess(res.data.data));
        } else {
          Toast.info('后端出错啦', 1.5);
        }
      });
  }
}

function addToCart({mail, _id}) {
  return dispatch => {
    Axios.post('/user/addtocart', {mail, _id})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('添加购物车成功', 1.5);
          dispatch(addToCartSuccess(res.data.data));
        } else {
          Toast.info('后端出错啦', 1.5);
        }
      });
  }
}

function removeCart({mail, _id}) {
  return dispatch => {
    Axios.post('/user/removecart', {mail, _id})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('删除商品成功', 1.5);
          dispatch(removeCartSuccess(res.data.data));
        } else {
          Toast.info('后端出错啦', 1.5);
        }
      });
  }
}

function removeFavorite({mail, _id}) {
  return dispatch => {
    Axios.post('/user/removefavorite', {mail, _id})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('取消收藏', 1.5);
          dispatch(removeFavoriteSuccess(res.data.data));
        } else {
          Toast.info('后端出错啦', 1.5);
        }
      });
  }
}

// reset/refind password
function refindSendMail({mail}) {
  return dispatch => {
    Axios.post('/user/refind', {mail})
      .then(res => {
        if(res.status === 200 && res.data.resetCode === 0) {
          dispatch(refindSendMailSuccess({mail}));
        } else {
          Toast.info(res.data.msg, 1.5);
        }
      });
  }
}

function refindEnsureCode({mail, code}) {
  return dispatch => {
    Axios.post('/user/ensurecode', {code, mail})
      .then(res => {
        if(res.status === 200 && res.data.ensureCode === 0) {
          dispatch(refindEnsureCodeSuccess({code}));
        } else {
          Toast.info(res.data.msg, 1.5);
        }
      });
  }
}

// update user info
function updateInfo(obj) {
  const {password, ...tmp} = obj;
  return dispatch => {
    Axios.post('/user/update', obj)
      .then(res => {
        if(res.status === 200 && res.data.isUpdate === 0) {
          Toast.info('成功', 1.5);
          const data = password ? {isAuth: false, ...tmp} : tmp;
          setTimeout(() => dispatch(updateSuccess(data)), 1000);
        } else {
          Toast.info(res.data.msg, 1.5);
        }
      });
  }
}

// upload image
function uploadImage(obj) {
  const {fd, avatar} = obj;
  return dispatch => {
    if(avatar) {
    // 如果是上传头像
    Axios.post('/upload/avatar', fd)
      .then(res => {
        if(res.status === 200 && res.data.isUpload === 0) {
          Toast.info('成功', 1.5);
          setTimeout(() => dispatch(uploadSuccess(res.data.data)), 1000);
        } else {
          Toast.info(res.data.msg, 1.5);
        }
      });
    }
  }
}

function pay(order) {
  return dispatch => {
    Axios.post('/user/pay', {order})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('下单成功', 1.5);
          dispatch(paySuccess(res.data.data));
        } else {
          Toast.info('下单失败', 1.5);
        }
      });
  }
}

// action creators
function authSuccess(obj) {
  const {password, ...data} = obj;
  // console.log(password, data);
  return {type: AUTH_SUCCESS, payload: data};
}

function removeFavoriteSuccess({favorite}) {
  return {type: ADD_FAVORITE, payload: {favorite}};
}

function removeCartSuccess({cart}) {
  return {type: REMOVE_CART, payload: {cart}};
}

function addFavoriteSuccess({favorite}) {
  return {type: ADD_FAVORITE, payload: {favorite}};
}

function addToCartSuccess({cart}) {
  return {type: ADD_CART, payload: {cart}};
}

function refindSendMailSuccess(mail) {
  return {type: REFIND_SEND_MAIL_SUCCESS, payload: mail};
}

function refindEnsureCodeSuccess(code) {
  return {type: REFIND_ENSURE_CODE, payload: code};
}

function updateSuccess(data) {
  return {type: UPDATE_SUCCESS, payload: data};
}

function uploadSuccess(obj) {
  return {type: UPLOAD_SUCCESS, payload: obj};
}

function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo};
}

function paySuccess(data) {
  return {type: PAY, payload: data};
}

export {
  login,
  register,
  refindSendMail,
  refindEnsureCode,
  updateInfo,
  loadData,
  uploadImage,
  addFavorite,
  removeFavorite,
  addToCart,
  removeCart,
  pay
};