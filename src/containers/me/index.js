import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
// components
import ProfileCard from '../../components/profileCard';

const Item = List.Item;

@connect(
  state => state.user
)
class Me extends Component {
  render() {
    const itemList = [
      {
        text: '实名',
        icon: 'id-vertify',
        path: 'idvertify',
        extra: this.props.isCertification ? '已认证' : '未认证'
      },
      {
        text: '银行卡',
        icon: 'bankcard',
        path: 'bankcard',
      },
      {
        text: '安全',
        icon: 'safe',
        path: 'safe',
      },
      {
        text: '订单',
        icon: 'order',
        path: 'order',
      },
      {
        text: '收藏',
        icon: 'favorite',
        path: 'favorite',
      },
      {
        text: '关于',
        icon: 'about',
        path: 'about',
      },
    ];
    return (
      <div style={{position: 'relative', zIndex: '1',}}>
        <ProfileCard />
        <div style={{
          backgroundColor: '#aceacf',
          width: '96vw',
          height: '7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          padding: '0 3rem',
          margin: '.5rem 2vw',
          color: '#8a8a8a'
        }}>
          <span style={{textAlign: 'center'}}>
            <img style={{height: '56px'}} src='http://localhost:8888/static/images/wallet.svg' alt='谁动了我的钱包?' />
            <br />
            <span>钱包</span>
          </span>
          <span>
            <span style={{fontSize: '2rem', marginRight: '8px'}}>{this.props.stars}</span>
            <img style={{height: '24px'}} src='http://localhost:8888/static/images/star-coin.svg' alt='我的钱钱呢?' />
          </span>
        </div>
        <List className='me-list'>
          {itemList.map(v => 
          <Item
            key={v.icon}
            arrow='horizontal'
            thumb={`http://localhost:8888/static/images/${v.icon}.svg`}
            extra={this.props.isAuth?v.extra:'——'}
            onClick={()=>{this.props.history.push(`/me/${v.path}`)}}
          >{v.text}</Item>)}
        </List>
      </div>
    );
  }
}

export default Me;