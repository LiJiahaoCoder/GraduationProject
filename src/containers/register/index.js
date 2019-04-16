import React, { Component } from 'react';
// antd-mobile components
import { 
  List,
  InputItem,
  WhiteSpace,
  Button,
  Radio,
  Flex,
  Toast
} from 'antd-mobile';
// logo
import Logo from '../../components/logo'
// route
import { Redirect } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// reducer
import { register } from '../../redux/user.redux';
// container
import Footer from '../../components/footer';

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      repeatpwd: '',
      password: '',
      gender: 0,
      mail: '',
      phoneNumber: '',
      hasPhoneError: false
    };

    this.login = this.login.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onErrorClick = this.onErrorClick.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  login() {
    this.props.history.push('/login');
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  onPhoneChange(v) {
    if (v.replace(/\s/g, '').length < 11) {
      this.setState({
        hasPhoneError: true,
      });
    } else {
      this.setState({
        hasPhoneError: false,
      });
    }
    this.setState({
      phoneNumber: v
    });
  }

  onErrorClick(info) {
    Toast.info(info, 1.5);
  }

  handleRegister() {
    this.props.register(this.state);
  }

  isError() {
    return (
      (this.state.account.length<6 || !/^[a-z0-9]+$/.test(this.state.account)) ||
      (!(this.state.password === this.state.repeatpwd) || 
      !(this.state.password.indexOf(' ') === -1)) ||
      (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.mail)) ||
      (this.state.hasPhoneError || !this.state.phoneNumber) ||
      this.state.password.length<6);
  }

  render() {
    return (
      <div
        style={{
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '-1',
            backgroundColor: '#b8e5f8',
            backgroundImage: 'url(http://localhost:8888/static/images/background.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              width: '100%',
              height: '100vh',
              overflow: 'auto'
        }}
      >
        {this.props.isAuth ? <Redirect to='' /> : null}
        <Flex
          direction='column'
          align='center'
          justify='center'
        >
          <Flex.Item>
            <Logo />
          </Flex.Item>
          <Flex.Item>
            <List>
              <InputItem
                error={
                  this.state.account.length<6 ||
                  !/^[a-z0-9]+$/.test(this.state.account)
                }
                onErrorClick={info => this.onErrorClick('由6-12位数字和小写字母组成')}
                maxLength={12}
                placeholder='6 - 12位非空字符串'
                onChange={v => this.handleChange('account', v)}
                value={this.state.account}
              >
                用户名
              </InputItem>
              <WhiteSpace />
              <InputItem
                error={
                  this.state.password.length<6 ||
                  !(this.state.password.indexOf(' ') === -1)
                }
                onErrorClick={info => this.onErrorClick('密码由6-16位数字和字母组成')}
                maxLength={16}
                placeholder='请输入密码'
                onChange={v => this.handleChange('password', v)}
                type='password'
                value={this.state.password}
              >
                密码
              </InputItem>
              <WhiteSpace />
              <InputItem
                error={!(this.state.password === this.state.repeatpwd)}
                onErrorClick={info => this.onErrorClick('两次密码输入不同')}
                placeholder='请再次输入密码'
                onChange={v => this.handleChange('repeatpwd', v)}
                type='password'
              >
                确认密码
              </InputItem>
              <WhiteSpace />
              <Flex style={{padding: '0 15px'}}>
                <Flex.Item>
                  <Radio
                    checked={this.state.gender === 0}
                    onChange={() => this.handleChange('gender', 0)}
                    className='my-radio'
                  >
                    男
                  </Radio>
                </Flex.Item>
                <Flex.Item>
                  <Radio
                    checked={this.state.gender === 1}
                    onChange={() => this.handleChange('gender', 1)}
                    className='my-radio'
                  >
                    女
                  </Radio>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <InputItem
                error={!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.mail)}
                onErrorClick={info => this.onErrorClick('请输入正确的邮箱地址')}
                placeholder='请输入邮箱'
                onChange={v => this.handleChange('mail', v)}
                value={this.state.mail}
              >
                邮箱
              </InputItem>
              <WhiteSpace />
              <InputItem
                type='phone'
                placeholder='请输入手机号'
                error={this.state.hasPhoneError}
                onErrorClick={info => this.onErrorClick('请输入正确手机号')}
                onChange={this.onPhoneChange}
                value={this.state.phoneNumber}
              >
                手机号
              </InputItem>
              <WhiteSpace />
              <Button
                className='my-button'
                type='primary'
                disabled={this.isError()}
                onClick={this.handleRegister}
              >
                注册
              </Button>
              <WhiteSpace />
            </List>
          </Flex.Item>
          <Flex.Item>
            <div className='register-redirector'>
              已有账号？
              <span className='register-login' onClick={this.login}>登录</span>
            </div>
          </Flex.Item>
        </Flex>
        <Footer />
      </div>
    );
  }
}

export default Register;