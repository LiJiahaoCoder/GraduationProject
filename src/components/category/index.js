import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';

const TABS = [
  {
    title: '男装',
    content: []
  },
  {
    title: '女装',
    content: []
  },
  {
    title: '男鞋',
    content: []
  },
  {
    title: '女鞋',
    content: []
  },
  {
    title: '手机数码',
    content: []
  },
  {
    title: '家用电器',
    content: []
  },
  {
    title: '生活用品',
    content: []
  },
  {
    title: '其它',
    content: []
  }
];

class Category extends Component {
  render() {
    return (
      <div style={{ height: '90vh' }}>
        <WhiteSpace />
        <Tabs tabs={TABS}
          tabBarPosition='left'
          tabDirection='vertical'
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default Category;