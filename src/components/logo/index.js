import React from 'react';

function Logo(props) {
  const {type} = props;

  return (
    <div>
      <div className={type+'-title-container title-container'}>
        <div className={type+'-title title'}>易</div>
        <div className={type+'-slogan slogan'}>让布满灰尘的，更有价值！</div>
      </div>
    </div>
  );
}

export default Logo;