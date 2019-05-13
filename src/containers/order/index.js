import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  Icon,
  List,
  InputItem,
  Modal,
  Card,
  WhiteSpace,
  Toast
} from 'antd-mobile';

import {GOODS_PATH, ICON_PATH} from '../../path';

const Item = List.Item;
const alert = Modal.alert;

@connect (
  state => state
)
class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      to: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBuyClick = this.handleBuyClick.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      phoneNumber: this.props.user.phoneNumber
    });
  }

  handleChange(value, key) {
    value = value.replace(/\s/g, '');
    this.setState({
      [key]: value
    });
  }

  handleBuyClick() {
    const {phoneNumber, to} = this.state;
    const orders = this.props.order.orderList.map(v => ({
      goodsId: v._id,
      status: '已付款',
      buyer: this.props.user.mail,
      to: to,
      phoneNumber: phoneNumber
    }));
    if(phoneNumber && to) {
      console.info(orders);
    } else {
      Toast.info('基本信息未填写完整', 1.5);
    }
  }

  render() {
    return (
      <div
        style={{
          height: '94vh',
          overflow: 'auto'
        }}
      >
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {
            this.props.order.orderList[0] ?
              '创建订单':
              '加载中...'
          }
        </NavBar>
        <List renderHeader={() => '个人信息'} className="my-list">
          <Item extra={this.props.user.name}>卖家姓名</Item>
          <InputItem
            type='phone'
            defaultValue={this.state.phoneNumber}
            onChange={(v) => this.handleChange(v, 'phoneNumber')}
            value={this.state.phoneNumber}
          >
            手机号
          </InputItem>
          <InputItem
            onChange={(v) => this.handleChange(v, 'to')}
            value={this.state.to}
          >
            地址
          </InputItem>
        </List>
        {
          this.props.order.orderList.map(v => (
            <React.Fragment key={v.name}>
              <WhiteSpace />
              <Card>
                <Card.Header
                  onClick={() => this.toGoodsInfo(v._id)}
                  title={v.name}
                  thumb={v.images[0]?`${GOODS_PATH}${v.images[0]}`:null}
                  extra={<span>购入时间：{v.boughtTime}</span>}
                />
                <Card.Body
                  onClick={() => this.toGoodsInfo(v._id)}
                >
                  <div>{v.introduction}</div>
                </Card.Body>
                <Card.Footer
                  content={
                    <>
                      {v.price + ' '}
                      <img style={{height: '1rem'}} src={`${ICON_PATH}star-coin.svg`} alt='' />
                    </>
                  }
                />
              </Card>
            </React.Fragment>
          ))
        }
        <div onClick={this.handleBuyClick} className='order-buy'>
          购买
        </div>
      </div>
    );
  }
}

export default Order;