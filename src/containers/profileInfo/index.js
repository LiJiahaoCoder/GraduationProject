import React, { Component } from 'react';
import { NavBar, Icon, List, ImagePicker, WingBlank, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import Axios from 'axios';
// reducer
import { updateInfo } from '../../redux/user.redux';

const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

/* const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}; */

// TODO: 还没实现上传更换头像

@connect(
  state => state.user,
  {updateInfo}
)
class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      const {avatar} = nextProps;
      this.setState({avatar});
      return true;
    }
    if(this.state !== nextState)
      return true;
    return false;
  }


  onChange (files, type, index) {
    console.log(files, type, index);
    this.setState({
      avatar: files[files.length - 1].url,
    });
    // set avatar into formdata
    let fd = new FormData();
    fd.append('file', files[files.length - 1]);
    /* let file = files[files.length - 1];
    console.log(file); */
    // store to database
    Axios.post('/upload', fd)
      .then(res => {console.log(res)});
  }

  handlePress(value, type) {
    this.props.updateInfo({
      [type]: value,
      mail: this.props.mail
    });
  }

  render() {
    const title = this.props.match.params.useraccount === 'me' ? '我的资料' : this.props.otherNickname;
    const meList = [
      {
        text: '账号',
        extra: this.props.account,
        onClick: false
      },
      {
        text: '昵称',
        extra: this.props.nickname,
        onClick: true,
        type: 'nickname'
      },
      {
        text: '个人介绍',
        brief: this.props.introduction,
        onClick: true,
        type: 'introduction'
      }
    ];

    return (
      <div style={{position: 'relative', zIndex: '1'}}>
        <NavBar
          mode='dark'
          icon={<Icon type='left' />}
          leftContent='返回'
          onLeftClick={()=>{this.props.history.goBack();}}
        >
          {title}
        </NavBar>
      <List>
        <Item
          arrow='empty'
        >
          <WingBlank>
            <ImagePicker
              onChange={this.onChange}
              files={[{url: this.props.avatar, id: this.props._id}]}
              onImageClick={(index, fs) => console.log(index, fs)}
            />
          </WingBlank>
        </Item>
        {
          meList.map(v => 
            <Item
              key={v.text}
              arrow={v.onClick?'horizontal':null}
              onClick={v.onClick?
                () => prompt(`修改${v.text}`, '', [
                  { text: '取消' },
                  { text: '确认', onPress: value => this.handlePress(value, v.type) },
                ],
                'default',
                v.extra||v.brief):
                null
              }
              extra={v.extra?v.extra:null}
            >
              {v.text}<Brief>{v.brief?v.brief:null}</Brief>
            </Item>
          )
        }
      </List>
      </div>
    );
  }
}

export default ProfileInfo;