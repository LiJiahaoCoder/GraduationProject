import React, { Component } from 'react';
import { Card, Tag, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';

import { updateInfo } from '../../redux/user.redux';
import NavBarHeader from '../../components/navbarHeader';

@connect(
  state => state.user,
  {updateInfo}
)
class Recharge extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={'我的账户'} />
        <h1>This is Recharge component.</h1>
      </div>
    );
  }
}

export default Recharge;