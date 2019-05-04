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
import {removeFavorite} from '../../redux/user.redux';
import {getFavorite} from '../../redux/goods.redux';

const alert = Modal.alert;

@connect(
  state => state,
  {removeFavorite, getFavorite}
)
class Favorite extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.toGoodsInfo = this.toGoodsInfo.bind(this);
  }

  componentDidMount() {
    this.props.getFavorite(this.props.user.favorite);
  }

  handleRemoveFavorite(v) {
    const {mail} = this.props.user;
    const {_id} = v;
    this.props.removeFavorite({mail, _id});
  }

  toGoodsInfo(id) {
    this.props.history.push(`/goodsinfo/${id}`);
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
            this.props.user.favorite[0] ?
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
                    content={v.status}
                    extra={<span onClick={() =>
                      alert('取消收藏', '确定取消收藏？', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.handleRemoveFavorite(v) },
                      ])}
                      >
                        <img style={{height: '24px'}} src={`${ICON_PATH}added-favorite.svg`} alt='' />
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
      </div>
    );
  }
}

export default Favorite;