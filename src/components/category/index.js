import React, { Component } from 'react';
import { Tabs, WhiteSpace, Grid } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import TABS from './tab';

@withRouter
class Category extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(el) {
    // console.log(el.path);
    this.props.history.push(`/goods/${el.path}`);
  }

  render() {
    return (
      <div style={{ height: '90vh', position: 'relative', zIndex: 1 }}>
        <WhiteSpace />
        <Tabs tabs={TABS}
          tabBarPosition='left'
          tabDirection='vertical'
        >
          {
            TABS.map(v => 
              <div key={v.title} style={{ justifyContent: 'center', height: '90vh', backgroundColor: '#fff', overflow: 'auto' }}>
                {
                  v.content.map(t => 
                    <React.Fragment key={`${t.key}-frag`}>
                      {
                        t.subTitle ?
                        <div key={`${t.key}-subtitle`} className="category-sub-title"> {t.subTitle} </div> :
                        null
                      }
                      <Grid
                        key={`${t.key}-content`}
                        data={t.content}
                        hasLine={false}
                        columnNum={3}
                        onClick={(el) => this.handleClick(el)}
                      />
                      <WhiteSpace key={`${t.key}-space`} />
                    </React.Fragment>
                  )
                }
              </div>
            )
          }
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default Category;