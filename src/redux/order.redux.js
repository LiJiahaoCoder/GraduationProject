/*
 * @Author: LiJiahao 
 * @Date: 2019-05-13 17:49:37 
 * @Last Modified by: LiJiahao
 * @Last Modified time: 2019-05-13 22:53:34
 */
const CREATE_ORDER = 'CREATE_ORDER';


const initState = {
  orderList: []
};

export const order = (state = initState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
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

// action creators


export {
  createOrder
};