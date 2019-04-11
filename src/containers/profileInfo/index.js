import React, { Component } from 'react';
import { NavBar, Icon, List } from 'antd-mobile';

const Item = List.Item;


class ProfileInfo extends Component {
  render() {
    const title = this.props.match.params.useraccount === 'me' ? '我的资料' : this.props.otherNickname;

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
        <h1>Hello {this.props.match.params.useraccount}!</h1>
      </div>
    );
  }
}

export default ProfileInfo;