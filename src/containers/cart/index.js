import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Icon,
  WhiteSpace,
  WingBlank,
  Modal,
  Checkbox,
  Toast
} from 'antd-mobile';
import { Redirect } from 'react-router-dom';

import {removeCart} from '../../redux/user.redux';
import {getCart} from '../../redux/goods.redux';
import {createOrder} from '../../redux/order.redux';
import {GOODS_PATH, ICON_PATH} from '../../path';

const alert = Modal.alert;

@connect(
  state => state,
  {removeCart, getCart, createOrder}
)
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNumber: 0,
      allProps: {
        checked: false,
        style:{color: '#444'}
      },
      itemProps: [],
      totalPrice: 0
    };

    this.handleRemoveCart = this.handleRemoveCart.bind(this);
    this.toGoodsInfo = this.toGoodsInfo.bind(this);
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePayClick = this.handlePayClick.bind(this);
  }

  componentDidMount() {
    if(this.props.user.isAuth)
      if(this.props.user.cart[0]) {
        this.props.getCart(this.props.user.cart);
        this.setState({
          itemProps: new Array(this.props.user.cart.length).fill(false)
        })
      }
  }

  handleRemoveCart(v) {
    const {mail} = this.props.user;
    const {_id} = v;
    this.props.removeCart({mail, _id});
  }

  toGoodsInfo(id) {
    this.props.history.push(`/goodsinfo/${id}`);
  }

  /* handleCheckboxChange({target}) {
    // console.log(target);
    if(target.checked) {
      this.setState({
        selectedNumber: this.state.selectedNumber + 1
      });
      if(this.state.selectedNumber + 1 === this.props.user.cart.length)
        this.setState({
          allProps: {checked: true, style:{color: '#444'}},
          isAllSelected: true
        });
    }
    else {
      this.setState({
        selectedNumber: this.state.selectedNumber - 1
      });
      this.setState({
        allProps: {checked: false, style:{color: '#444'}},
        isAllSelected: false
      });
    }
  } */

  handleAllClick() {
    let allState = this.state.allProps.checked;
    this.setState({
      allProps: {
        checked: !allState,
        style:{color: '#444'}
      },
      selectedNumber: !allState ? this.props.user.cart.length : 0,
      totalPrice: !allState ? 'test': 0
    });

    let price = this.props.goods.cart
                                .filter(item => isIncludes(item._id, this.props.user.cart))
                                .reduce((acc, cur) => {
                                  acc += cur.price;
                                  return acc;
                                }, 0);
    let tmp = this.state.itemProps.map(v => !allState);
    this.setState({
      itemProps: tmp,
      totalPrice: !allState ? price: 0
    });
  }

  handleItemClick(index) {
    let tmp = this.state.itemProps;
    let number = this.state.selectedNumber;
    let list = this.props.goods.cart.filter(item => isIncludes(item._id, this.props.user.cart));

    tmp[index] = !tmp[index];
    this.setState({
      itemProps: tmp
    });
    if(tmp[index]){
      this.setState({
        selectedNumber: ++number,
        totalPrice: this.state.totalPrice + list[index].price
      });
    }
    else {
      this.setState({
        selectedNumber: --number,
        totalPrice: this.state.totalPrice - list[index].price
      });
    }
    if(number === this.props.user.cart.length)
      this.setState({
        allProps: {
          checked: true,
          style:{color: '#444'}
        }
      });
    else
      this.setState({
        allProps: {
          checked: false,
          style:{color: '#444'}
        }
      });
  }

  handlePayClick() {
    const orderList = this.props.goods.cart.filter((item, index) => this.state.itemProps[index]);
    if(orderList[0]) {
      if(this.state.totalPrice <= this.props.user.stars) {
        this.props.createOrder(orderList);
        this.props.history.push('/order');
      } else {
        Toast.info('星数量不足', 1.5);
      }
    } else {
      Toast.info('未选中要购买的商品', 1.5);
    }
  }

  render() {
    return (
      <div
        style={{
          height: '87vh',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {this.props.user.isAuth ?
          <>
          <WhiteSpace />
        <WingBlank size='sm'>
          {
            this.props.user.cart[0] ?
            this.props.goods.cart.filter(item => isIncludes(item._id, this.props.user.cart)).map((v, index) => 
              <React.Fragment key={v.name}>
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
                      <Checkbox
                        checked={this.state.itemProps[index]}
                        onClick={() => this.handleItemClick(index)}
                      />
                    }
                    extra={<span onClick={() =>
                      alert('移除物品', '确定移除物品？', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.handleRemoveCart(v) },
                      ])}
                      >
                        <Icon type='cross-circle' />
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
              <h3 style={{textAlign: 'center'}}>暂无收藏商品</h3>
            </div>
          }
        </WingBlank>
        <div
          style={{
            height: '40px',
            position: 'fixed',
            bottom: '49px',
            border: '1px solid #eeeeee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            width: '100%',
            padding: '0 10px',
            boxSizing: 'border-box'
          }}
        >
          <Checkbox {...this.state.allProps} onClick={this.handleAllClick}>
            &nbsp;&nbsp;全选
          </Checkbox>
          <span style={{color: '#888888'}}>已选中{this.state.selectedNumber}件商品</span>
          <span>
            共计：
            <span
              style={{
                maxWidth: '42px',
                display: 'inline-block',
                textAlign: 'right'
              }}
            >
              {this.state.totalPrice}&nbsp;
            </span>
            <img style={{height: '16px'}} src={`${ICON_PATH}star-coin.svg`} alt='' />
            &nbsp;&nbsp;
            <button
              className='cart-button'
              style={{
                width: '50px',
                height: '28px',
                border: '1px solid #bbb',
                borderRadius: '4px',
                backgroundColor: '#ffffff'
              }}
              onClick={this.handlePayClick}
            >
               结算
            </button>
          </span>
        </div>
        </>
          : <Redirect to='/login' />
        }
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

export default Cart;