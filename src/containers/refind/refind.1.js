import React, { Component } from 'react';
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
import { refindSendMail } from '../../redux/user.redux';

@connect(
  state => state.user,
  {refindSendMail}
)
class Refind1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onErrorClick = this.onErrorClick.bind(this);
    this.isError = this.isError.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleRefind = this.handleRefind.bind(this);
  }

  handleChange(v) {
    this.setState({mail: v});
  }

  onErrorClick(info) {
    Toast.info(info, 1.5);
  }

  isError() {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.mail);
  }

  redirectTo(route) {
    this.props.history.push(route);
  }

  handleRefind() {
    this.props.refindSendMail(this.state);
  }

  render() {
    return (
      <>
        {this.props.sentReset ? <Redirect to='/refind/step2' /> : null}
        <div className='refind-header'>
          <div className='refind-text'>找回密码</div>
          <div className='refind-hint'>验证码将会发送至你的注册邮箱</div>
        </div>
        <List>
          <InputItem
            placeholder='注册邮箱'
            error={!this.isError()}
            onErrorClick={info => this.onErrorClick('请输入正确的邮箱地址')}
            onChange={v => this.handleChange(v)}
            value={this.state.mail}
          />
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button
          className='my-button'
          type='primary'
          disabled={!this.isError()}
          onClick={this.handleRefind}
        >
          发送
        </Button>
        <div className='refind-redirector-container'>
          <span className='refind-register' onClick={()=>this.redirectTo('register')}>注册</span>
          <span className='refind-login' onClick={()=>this.redirectTo('login')}>登录</span>
        </div>
      </>
    );
  }
}

export default Refind1;