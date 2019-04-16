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
import { refindEnsureCode } from '../../redux/user.redux';

@connect(
  state => state.user,
  {refindEnsureCode}
)
class Refind2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onErrorClick = this.onErrorClick.bind(this);
    this.isError = this.isError.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleEnsureCode = this.handleEnsureCode.bind(this);
  }

  handleChange(v) {
    this.setState({code: v});
  }

  onErrorClick(info) {
    Toast.info(info, 1.5);
  }

  isError() {
    return this.state.code.length === 6;
  }

  redirectTo(route) {
    this.props.history.push(route);
  }

  handleEnsureCode() {
    const code = this.state.code;
    const mail = this.props.mail;
    this.props.refindEnsureCode({code, mail});
  }

  render() {
    return (
      <>
        {this.props.ensureCode ? <Redirect to='/refind/step3' /> : null}
        <div className='refind-header'>
          <div className='refind-text'>找回密码</div>
          <div className='refind-hint'>验证码将会发送至你的注册邮箱</div>
        </div>
        <List>
          <InputItem
            placeholder='邮箱中验证码'
            maxLength={6}
            error={!this.isError()}
            onErrorClick={info => this.onErrorClick('请输入正确的验证码')}
            onChange={v => this.handleChange(v)}
            value={this.state.code}
          />
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button
          className='my-button'
          type='primary'
          disabled={!this.isError()}
          onClick={this.handleEnsureCode}
        >
          下一步
        </Button>
        <div className='refind-redirector-container'>
          <span className='refind-register' onClick={()=>this.redirectTo('register')}>注册</span>
          <span className='refind-login' onClick={()=>this.redirectTo('login')}>登录</span>
        </div>
      </>
    );
  }
}

export default Refind2;