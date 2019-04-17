import React, { Component } from 'react';
import { Card, Tag, WhiteSpace, Button, Modal } from 'antd-mobile';
import { connect } from 'react-redux';

import { updateInfo } from '../../redux/user.redux';
import NavBarHeader from '../../components/navbarHeader';
import { AVATAR_PATH } from '../../path';

const alert = Modal.alert;

@connect(
  state => state.user,
  {updateInfo}
)
class Recharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 10,
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleRecharge = this.handleRecharge.bind(this);
  }

  handleChange(value) {
    value = value === this.state.selectedValue ? '' : value;
    this.setState({
      selectedValue: value,
      inputValue: ''
    });
  }

  inputChange(e) {
    const value = e.target===undefined?'':e.target.value;
    this.setState({
      selectedValue: '',
      inputValue: value
    });
  }

  handleRecharge() {
    const amount = this.state.selectedValue || this.state.inputValue;
    let stars = Number(amount) + Number(this.props.stars);
    this.props.updateInfo({mail: this.props.mail, stars: stars})
  }

  render() {
    const tagList = [
      {
        value: 10
      },
      {
        value: 20
      },
      {
        value: 100
      }
    ];
    const amount = this.state.selectedValue || this.state.inputValue;
    return (
      <div>
        <NavBarHeader title={'我的账户'} />
        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header
            title={this.props.account}
            thumb={`${AVATAR_PATH}${this.props.avatar}`}
            extra={<span className='recharge-extra'>昵称：{this.props.nickname}(余额:{this.props.stars})</span>}
          />
          <Card.Body>
            <div className='tag-container'>
              {
                tagList.map(v =>
                <Tag
                  key={v.value}
                  selected={this.state.selectedValue === v.value}
                  onChange={() => this.handleChange(v.value)}
                >
                  {v.value}星
                </Tag>)
              }
              <input
                className='recharge-other-amount'
                placeholder='其它数额'
                onChange={e => this.inputChange(e)}
                onFocus={() => this.inputChange('')}
                value={this.state.inputValue}
              />
            </div>
            <div className='recharge-amount'>
              {amount ? `${amount}星` : '0.00星'}
            </div>
            <WhiteSpace />
            <Button
              type='primary'
              disabled={!amount}
              onClick={() =>
                alert('充值', `确定充值${amount}星？`, [
                  { text: 'Cancel'},
                  { text: 'Ok', onPress: () => this.handleRecharge() },
                ])
              }
            >
              充值
            </Button>
          </Card.Body>
          <Card.Footer content='数额为1的倍数' extra={<div>1元 = 1星</div>} />
        </Card>
      </div>
    );
  }
}

export default Recharge;