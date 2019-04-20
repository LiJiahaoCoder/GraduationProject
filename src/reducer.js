import { combineReducers } from 'redux';
// reducers
import { user } from './redux/user.redux';
import { goods } from './redux/goods.redux';

export default combineReducers({ user, goods });