import React, { Component } from 'react';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

class BankCard extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <h1>BankCard</h1>
      </div>
    );
  }
}

export default BankCard;