import Axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:8888');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';
const MSG_SHOW = 'MSG_SHOW';

const initState = {
  msgList: [],
  showList: [],
  unread: 0
};

const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {...state, ...action.payload, unread: action.payload.msgList.filter(v => !v.isRead).length};
    case MSG_RECV:
      return {...state, msgList: [...state.msgList, action.payload], showList: [...state.showList, action.payload]};
    case MSG_SHOW:
      return {...state, showList: action.payload};
    case MSG_READ:
      return {};
    default:
      return state;
  }
}

function getMsgList() {
  return dispatch => {
    Axios.get('/chat/getmsglist')
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(getMsgListSuccess(res.data.msgList));
        }
      });
  }
}

function sendMsg(msg) {
  return dispatch => {
    socket.emit('sendmsg', msg);
  } 
}

function recieveMsg() {
  return dispatch => {
    socket.on('rcvmsg', function(msg) {
      console.log(msg);
      dispatch(recieveMsgSuccess(msg));
    });
  }
}

function filterShowList(from, to, list) {
  list = list.filter(v => ((v.from === from && v.to === to) || (v.to === from && v.from === to)));
  return dispatch => {
    dispatch(filterShowListSuccess(list));
  }
}

// action creators
function getMsgListSuccess(msgList) {
  return {type: MSG_LIST, payload: {msgList}};
}

function recieveMsgSuccess(msg) {
  return {type: MSG_RECV, payload: msg};
}

function filterShowListSuccess(showList) {
  return {type: MSG_SHOW, payload: showList};
}

export {
  chat,
  getMsgList,
  recieveMsg,
  sendMsg,
  filterShowList
};