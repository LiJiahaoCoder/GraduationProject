import { combineReducers } from 'redux';
// reducers
import { user } from './redux/user.redux';
import { goods } from './redux/goods.redux';
import { order } from './redux/order.redux';
import { chat } from './redux/chat.redux';

export default combineReducers({ user, goods, order, chat });