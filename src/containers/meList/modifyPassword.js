import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Flex, InputItem, Button } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBarHeader from '../../components/navbarHeader';
import { listTitle, getTitle } from './listTitle';
import { updateInfo } from '../../redux/user.redux';

@withRouter
@connect(
  state => state.user,
  {updateInfo}
)
class ModifyPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WingBlank size='sm'>
          <WhiteSpace />
          <WhiteSpace />
          <div style={{color: '#aaa'}}>
            请设置易密码。
          </div>
          <WhiteSpace />
          <WhiteSpace />
          <InputItem
            disabled={true}
            placeholder={this.props.account}
          >
            易账号
          </InputItem>
          <InputItem
            placeholder='输入新密码'
            type='password'
          >
            新密码
          </InputItem>
          <InputItem
            placeholder='确认密码'
            type='password'
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <Button
            type='primary'
            onClick={()=>console.log('sure')}
          >
            确定
          </Button>
          <WhiteSpace />
          <WhiteSpace />
          <div style={{color: '#666'}}>
            密码是6-16位数的数字、字符组合
          </div>
          <WhiteSpace />
          <span
            style={{color: 'blue'}}
            onClick={()=>this.props.history.push('/refind')}
          >
            忘记原密码？
          </span>
        </WingBlank>
      </div>
    );
  }
}

export default ModifyPassword;