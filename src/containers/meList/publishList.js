import React, { Component } from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';

import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';


@connect(
  state => state
)
class PublishList extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.history.push('/me/publish');
  }

  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace />
        <WingBlank size='sm'>
          <div
            className='publish-button'
            onClick={() => setTimeout(()=>this.handlePress(), 500)}
          >
            +
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default PublishList;