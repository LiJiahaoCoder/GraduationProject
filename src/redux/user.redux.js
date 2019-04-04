import Axios from 'axios';
import { Toast } from 'antd-mobile';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const REFIND_SUCCESS = 'REFIND_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  isAuth: false,
  msg: '',
  account: ''
};

// reducer
export const user = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state,isAuth: true, msg: '', ...action.payload};
    case REFIND_SUCCESS:
      return {...state, sentReset: true, ...action.payload};
    case LOAD_DATA:
      return {...state, ...action.payload};
    case ERROR_MSG:
      return {...state, msg: action.msg};
    default:
      return state;
  }
}

function login({account, password}) {
  if(!account || !password)
    return errorMsg('用户名和密码不能为空');

  return dispatch => {
    Axios.post('/user/login', {account, password})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          Toast.info(res.data.msg, 1.5);
          dispatch(errorMsg(res.data.msg));
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
            dispatch(authSuccess({account, password, gender, mail, phoneNumber}));
          } else {
            Toast.info(res.data.msg, 1.5);
            dispatch(errorMsg(res.data.msg))
          }
        }
      );
  }
}

function refind({mail}) {
  return dispatch => {
    Axios.post('/user/refind', {mail})
      .then(res => {
        if(res.status === 200 && res.data.resetCode === 0) {
          dispatch(refindSuccess(mail));
        } else {
          Toast.info(res.data.msg, 1.5);
          dispatch(errorMsg(res.data.msg));
        }
      });
  }
}

// action creators
function authSuccess(obj) {
  const {pwd, ...data} = obj;
  return {type: AUTH_SUCCESS, payload: data};
}

function refindSuccess(mail) {
  return {type: REFIND_SUCCESS, payload: mail};
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo};
}

export { login, register, refind, loadData };