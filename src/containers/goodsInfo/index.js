import React, { Component } from 'react';

class GoodsInfo extends Component {
  render() {
    return (
      <div>
        {
          this.props.match.params.id
        }
      </div>
    );
  }
}

export default GoodsInfo;