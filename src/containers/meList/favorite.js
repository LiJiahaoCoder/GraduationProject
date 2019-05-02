import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  Card,
  Icon,
  Modal
} from 'antd-mobile';
import { connect } from 'react-redux';

import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';
import {GOODS_PATH} from '../../path';
import {removeFavorite} from '../../redux/user.redux';

@connect(
  state => state.user,
  {removeFavorite}
)
class Favorite extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <h1>Favorite</h1>
      </div>
    );
  }
}

export default Favorite;