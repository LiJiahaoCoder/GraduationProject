import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Toast, InputItem, Button } from 'antd-mobile';
import { withRouter, Redirect } from 'react-router-dom';
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

    this.state = {
      newPassword: '',
      confirmPwd: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.isError = this.isError.bind(this);
    this.onErrorClick = this.onErrorClick.bind(this);
    this.handleSure = this.handleSure.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  isError() {
    return (!(this.state.newPassword === this.state.confirmPwd) || 
      !(this.state.newPassword.indexOf(' ') === -1)) || 
      !(this.state.newPassword.length >= 6);
  }

  onErrorClick(info) {
    Toast.info(info, 1.5);
  }

  handleSure() {
    const password = this.state.newPassword;
    this.props.updateInfo({mail: this.props.mail, password: password});
    console.log('dispatch success');
  }

  render() {
    return (
      <div>
        {this.props.isAuth ? null : <Redirect to='/login' />}
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
            error={
              this.state.newPassword.length<6 ||
              !(this.state.newPassword.indexOf(' ') === -1)
            }
            placeholder='输入新密码'
            onErrorClick={info => this.onErrorClick('密码由6-16位数字和字母组成')}
            maxLength={16}
            onChange={v => this.handleChange('newPassword', v)}
            type='password'
          >
            新密码
          </InputItem>
          <InputItem
            error={!(this.state.newPassword === this.state.confirmPwd)}
            onErrorClick={info => this.onErrorClick('两次密码输入不同')}
            onChange={v => this.handleChange('confirmPwd', v)}
            placeholder='确认密码'
            type='password'
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <Button
            type='primary'
            disabled={this.isError()}
            onClick={this.handleSure}
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