import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  WhiteSpace,
  Carousel,
  Icon,
  List,
  TextareaItem
} from 'antd-mobile';

import {GOODS_PATH, ICON_PATH} from '../../path';

@connect(
  state => state
)
class GoodsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      imgHeight: 176
    };
  }

  componentDidMount() {
    const goods = this.props.goods.goodsList.filter( v => v._id === this.props.match.params.id);
    this.setState({goods: goods});
  }
  
  render() {
    console.log(this.state.goods);
    return (
      <div>
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
                <span>
                  <img style={{height: '1.2rem'}} src={`${ICON_PATH}unadd-favorite.svg`} alt='' />
                </span>
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
                    this.state.goods[0].newLevel == 10 ? '全新' : `${this.state.goods[0].newLevel}成新`
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
              <div
                style={{
                  height: '40px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  textAlign: 'center',
                  position: 'fixed',
                  width: '100vw',
                  bottom: 0,
                  lineHeight: '40px',
                  color: '#f2eee0',
                  fontSize: '1rem'
                }}
              >
                <span style={{backgroundColor: '#49beb7'}}>联系卖家</span>
                <span style={{backgroundColor: '#fabc60'}}>加入购物车</span>
                <span style={{backgroundColor: '#ff5959'}}>立即购买</span>
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default GoodsInfo;