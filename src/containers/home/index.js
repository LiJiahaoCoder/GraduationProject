import React, { Component } from 'react';
import { Carousel, SearchBar, Grid, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';

import {GOODS_PATH} from '../../path';
import {loadByPage} from '../../redux/goods.redux';

@connect(
  state => state.goods,
  {loadByPage}
)
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      carouselData: [1, 2, 3],
      goodsItems: []
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.loadByPage({page: 0, itemNum: 60});
    // console.log(this.props);
    this.setState({
      carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.goodsList !== prevProps.goodsList) {
      const data = this.props.goodsList.map(v => (
        {
          icon: `${GOODS_PATH}${v.images[0]}`,
          text: v.name,
          id: v._id
        })
      );
      this.setState({goodsItems: data});
    }
  }

  onSearchChange(val) {
    this.setState({searchValue: val});
  }

  handleClick(id) {
    this.props.history.push(`/goodsinfo/${id}`);
  }

  render() {
    return (
      <div>
        <SearchBar
          value={this.state.searchValue}
          placeholder='搜索'
          maxLength={16}
          onChange={this.onSearchChange}
        />
        <Carousel
          autoplay={true}
          infinite={true}
        >
          {this.state.carouselData.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: 'auto' }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
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
              style={{ padding: '12.5px', zIndex: 1 }}
              onClick={() => this.handleClick(dataItem.id)}
            >
              <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span>{dataItem.text}</span>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default Home;