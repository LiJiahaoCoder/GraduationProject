import React from 'react';

function Footer(props) {
  return (
    <div
      style={{
        textAlign: 'center',
        color: props.fontColor ? props.fontColor : '#ffffff',
        textShadow: '0 1px 2px #999',
        fontSize: '.7rem',
        marginTop: '6rem',
        backgroundColor: props.bgColor ? props.bgColor : null
      }}
    >
      <p>
        本项目为李嘉豪个人毕业设计，如有问题请联系：<br />george.1997@qq.com
      </p>
      <p>© 2019 - 2019</p>
    </div>
  );
}

export default Footer;