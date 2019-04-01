import Axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  msg: '',
  account: ''
};

// reducer
export const user = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isAuth: true, msg: '',redirectTo: '/login', ...action.payload};
    default:
      return state
  }
}

function register({account, password, gender, mail, phoneNumber}) {
  // clear space in string
  phoneNumber = phoneNumber.replace(/\s+/g, "");

  return dispatch => {
    Axios.post('/user/register', {account, password, gender, mail, phoneNumber})
      .then(
        res => {
          if(res.status === 200 && res.data.code === 0) {
            dispatch(registerSuccess({account, password, gender, mail, phoneNumber}));
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        }
      );
  }
}

// action creators
function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data};
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo};
}

export { register, loadData };