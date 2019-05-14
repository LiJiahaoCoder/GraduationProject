import Axios from "axios";

/*
 * @Author: LiJiahao 
 * @Date: 2019-05-13 17:49:37 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-14 23:16:35
 */
const CREATE_ORDER = 'CREATE_ORDER';
const LOAD_ORDER = 'LOAD_ORDER';


const initState = {
  orderList: []
};

export const order = (state = initState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {...state, ...action.payload};
    case LOAD_ORDER:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function createOrder(orderList) {
  return dispatch => {
    dispatch({type: CREATE_ORDER, payload: {orderList}});
  }
}

function loadOrder({buyer, saler}) {
  return dispatch => {
    Axios.get('/order/loadorder', {params: {buyer, saler}})
      .then(res => {
        dispatch(loadOrderSuccess(res.data.data));
      });
  }
}

// action creators
function loadOrderSuccess(orderList) {
  return {type: LOAD_ORDER, payload: {orderList}};
}


export {
  createOrder,
  loadOrder
};