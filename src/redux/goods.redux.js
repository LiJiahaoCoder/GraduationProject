import Axios from 'axios';
import { Toast } from 'antd-mobile';

const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';

const initialState = {
  goodsList: []
};

// reducer
export const goods = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {...state, isUpload: true, ...action.payload};
    default:
      return state;
  }
}

function uploadGoods(obj) {

}

// action creator
function uploadSuccess(obj) {
  return {type: UPLOAD_SUCCESS, payload: obj};
}

export {uploadGoods};