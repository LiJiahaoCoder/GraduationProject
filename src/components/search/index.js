import React from 'react';
import { connect } from 'react-redux';
import { Grid, NavBar, Icon, WhiteSpace } from 'antd-mobile';

import {GOODS_PATH} from '../../path';

@connect(
  state => state.goods
)
class SearchGoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goodsItems: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const data = this.props.goodsList.map(v => (
      {
        icon: `${GOODS_PATH}${v.images[0]}`,
        text: v.name,
        id: v._id
      })
    );
    this.setState({goodsItems: data});
  }

  handleClick(id) {
    this.props.history.push(`/goodsinfo/${id}`);
  }
  
  render() {
    return (
      <div>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >
          搜索结果
        </NavBar>
        {
          this.state.goodsItems[0] ?
            (<Grid
              data={this.state.goodsItems}
              columnNum={3}
              renderItem={dataItem => (
                <div
                  key={dataItem.id}
                  style={{ padding: '12.5px', zIndex: 1 }}
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
            />)
            :
            <div>
              <WhiteSpace size='lg' />
              <h3 style={{textAlign: 'center'}}>暂无此类商品出售(•́へ•́╬)</h3>
            </div>
        }
      </div>
    );
  }
}

export default SearchGoods;