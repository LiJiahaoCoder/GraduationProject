import React, { Component } from 'react';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

class Publish extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <h1>Publish</h1>
      </div>
    );
  }
}

export default Publish;