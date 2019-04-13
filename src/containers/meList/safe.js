import React, { Component } from 'react';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

class Safe extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <h1>Safe</h1>
      </div>
    );
  }
}

export default Safe;