import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';

import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';

class About extends Component {
  render() {
    return (
      <div> 
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace size='lg' />
        <h2 style={{textAlign: 'center'}}>李嘉豪的毕设</h2>
        <WhiteSpace size='lg' />
        <ul className='about-list'>
          <li>如有任何问题请邮件联系：2216575716@qq.com</li>
          <li>源码请移步github：
            <a href='https://github.com/LiJiahaoCoder/Graduation-Project'>个人GitHub</a>
          </li>
          <li>所有图片都已在README.md注明来源</li>
        </ul>
      </div>
    );
  }
}

export default About;