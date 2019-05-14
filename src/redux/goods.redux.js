import Axios from 'axios';
import { Toast } from 'antd-mobile';

const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
const LOAD_PUBLISH = 'LOAD_PUBLISH';
const DELETE_PUBLISH = 'DELETE_PUBLISH';
const GET_FAVORITE = 'GET_FAVORITE';
const GET_CART = 'GET_CART';
const LOAD_BY_TYPE = 'LOAD_BY_TYPE';
const LOAD_BY_PAGE = 'LOAD_BY_PAGE';
const LOAD_BY_BRAND = 'LOAD_BY_BRAND';
const SEARCH = 'SEARCH';
const GET_ORDER = 'GET_ORDER';
const GOODS_INFO = 'GOODS_INFO';
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';

const initialState = {
  goodsList: [],
  favorite: [],
  cart: [],
  publish: [],
  order: [],
  goodsInfo: 'goodsList'
};

// reducer
const goods = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {...state, ...action.payload};
    case DELETE_PUBLISH:
      return {...state, isDelete: true, ...action.payload};
    case LOAD_PUBLISH:
      return {...state, ...action.payload};
    case GET_FAVORITE:
      return {...state, ...action.payload};
    case GET_CART:
      return {...state, ...action.payload};
    case GET_ORDER:
      return {...state, ...action.payload};
    case LOAD_BY_TYPE:
      return {...state, ...action.payload};
    case LOAD_BY_PAGE:
      return {...state, ...action.payload};
    case LOAD_BY_BRAND:
      return {...state, ...action.payload};
    case SEARCH:
      return {...state, ...action.payload};
    case GOODS_INFO:
      return {...state, ...action.payload};
    case CHANGE_ORDER_STATUS:
      return {...state};
    default:
      return state;
  }
}

function changeOrderStatus(data) {
  return dispatch => {
    Axios.post('/goods/changeorderstatus', data)
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          Toast.info('成功', 1.5);
          dispatch(changeOrderStatusSuccess());
        } else {
          Toast.info('后端出错', 1.5);
        }
      });
  }
}

function setGoodsInfo(info) {
  return dispatch => {
    dispatch({type: GOODS_INFO, payload: {goodsInfo: info}});
  }
}

function getFavorite(favorite) {
  // 处理数据
  let option = favorite.reduce((acc, cur)=>{
    acc.push({_id: cur.goodsId});
    return acc;
  }, []);

  return dispatch => {
    Axios.post('/goods/getfavorite', {option})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(getFavoriteSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
  }
}

function getOrder(order) {
  // 处理数据
  let option = order.reduce((acc, cur)=>{
    acc.push({_id: cur.goodsId});
    return acc;
  }, []);

  return dispatch => {
    Axios.post('/goods/getorder', {option})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(getOrderSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
  }
}

function getCart(cart) {
  // 处理数据
  let option = cart.reduce((acc, cur)=>{
    acc.push({_id: cur.goodsId});
    return acc;
  }, []);

  return dispatch => {
    Axios.post('/goods/getcart', {option})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(getCartSuccess(res.data.data));
        } else {
          Toast.info('加载购物车失败', 1.5);
        }
      });
  }
}

function search({brand, name, page, itemNum}) {
  return dispatch => {
    Axios.get('/goods/search', {params: {brand, name, page, itemNum}})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(searchSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
  }
}

function loadByType({type, page, itemNum}) {
  return dispatch => {
    Axios.get('/goods/loadbytype', {params: {type, page, itemNum}})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(loadByTypeSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
  }
}

function loadByBrand({brand, page, itemNum}) {
  return dispatch => {
    Axios.post('/goods/loadbybrand', {brand, page, itemNum})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(loadByBrandSuccess(res.data.data));
        } else {
          Toast.info('加载商品失败', 1.5);
        }
      });
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
          const tmp = res.data.data
          Toast.info('成功', 1.5);
          dispatch(uploadSuccess({tmp, isUpload: true}));
        } else {
          Toast.info('上传失败', 1.5);
          dispatch(uploadSuccess({isUpload: false}));
        }
      });
  }
}

// action creator
function changeOrderStatusSuccess() {
  return {type: CHANGE_ORDER_STATUS};
}

function getFavoriteSuccess(obj) {
  return {type: GET_FAVORITE, payload: {favorite: obj}};
}

function getCartSuccess(obj) {
  return {type: GET_CART, payload: {cart: obj}};
}

function getOrderSuccess(obj) {
  return {type: GET_ORDER, payload: {order: obj}};
}

function searchSuccess(obj) {
  return {type: SEARCH, payload: {goodsList: obj}}
}

function loadByTypeSuccess(obj) {
  return {type: LOAD_BY_TYPE, payload: {goodsList: obj}};
}

function loadByBrandSuccess(obj) {
  return {type: LOAD_BY_BRAND, payload: {goodsList: obj}};
}

function loadByPageSuccess(obj) {
  return {type: LOAD_BY_PAGE, payload: {goodsList: obj}};
}

function deletePublishSuccess(obj) {
  return {type: DELETE_PUBLISH, payload: {publish: obj}};
}

function loadPublishSuccess(obj) {
  return {type: LOAD_PUBLISH, payload: {publish: obj}};
}

function uploadSuccess(obj) {
  const {isUpload, tmp} = obj;
  return {type: UPLOAD_SUCCESS, payload: {isUpload, publish: tmp}};
}

export {
  goods,
  uploadGoods,
  loadPublish,
  deletePublish,
  loadByPage,
  loadByType,
  loadByBrand,
  getFavorite,
  getOrder,
  getCart,
  search,
  setGoodsInfo,
  changeOrderStatus
};