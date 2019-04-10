import React, { Component } from 'react';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.user.isAuth)
      this.props.user.history.push('/profileinfo');
    else
      this.props.user.history.push('/login');
  }

  render() {
    const user = this.props.user;
    const gender = {
      0: 'male',
      1: 'female'
    };
    return (
      <div style={{
        position: 'relative',
        zIndex: '1',
        height: '7rem',
        background: '#00BFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px'
      }}>
        <span
          style={{
            height: '5.4rem',
            width: '5.4rem',
            overflow: 'hidden',
            border: '4px solid #eeeeee',
            borderRadius: '50%'
          }}
          onClick={this.handleClick}
        >
          <img
            style={{
              height: '5.4rem'
            }}
            src={user.isAuth?user.avatar:'http://localhost:8888/static/images/login.png'}
            alt='(ಥ_ಥ)'
          />
        </span>
        <span
          style={{color: '#eeeeee', marginLeft: '-2.5rem'}}
          onClick={this.handleClick}
        >
        {user.isAuth?
          (
          <span>
            <span style={{verticalAlign: 'middle'}}>{user.nickname}</span>
            <img style={{verticalAlign: 'middle'}} src={`http://localhost:8888/static/images/gender-${gender[user.gender]}.png`} alt='你是GG还是MM' />
          </span>):
          '——————'}
        </span>
        <span
          style={{color: '#ffffff', fontSize: '1rem'}}
          onClick={this.handleClick}
        >
          {user.isAuth?
            <img src='http://localhost:8888/static/images/arrow-r-white.png' alt='点击登录' />:
            <span><span style={{verticalAlign: 'middle'}}>登录</span><img style={{verticalAlign: 'middle'}} src='http://localhost:8888/static/images/arrow-r-white.png' alt='点击登录' /></span>
          }
        </span>
      </div>
    );
  }
}

export default ProfileCard;