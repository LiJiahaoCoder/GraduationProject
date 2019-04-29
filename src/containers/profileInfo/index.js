import React, { Component } from 'react';
import { List, ImagePicker, WingBlank, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
// components
import NavBarHeader from '../../components/navbarHeader';
// reducer
import { uploadImage, updateInfo } from '../../redux/user.redux';
import { AVATAR_PATH } from '../../path';

const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

@connect(
  state => state.user,
  {uploadImage, updateInfo}
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

  onChange(files) {
    console.log('----- enter onChange function -----');
    console.log(files[files.length - 1].file);
    let fd = new FormData();
    fd.append('file', files[files.length - 1].file);
    fd.append('mail', this.props.mail);
    this.props.uploadImage({fd: fd, avatar: true});
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
    const meComponent = (<List>
      <Item
        arrow='empty'
      >
        <WingBlank>
          <form encType='multipart/form-data'>
            <ImagePicker
              onChange={files => this.onChange(files)}
              files={[{url: `${AVATAR_PATH}${this.props.avatar}`, id: this.props._id}]}
              onImageClick={(index, fs) => console.log(index, fs)}
            />
          </form>
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
    </List>);

    return (
      <div style={{position: 'relative', zIndex: '1'}}>
        <NavBarHeader title={title} />
        {this.props.match.params.useraccount === 'me' ? meComponent : null}
      </div>
    );
  }
}

export default ProfileInfo;