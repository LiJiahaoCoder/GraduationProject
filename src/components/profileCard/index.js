import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// assets path
import { ICON_PATH, AVATAR_PATH } from '../../path';

@withRouter
@connect(
  state => state.user
)
class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.isAuth)
      this.props.history.push('/profileinfo/me');
    else
      this.props.history.push('/login');
  }

  render() {
    const user = this.props;
    const gender = {
      0: 'male',
      1: 'female'
    };
    return (
      <div style={{
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
            src={user.isAuth?AVATAR_PATH+user.avatar:`${AVATAR_PATH}login.png`}
            alt='(ಥ_ಥ)'
          />
        </span>
        <span
          style={{color: '#eeeeee', marginLeft: '-2.5rem'}}
          onClick={this.handleClick}
        >
        {user.isAuth?
          (
          <div>
            <span style={{verticalAlign: 'middle'}}>{user.nickname}</span>
            <img style={{height: '22px', verticalAlign: 'middle', paddingLeft: '10px'}} src={`${ICON_PATH}gender-${gender[user.gender]}.png`} alt='你是GG还是MM' />
            <div style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '150px',
              paddingTop: '10px'
            }}>{user.introduction}
            </div>
          </div>
          ):
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