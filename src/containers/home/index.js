import React, { Component } from 'react';
import { Carousel, SearchBar, Grid, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';

import {GOODS_PATH, AVATAR_PATH} from '../../path';
import {loadByPage, search, setGoodsInfo, clear} from '../../redux/goods.redux';
import {getMsgList} from '../../redux/chat.redux';

@connect(
  state => state,
  {loadByPage, search, setGoodsInfo, getMsgList, clear}
)
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      carouselData: [1, 2, 3],
      goodsItems: [],
      imgHeight: 176,
      page: 0
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmite = this.handleSubmite.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.setGoodsInfo('goodsList');
    this.props.clear();
    this.props.loadByPage({page: this.state.page, itemNum: 12});
    // console.log(this.props);
    this.setState({
      carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.goods.goodsList !== prevProps.goods.goodsList) {
      const data = this.props.goods.goodsList.map(v => (
        {
          icon: `${GOODS_PATH}${v.images[0]}`,
          text: v.name,
          id: v._id
        })
      );
      if(this.props.user.isAuth) {
        this.props.getMsgList();
      }
      this.setState({goodsItems: data});
    }
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      if(this.props.goods.goodsList === nextProps.goods.goodsList) {
        this.setState({isLoadMore: false});
      }
      return true;
    }
    return true;
  } */

  onSearchChange(val) {
    this.setState({searchValue: val});
  }

  handleClick(id) {
    this.props.history.push(`/goodsinfo/${id}`);
  }

  handleSubmite() {
    // console.log(this.state.searchValue);
    this.props.search({name: this.state.searchValue, brand: this.state.searchValue});
    setTimeout(() => this.props.history.push(`/search/${this.state.searchValue}`), 200);
  }

  handleLoadMore() {
    let page = this.state.page;
    this.setState({page: ++page});
    this.props.loadByPage({page: page, itemNum: 12});
  }

  render() {
    return (
      <div
        style={{
          height: '93vh',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <SearchBar
          value={this.state.searchValue}
          placeholder='搜索'
          maxLength={16}
          onChange={this.onSearchChange}
          onSubmit={this.handleSubmite}
        />
        <Carousel
          autoplay
          infinite
        >
          {this.state.carouselData.map(val => (
            <a
              key={val}
              href="https://mobile.ant.design/index-cn"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <WhiteSpace />
        <Grid
          data={this.state.goodsItems}
          columnNum={3}
          renderItem={dataItem => (
            <div
              key={dataItem.id}
              style={{ padding: '12.5px'}}
              onClick={() => this.handleClick(dataItem.id)}
            >
              <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt='' />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {dataItem.text}
                </span>
              </div>
            </div>
          )}
        />
        {
          this.props.goods.isLoadMore ?
            <div
              style={{
                textAlign: 'center',
                height: '2.5rem',
                lineHeight: '2.5rem',
                fontSize: '1rem',
                color: '#666666',
              }}
              onClick={this.handleLoadMore}
            >
              点击加载更多...
            </div> :
            <div
              style={{
                textAlign: 'center',
                height: '2.5rem',
                lineHeight: '2.5rem',
                fontSize: '1rem',
                color: '#666666',
              }}
            >
              没有更多商品了o(╥﹏╥)o...
            </div>
        }
      </div>
    );
  }
}

export default Home;