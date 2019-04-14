import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';

const TABS = [
  {title: '男装'},
  {title: '女装'},
  {title: '男鞋'},
  {title: '女鞋'},
  {title: '手机数码'},
  {title: '家用电器'},
  {title: '生活用品'},
  {title: '其它'}
];

class Category extends Component {
  render() {
    return (
      <div style={{ height: 200 }}>
        <WhiteSpace />
        <Tabs tabs={TABS}
          tabBarPosition='left'
          tabDirection='vertical'
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default Category;