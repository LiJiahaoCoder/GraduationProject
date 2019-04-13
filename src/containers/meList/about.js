import React, { Component } from 'react';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

class About extends Component {
  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <h1>About</h1>
      </div>
    );
  }
}

export default About;