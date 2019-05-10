import React from 'react';

class SearchGoods extends React.Component {
  render() {
    return (
      <div>
        {this.props.match.params.searchValue}
      </div>
    );
  }
}

export default SearchGoods;