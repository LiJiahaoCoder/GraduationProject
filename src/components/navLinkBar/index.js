import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
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
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(http://localhost:8888/static/images/${v.icon}.svg) center center /  21px 21px no-repeat` }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(http://localhost:8888/static/images/${v.icon}-active.svg) center center /  21px 21px no-repeat` }}
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