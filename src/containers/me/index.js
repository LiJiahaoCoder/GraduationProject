import React, { Component } from 'react';
import { connect } from 'react-redux';
// components
import ProfileCard from '../../components/profileCard';

@connect(
  state => state.user
)
class Me extends Component {
  render() {
    return (
      <ProfileCard user={this.props} />
    );
  }
}

export default Me;