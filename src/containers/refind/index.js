import React, { Component } from 'react';
// antd-mobile components
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile';
// route
import {
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// reducer
import { refind } from '../../redux/user.redux';
// scss
import './index.scss';
// import refind.n components
import Refind1 from './refind.1';
import Refind2 from './refind.2';

@connect(
  state => state.user,
  {refind}
)
class Refind extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/refind' component={Refind1} />
          <Route path='/refind/step2' component={Refind2} />
        </Switch>
      </>
    );
  }
}

export default Refind;