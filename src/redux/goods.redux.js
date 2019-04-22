import Axios from 'axios';
import { Toast } from 'antd-mobile';

const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
const LOAD_GOODS = 'LOAD_GOODS';

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
  let {images, newLevel, mail, price, ...tmp} = obj;
  newLevel = Number(newLevel[0]);
  price = Number(price);
  // 输出多个图片
  images = images.map(v => {
    return v.file;
  });
  const fd = new FormData();
  for(let i = 0; i < images.length; i++) {
    fd.append('files', images[i]);
  }
  const data = {newLevel, mail, price, ...tmp};
  for(let key in data) {
    fd.append(`${key}`, data[key]);
  }
  // console.info(data);
  return dispatch => {
    Axios.post('/upload/goods', fd)
      .then(res => {
        if(res.status === 200 && res.data.isUpload === 0) {
          Toast.info('成功', 1.5);
          dispatch(uploadSuccess(res.data.data));
        }
      });
  }
}

// action creator
function uploadSuccess(obj) {
  return {type: UPLOAD_SUCCESS, payload: {goodsList: obj}};
}

export {uploadGoods};