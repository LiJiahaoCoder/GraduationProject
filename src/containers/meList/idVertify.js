import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List, Modal, Button, InputItem, Toast } from 'antd-mobile';

import NavBarHeader from '../../components/navbarHeader';
import { updateInfo } from '../../redux/user.redux';
import {listTitle, getTitle} from './listTitle';
import { AVATAR_PATH } from '../../path';

// 身份证正则验证
const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

@connect(
  state => state.user,
  { updateInfo }
)
class IdVertify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      identityNumber: ''
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.resolveId = this.resolveId.bind(this);
  }

  resolveId(id) {
    let str = String(id).slice(6, 14);
    let arr = [str.slice(0, 4), str.slice(4, 6), str.slice(6)];
    return arr.join('-');
  }

  handleChange(v, k) {
    this.setState({
      [k]: v
    });
  }

  handlePress() {
    // console.log(this.state);
    const {name, identityNumber} = this.state;
    this.props.updateInfo({name, identityNumber, mail: this.props.mail, isCertification: true});
  }

  showModal(e) {
    // 修复 Android 上点击穿透
    e.preventDefault();
    this.setState({
      modal: true
    });
  }

  hideModal() {
    this.setState({
      modal: false
    });
  }

  render() {
    const {isCertification} = this.props;
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <Card full>
      <List>
          <List.Item
            arrow={isCertification?null:'horizontal'}
            onClick={isCertification?null:e => this.showModal(e)}
          >
            <Card.Header
              title={isCertification?this.props.name:'——'}
              thumb={`${AVATAR_PATH}${this.props.avatar}`}
              extra={<span>{isCertification?this.resolveId(this.props.identityNumber):'未认证'}</span>}
            />
          </List.Item>
        </List>
        <Card.Body>
          <div>身份证号码：{isCertification?this.props.identityNumber:'——'}</div>
        </Card.Body>
        <Card.Footer content='' extra={isCertification?'已认证':<div>认证开启更多操作</div>} />
      </Card>
      <Modal
        popup
        visible={this.state.modal}
        onClose={this.hideModal}
        animationType='slide-up'
      >
        <List renderHeader={() => <div>实名认证信息填写</div>} className='popup-list'>
          <List.Item>
            <InputItem
              placeholder='姓名'
              onChange={v=>this.handleChange(v, 'name')}
              value={this.state.name}
            />
            <InputItem
              placeholder='身份证号码'
              error={!idcardReg.test(this.state.identityNumber)}
              onErrorClick={()=>Toast.info('身份证错误', 1.5)}
              onChange={v=>this.handleChange(v, 'identityNumber')}
              value={this.state.identityNumber}
            />
          </List.Item>
          <List.Item
            style={{
              paddingRight: 0
            }}
          >
            <Button
              className='my-button'
              type='primary'
              onClick={()=>{
                this.hideModal();
                this.handlePress();
              }}
              disabled={!idcardReg.test(this.state.identityNumber)||!this.state.name}
            >
              确定
            </Button>
          </List.Item>
        </List>
      </Modal>
      </div>
    );
  }
}

export default IdVertify;