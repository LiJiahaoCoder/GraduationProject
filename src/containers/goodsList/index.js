import React, { Component } from 'react';

class GoodsList extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.match.params.goodstype}</h1>
      </div>
    );
  }
}

export default GoodsList;