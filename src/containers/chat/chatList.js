import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {
  List,
  Icon,
  NavBar,
} from 'antd-mobile';
import { Redirect } from 'react-router-dom';

import {AVATAR_PATH} from '../../path';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
  state => state
)
class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: []
    };
  }
  
  componentDidMount() {
    if(this.props.user.isAuth) {
      const id = this.props.user._id;
      let tmp = this.props.chat.msgList
                  .filter(v => (v.to === id || v.from === id))
                  .reduce((acc, cur) => {
                    if(cur.from !== id)
                      acc.push(cur.from);
                    else
                      acc.push(cur.to);
                    return acc;
                  }, []);
      tmp = Array.from(new Set(tmp));
      if(tmp[0]) {
        Axios.get('/user/getuserbyid', {params: {_id: tmp}})
        .then(res => {
          if(res.status === 200 && res.data.code === 0) {
            // console.log(res.data.data);
            this.setState({
              userList: res.data.data
            });
          }
        });
      }
    }
    // console.log(tmp);
  }
  
  render() {
    return (
      <div
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        <NavBar
          mode='light'
        >
          聊天列表
        </NavBar>
        {
          this.props.user.isAuth ?
          this.state.userList[0] ?
          <List>
            {
                this.state.userList.map(v =>
                  <Item
                    key={v._id}
                    thumb={`${AVATAR_PATH}${v.avatar}`}
                    multipleLine
                    arrow='horizontal'
                    onClick={() => this.props.history.push(`/chat/${v._id}`)}
                  >
                    {v.nickname}
                    <Brief>{v.introduction}</Brief>
                  </Item>
                )
            }
          </List>
          :
          <div
            style={{
              fontSize: '1.4rem',
              textAlign: 'center',
              marginTop: '1rem'
            }}
          >
            暂无聊天信息
          </div>
          :
          <Redirect to='/login' />
        }
      </div>
    );
  }
}

export default ChatList;