import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  WhiteSpace,
  Carousel,
  Icon,
  List,
  TextareaItem,
  Button,
  Modal
} from 'antd-mobile';
import Axios from 'axios';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: {},
      socket: io()
    };
  }

  componentDidMount() {
    Axios.get('/user/getuserbyid', {params: {_id: this.props.match.params.userid}})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          this.setState({
            to: res.data.data
          });
        }
      });
      // this.state.socket.emit('success', 'this.state.socket.emit success');
  }

  componentWillUnmount() {
    // 销毁socket
    this.state.socket.close();
  }

  render() {
    return (
      <div>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {
            this.state.to.nickname ?
              `与${this.state.to.nickname}聊天中`:
              '连接中...'
          }
        </NavBar>
      </div>
    );
  }
}

export default Chat;