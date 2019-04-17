import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ICON_PATH } from '../../path';

@withRouter
@connect(
  state => state.user
)
class NavLinkBar extends React.Component {
  render() {
    const navList = this.props.data.filter(v=>!v.hide);
    const {pathname} = this.props.location;
    return (
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item
            title={v.text}
            key={v.path}
            selected={pathname===v.path}
            dot={v.path === '/me' ? (this.props.isCertification ? false : true) : false}
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${ICON_PATH}${v.icon}.svg) center center /  21px 21px no-repeat` }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${ICON_PATH}${v.icon}-active.svg) center center /  21px 21px no-repeat` }}
            />
            }
            onPress={()=>{
              this.props.history.push(v.path)
            }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    );
  }
}

export default NavLinkBar;