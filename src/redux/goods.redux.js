import Axios from 'axios';
import { Toast } from 'antd-mobile';

const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
const LOAD_PUBLISH = 'LOAD_PUBLISH';
const DELETE_PUBLISH = 'DELETE_PUBLISH';
const LOAD_BY_PAGE = 'LOAD_BY_PAGE';

const initialState = {
  goodsList: []
};

// reducer
const goods = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {...state, isUpload: true, ...action.payload};
    case DELETE_PUBLISH:
      return {...state, isDelete: true, ...action.payload};
    case LOAD_PUBLISH:
      return {...state, ...action.payload};
    case LOAD_BY_PAGE:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function loadByPage(obj) {
  const {page, itemNum} = obj;
  return dispatch => {
    Axios.get('/goods/loadbypage', {params: {page, itemNum}})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(loadByPageSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
  }
}

/**
 *
 * @description 删除上传商品
 * @param {*} obj obj中传入mail和_id即可
 */
function deletePublish(obj) {
  const {mail, _id} = obj;
  return dispatch => {
    Axios.post('/goods/deletepublish', {mail, _id})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          let data = res.data.data;
          Toast.info('成功', 1.5);
          setTimeout(
            () => dispatch(deletePublishSuccess(data.reverse())),
            800
          );
        }
      });
  }
}

function loadPublish(obj) {
  const {mail} = obj;
  return dispatch => {
    Axios.post('/goods/mypublish', {mail})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          let data = res.data.data;
          dispatch(loadPublishSuccess(data.reverse()));
        }
      });
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
function loadByPageSuccess(obj) {
  return {type: LOAD_BY_PAGE, payload: {goodsList: obj}};
}

function deletePublishSuccess(obj) {
  return {type: DELETE_PUBLISH, payload: {goodsList: obj}};
}

function loadPublishSuccess(obj) {
  return {type: LOAD_PUBLISH, payload: {goodsList: obj}};
}

function uploadSuccess(obj) {
  return {type: UPLOAD_SUCCESS, payload: {goodsList: obj}};
}

export { goods, uploadGoods, loadPublish, deletePublish, loadByPage };