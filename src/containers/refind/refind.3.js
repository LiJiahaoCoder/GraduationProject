import React from 'react';
// antd-mobile components
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile';
// route
import {
  Redirect
} from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// reducer
import { modifyPassword } from '../../redux/user.redux';

@connect(
  state => state.user,
  {modifyPassword}
)
class Refind3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onErrorClick = this.onErrorClick.bind(this);
    this.isError = this.isError.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleModifyPassword = this.handleModifyPassword.bind(this);
  }

  handleChange(v) {
    this.setState({newPassword: v});
  }

  onErrorClick(info) {
    Toast.info(info, 1.5);
  }

  isError() {
    return !(this.state.newPassword.length<6 || !(this.state.newPassword.indexOf(' ') === -1));
  }

  redirectTo(route) {
    this.props.history.push(route);
  }

  handleModifyPassword() {
    const newPassword = this.state.newPassword;
    const mail = this.props.mail;
    this.props.modifyPassword({newPassword, mail});
  }

  render() {
    return (
      <>
        {this.props.isModified ? <Redirect to='/login' /> : null}
        <div className='refind-header'>
          <div className='refind-text'>找回密码</div>
          <div className='refind-hint'>验证码将会发送至你的注册邮箱</div>
        </div>
        <List>
          <InputItem
            placeholder='新密码'
            maxLength={16}
            error={!this.isError()}
            onErrorClick={info => this.onErrorClick('请输入正确的密码')}
            onChange={v => this.handleChange(v)}
            value={this.state.newPassword}
            type='password'
          />
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button
          type='primary'
          disabled={!this.isError()}
          onClick={this.handleModifyPassword}
        >
          确定
        </Button>
        <div className='refind-redirector-container'>
          <span className='refind-register' onClick={()=>this.redirectTo('register')}>注册</span>
          <span className='refind-login' onClick={()=>this.redirectTo('login')}>登录</span>
        </div>
      </>
    );
  }
}

export default Refind3;