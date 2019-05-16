import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  WhiteSpace,
  Carousel,
  Icon,
  List,
  InputItem,
  Modal
} from 'antd-mobile';
import Axios from 'axios';

import {recieveMsg, sendMsg, filterShowList, getMsgList} from '../../redux/chat.redux';
import {AVATAR_PATH} from '../../path';

const Item = List.Item;

@connect(
  state => state,
  {recieveMsg, sendMsg, filterShowList, getMsgList}
)
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      msg: [],
      to: {}
    };

    this.contenRef = React.createRef();

    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    const userid = this.props.match.params.userid;
    this.props.recieveMsg();
    Axios.get('/user/getuserbyid', {params: {_id: userid}})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          this.setState({
            to: res.data.data
          });
        }
      });
    this.props.getMsgList();
    setTimeout(() => {
      // 对用户展示的信息进行筛选
      this.props.filterShowList(this.props.user._id, userid, this.props.chat.msgList);
    }, 0);
    /* this.contenRef.current.addEventListener('scroll', () => {
      console.log(this.contenRef.current.offsetHeight, this.contenRef.current.scrollTop, this.contenRef.current.scrollHeight, this.contenRef.current.scrollY)
    }); */
  }

  /* componentDidUpdate() {
    this.contenRef.current.scrollTop += 42;
  } */

  handleSend() {
    this.props.sendMsg(
      {
        from: this.props.user._id,
        to: this.props.match.params.userid,
        content: this.state.text
      }
    );
    this.setState({text: ''});
    // console.log()
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
        <div
          style={{
            height: '87vh',
            overflowY: 'scroll'
          }}
          ref={this.contenRef}
        >
          <List>
            {
              this.props.chat.showList.map(v =>
                (
                  v.from === this.props.match.params.userid ?
                    <Item
                      key={v._id}
                      className='chat-msg chat-other'
                      thumb={`${AVATAR_PATH}${this.state.to.avatar}`}
                    >
                      {v.content}
                    </Item>
                    :
                    <Item
                      key={v._id}
                      className='chat-msg chat-me'
                      extra={
                        <img src={`${AVATAR_PATH}${this.props.user.avatar}`} alt='' />
                      }
                    >
                      {v.content}
                    </Item>
                )
              )
            }
          </List>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0
          }}
        >
          <List>
            <InputItem
              placeholder={'请输入'}
              value={this.state.text}
              onChange={v => this.setState({text: v})}
              extra={<Icon type='right' onClick={this.handleSend} />}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;