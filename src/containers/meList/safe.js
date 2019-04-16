import React, { Component } from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

@withRouter
@connect (
  state => state.user
)
class Safe extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace />
        <List>
          <List.Item extra={this.props.account}>账号</List.Item>
          <List.Item extra={this.props.phoneNumber}>手机号</List.Item>
          <List.Item extra={this.props.mail}>邮箱</List.Item>
          <List.Item
            arrow='horizontal'
            onClick={()=>this.props.history.push('/me/modifypassword')}
          >
            密码
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Safe;