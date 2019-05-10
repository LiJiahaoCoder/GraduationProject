import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  WhiteSpace,
  Carousel,
  Icon,
  List,
  TextareaItem,
  Button,
  Modal
} from 'antd-mobile';
import { Redirect } from 'react-router-dom';

import {GOODS_PATH, ICON_PATH} from '../../path';
import {deletePublish} from '../../redux/goods.redux';
import {addFavorite, removeFavorite, addToCart} from '../../redux/user.redux';

const alert = Modal.alert;

@connect(
  state => state,
  {deletePublish, addFavorite, removeFavorite, addToCart}
)
class GoodsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      imgHeight: 176
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    const goods = this.props.goods.goodsList.filter( v => v._id === this.props.match.params.id);
    this.setState({goods: goods});
  }

  handleDelete() {
    const {_id} = this.state.goods[0];
    const {mail} = this.props.user;
    this.props.deletePublish({mail, _id});
    setTimeout(() => {
      if(this.props.goods.isDelete)
        this.props.history.goBack();
    }, 1000);
  }

  handleAddFavorite() {
    const {mail} = this.props.user;
    const {_id} = this.state.goods[0];
    this.props.addFavorite({mail, _id});
  }

  handleRemoveFavorite() {
    const {mail} = this.props.user;
    const {_id} = this.state.goods[0];
    this.props.removeFavorite({mail, _id});
  }

  handleAddToCart() {
    const {mail} = this.props.user;
    const {_id} = this.state.goods[0];
    this.props.addToCart({mail, _id});
  }

  render() {
    return (
      <div>
        {
          this.props.user.isAuth ? 
            <>
              <div>
          <NavBar
            mode='light'
            icon={<Icon type='left' />}
            onLeftClick={() => this.props.history.goBack()}
          >
            {
              this.state.goods[0] ?
                this.state.goods[0].name:
                '加载中...'
            }
          </NavBar>
        </div>
        {
          this.state.goods[0] ?
            <div
              style={{
                backgroundColor: '#ffffff',
                height: '95vh',
                marginBottom: '40px'
              }}
            >
              <Carousel
                autoplay
                infinite
              >
                {
                  this.state.goods[0].images.map(val => (
                    <span
                      key={val}
                      style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                      <img
                        src={`${GOODS_PATH}${val}`}
                        alt=''
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                      />
                    </span>
                  ))
                }
              </Carousel>
              <WhiteSpace size='lg' />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                  fontSize: '1.1rem'
                }}
              >
                <span style={{color: '#666', fontWeight: 'bold'}}>
                  <span>
                    <img style={{height: '1.1rem'}} src={`${ICON_PATH}star-coin.svg`} alt='' />
                  </span>
                  {'  ' + this.state.goods[0].price}
                </span>
                {
                  this.state.goods[0].owner === this.props.user.mail ?
                    <Button
                      inline
                      size='small'
                      style={{
                        color: '#aaaaaa',
                        border: '1px solid #aaaaaa'
                      }}
                      onClick={() =>
                        alert('下架', '确定下架商品吗？', [
                          { text: '取消', onPress: () => console.log('cancel') },
                          { text: '确定', onPress: this.handleDelete },
                        ])}
                    >
                      下架商品
                    </Button>
                    :
                    (
                      this.props.user.favorite.some(v => v.goodsId === this.state.goods[0]._id) ?
                        <span
                          onClick={this.handleRemoveFavorite}
                        >
                          <img style={{height: '1.2rem'}} src={`${ICON_PATH}added-favorite.svg`} alt='' />
                        </span>
                        :
                        <span
                          onClick={this.handleAddFavorite}
                        >
                          <img style={{height: '1.2rem'}} src={`${ICON_PATH}unadd-favorite.svg`} alt='' />
                        </span>
                    )
                }
              </div>
              <WhiteSpace />
              <div
                style={{
                  padding: '0 20px'
                }}
              >
                <span
                  style={{
                    width: '90vw',
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {this.state.goods[0].name}
                </span>
              </div>
              <WhiteSpace />
              <List>
                <List.Item extra={this.state.goods[0].brand}>品牌</List.Item>
                <List.Item
                  extra={
                    Number(this.state.goods[0].newLevel) === 10 ? '全新' : `${this.state.goods[0].newLevel}成新`
                  }
                >
                  新旧等级
                </List.Item>
                <List.Item extra={this.state.goods[0].boughtTime}>购买时间</List.Item>
              </List>
              <TextareaItem
                editable={false}
                value={this.state.goods[0].introduction}
                rows={4}
              />
              {
                this.state.goods[0].owner === this.props.user.mail ?
                  <div
                    style={{
                      height: '40px',
                      display: 'grid',
                      textAlign: 'center',
                      position: 'fixed',
                      width: '100vw',
                      bottom: 0,
                      lineHeight: '40px',
                      color: '#f2eee0',
                      fontSize: '1rem'
                    }}
                  >
                    <span style={{backgroundColor: '#85ef47'}}>这是自己的商品哦(✪ω✪)</span>
                  </div>
                  : 
                  <div className='goodsinfo-bottom-bar'>
                    <span style={{backgroundColor: '#49beb7'}}>联系卖家</span>
                    {
                      this.props.user.cart.some(v => v.goodsId === this.props.match.params.id) ?
                      <span style={{backgroundColor: '#f3ae4b'}}>已加入购物车</span> :
                      <span style={{backgroundColor: '#fabc60'}} onClick={this.handleAddToCart}>加入购物车</span>
                    }
                    <span style={{backgroundColor: '#ff5959'}}>立即购买</span>
                  </div>
              }
            </div>
            : null
        }
            </>
            :
            <Redirect to='/login' />
        }
      </div>
    );
  }
}

export default GoodsInfo;