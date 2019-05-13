import React, { Component } from 'react';
// antd-mobile components
import { 
  List,
  InputItem,
  WhiteSpace,
  Button,
  Flex,
  Toast,
  Modal
} from 'antd-mobile';
// logo
import Logo from '../../components/logo';
// route
import { Redirect } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// reducer
import { login } from '../../redux/user.redux';
// container
import Footer from '../../components/footer';

@connect(
  state => state.user,
  {login}
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      showHelp: false
    };

    this.register = this.register.bind(this);
    this.refind = this.refind.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  refind() {
    this.props.history.push('/refind');
  }

  showModal() {
    this.setState({
      showHelp: true
    });
  }

  hideModal() {
    this.setState({
      showHelp: false
    });
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleLogin() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div
        style={{
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '-1',
            backgroundColor: 'rgb(255,255,255)',
            width: '100%',
            height: '100vh'
        }}
      >
      {this.props.isAuth ? <Redirect to='' /> : null}
      <span
        style={{
          position: 'absolute',
          top: '.5rem',
          right: '1rem',
          fontSize: '1.5rem',
          color: '#FFFFFF'
        }}
        onClick={() => this.props.history.push('')}
      >
        X
      </span>
      <Flex
          direction='column'
          align='center'
          justify='center'
        >
          <Flex.Item>
            <Logo type='login' />
          </Flex.Item>
          <Flex.Item>
            <List>
              <InputItem
                maxLength={24}
                placeholder='用户名或邮箱登录'
                onChange={v => this.handleChange('account', v)}
                value={this.state.account}
              >
                用户名
              </InputItem>
              <WhiteSpace />
              <InputItem
                maxLength={16}
                placeholder='请输入密码'
                onChange={v => this.handleChange('password', v)}
                type='password'
                value={this.state.password}
              >
                密码
              </InputItem>
              </List>
            </Flex.Item>
            <Flex.Item>
              <div className='login-proc-container'>
                注册即同意<span className='login-protocol'>《易协议》</span><span className='login-protocol'>《隐私保护指引》</span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <WhiteSpace />
              <Button
                className='my-button'
                type='primary'
                onClick={this.handleLogin}
              >
                登录
              </Button>
              <WhiteSpace />
          </Flex.Item>
        </Flex>
        <div
          className='login-help'
          style={{textAlign: 'right', paddingRight: '15px'}}
        >
          <span onClick={this.showModal}>需要帮助</span>
        </div>
        <Modal
          visible={this.state.showHelp}
          transparent={true}
          onClose={this.hideModal}
          title='帮助'
        >
          <Button style={{color: '#0084ff'}} onClick={this.refind}>找回密码</Button>
          <Button style={{color: '#666666'}} onClick={this.hideModal}>取消</Button>
        </Modal>
        <div className='login-register'>
          <span onClick={this.register}>注册易账号</span>
        </div>
        <Footer fontColor='#666666' bgColor='#FFFFFF' />
      </div>
    );
  }
}

export default Login;