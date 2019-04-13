import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

function NavBarHeader(props) {
  const {title} = props;

  return (
    <NavBar
      mode='dark'
      icon={<Icon type='left' />}
      leftContent='返回'
      onLeftClick={()=>{props.history.goBack();}}
    >
      {title}
    </NavBar>
  );
}

export default withRouter(NavBarHeader);