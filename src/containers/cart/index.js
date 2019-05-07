import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Icon,
  WhiteSpace,
  WingBlank,
  Modal,
  Checkbox
} from 'antd-mobile';

import {removeCart} from '../../redux/user.redux';
import {getCart} from '../../redux/goods.redux';
import {GOODS_PATH, ICON_PATH} from '../../path';

const alert = Modal.alert;

@connect(
  state => state,
  {removeCart, getCart}
)
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNumber: 0,
      isAllSelected: false
    };

    this.handleRemoveCart = this.handleRemoveCart.bind(this);
    this.toGoodsInfo = this.toGoodsInfo.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
    if(this.props.user.cart[0])
      this.props.getCart(this.props.user.cart);
  }

  handleRemoveCart(v) {
    const {mail} = this.props.user;
    const {_id} = v;
    this.props.removeCart({mail, _id});
  }

  toGoodsInfo(id) {
    this.props.history.push(`/goodsinfo/${id}`);
  }

  handleCheckboxChange({target}) {
    // console.log(target);
    if(target.checked) {
      this.setState({
        selectedNumber: this.state.selectedNumber + 1
      });
      if(this.state.selectedNumber + 1 === this.props.user.cart.length)
        this.setState({isAllSelected: true});
    }
    else {
      this.setState({
        selectedNumber: this.state.selectedNumber - 1
      });
      this.setState({isAllSelected: false});
    }
  }

  render() {
    return (
      <div
        style={{
          height: '92vh',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <WhiteSpace />
        <WingBlank size='sm'>
          {
            this.props.user.cart[0] ?
            this.props.goods.goodsList.map(v => 
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
                    content={<Checkbox onChange={this.handleCheckboxChange}/>
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
            ):
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
          <Checkbox
            checked={this.state.isAllSelected}
            style={{color: '#444'}}
          >
            &nbsp;&nbsp;全选
          </Checkbox>
          <span style={{color: '#888888'}}>已选中{this.state.selectedNumber}件商品</span>
          <span>
            共计：xxx
            <img style={{height: '16px'}} src={`${ICON_PATH}star-coin.svg`} alt='' />
            &nbsp;&nbsp;
            <button>结算</button>
          </span>
        </div>
      </div>
    );
  }
}

export default Cart;