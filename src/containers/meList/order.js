import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  Card,
  Modal
} from 'antd-mobile';
import { connect } from 'react-redux';

import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';
import {GOODS_PATH, ICON_PATH} from '../../path';
import {getOrder, setGoodsInfo, changeOrderStatus} from '../../redux/goods.redux';
import {loadOrder} from '../../redux/order.redux';

const alert = Modal.alert;

@connect(
  state => state,
  {getOrder, setGoodsInfo, changeOrderStatus, loadOrder}
)
class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: {}
    };

    this.toGoodsInfo = this.toGoodsInfo.bind(this);
    this.handleSurePress = this.handleSurePress.bind(this);
  }

  componentDidMount() {
    if(this.props.user.order[0])
      this.props.getOrder(this.props.user.order);
    this.props.loadOrder({buyer: this.props.user.mail});
    setTimeout(() => {
      let orderList = this.props.order.orderList.reduce((acc, cur)=>{
        acc[cur.goodsId] = cur.expressNumber;
        return acc;
      }, {});
      this.setState({
        orderList: orderList
      });
    }, 100);
  }

  toGoodsInfo(id) {
    this.props.setGoodsInfo('order');
    setTimeout(() => {
      this.props.history.push(`/goodsinfo/${id}`);
    }, 100);
  }

  handleSurePress(status, _id, price) {
    // console.log(status, _id);
    this.props.changeOrderStatus({status, _id, price});
    setTimeout(() => {
      this.props.getOrder(this.props.user.order);
    }, 100);
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace />
        <WingBlank size='sm'>
          {
            this.props.user.order[0] ?
            this.props.goods.order.filter( item => isIncludes(item._id, this.props.user.order)).map(v => 
              <React.Fragment key={v.name}>
                <Card>
                  <Card.Header
                    onClick={() => this.toGoodsInfo(v._id)}
                    title={v.name}
                    thumb={v.images[0]?`${GOODS_PATH}${v.images[0]}`:null}
                    extra={
                      <span style={{width: '150px', overflow: 'auto', textAlign: 'left', fontSize: '.8rem'}}>
                        <div>订单号：</div>
                        <div>{this.state.orderList[v._id] ? this.state.orderList[v._id] : '-------'}</div>
                      </span>
                    }
                  />
                  <Card.Body
                    onClick={() => this.toGoodsInfo(v._id)}
                  >
                    <div>{v.introduction}</div>
                  </Card.Body>
                  <Card.Footer
                    content={
                      v.status === '已付款' ?
                        '未发货' :
                        (
                          v.status === '未收货' ?
                            <button className='change-status-button' onClick={() =>
                              alert('确认', '确认收货？', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                { text: '确定', onPress: () => this.handleSurePress('已收货', v._id, v.price) },
                              ])
                            }>确认收货</button> :
                            '已完成交易'
                        )
                    }
                    extra={
                      <span>
                        {v.price + ' '}
                        <img style={{height: '1rem'}} src={`${ICON_PATH}star-coin.svg`} alt='' />
                      </span>
                    }
                  />
                </Card>
                <WhiteSpace />
              </React.Fragment>
            )
            :
            <div>
              <WhiteSpace size='lg' />
              <h3 style={{textAlign: 'center'}}>暂无订单</h3>
            </div>
          }
        </WingBlank>
      </div>
    );
  }
}

function isIncludes(_id, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(_id === arr[i].goodsId)
      return true;
  }
  return false;
}

export default Order;