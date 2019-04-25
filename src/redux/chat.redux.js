import Axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:8888');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';

const initState = {
  chatList: []
};

const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {};
    case MSG_RECV:
      return {};
    default:
      return state;
  }
}

function getMsgList() {
  return dispatch => {
    
  }
}

export { chat, getMsgList };