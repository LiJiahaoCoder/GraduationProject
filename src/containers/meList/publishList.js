import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  Card,
  Icon,
  Modal,
  List,
  InputItem,
  Button
} from 'antd-mobile';
import { connect } from 'react-redux';

import {loadPublish, deletePublish, changeOrderStatus} from '../../redux/goods.redux';
import {loadOrder} from '../../redux/order.redux';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';
import {GOODS_PATH} from '../../path';

const alert = Modal.alert;

@connect(
  state => state,
  {loadPublish, deletePublish, changeOrderStatus, loadOrder}
)
class PublishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      expressNumber: '',
      _id: '',
      orderList: {}
    };

    this.handlePress = this.handlePress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSurePress = this.handleSurePress.bind(this);
  }

  componentDidMount() {
    const {mail} = this.props.user;
    this.props.loadPublish({mail});
    this.props.loadOrder({saler: this.props.user.mail});
    setTimeout(() => {
      let orderList = this.props.order.orderList.reduce((acc, cur)=>{
        acc[cur.goodsId] = cur.to;
        return acc;
      }, {});
      this.setState({
        orderList: orderList
      });
    }, 100);
  }

  handlePress() {
    this.props.history.push('/me/publish');
  }

  handleDelete(v) {
    const {mail} = this.props.user;
    const {_id} = v;
    this.props.deletePublish({mail, _id});
  }

  showModal(e, _id) {
    // 修复 Android 上点击穿透
    e.preventDefault();
    this.setState({
      modal: true,
      _id: _id
    });
  }
  
  hideModal() {
    this.setState({
      modal: false
    });
  }

  handleChange(v) {
    this.setState({
      expressNumber: v
    });
  }

  handleSurePress(status) {
    // console.log(this.state);
    let {_id, expressNumber} = this.state;
    this.props.changeOrderStatus({_id, status, expressNumber});
    setTimeout(() => {
      this.props.loadPublish({mail: this.props.user.mail});
    }, 100);
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace />
        <WingBlank size='sm'>
          {
            this.props.goods.publish.map(v => 
              <React.Fragment key={v.name}>
                <Card>
                  <Card.Header
                    title={v.name}
                    thumb={v.images[0]?`${GOODS_PATH}${v.images[0]}`:null}
                    extra={
                      <span style={{width: '150px', overflow: 'auto', textAlign: 'left', fontSize: '.8rem'}}>
                        <div>目的地：</div>
                        <div>{this.state.orderList[v._id] ? this.state.orderList[v._id] : '-------'}</div>
                      </span>
                    }
                  />
                  <Card.Body>
                    <div>{v.introduction}</div>
                  </Card.Body>
                  <Card.Footer
                    content={
                      v.status === '未出售' ?
                        v.status :
                        (
                          v.status === '已付款' ?
                            <button className='change-status-button' onClick={(e) => this.showModal(e, v._id)}>已付款</button> :
                            (
                              v.status === '未收货' ?
                                '未收货' :
                                '已收货'
                            )
                        )
                    }
                    extra={<Icon onClick={() =>
                      alert('删除', '确定删除商品吗？', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.handleDelete(v) },
                      ])}
                      type='cross-circle'
                    />}
                  />
                </Card>
                <WhiteSpace />
              </React.Fragment>
            )
          }
          <div
            className='publish-button'
            onClick={() => setTimeout(()=>this.handlePress(), 500)}
          >
            +
          </div>
        </WingBlank>
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.hideModal}
          animationType='slide-up'
        >
          <List renderHeader={() => <div>填写快递号</div>} className='popup-list'>
            <List.Item>
              <InputItem
                placeholder='快递号'
                onChange={v=>this.handleChange(v)}
                value={this.state.expressNumber}
              />
            </List.Item>
            <List.Item>
              <Button
                className='my-button'
                type='primary'
                onClick={()=>{
                  this.hideModal();
                  this.handleSurePress('未收货');
                }}
                disabled={!this.state.expressNumber}
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

export default PublishList;