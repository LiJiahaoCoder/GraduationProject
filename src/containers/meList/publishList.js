import React, { Component } from 'react';
import { WhiteSpace, WingBlank, Card, Icon, Modal } from 'antd-mobile';
import { connect } from 'react-redux';

import {loadPublish, deletePublish} from '../../redux/goods.redux';
import NavBarHeader from '../../components/navbarHeader';
import {listTitle, getTitle} from './listTitle';
import {GOODS_PATH} from '../../path';

const alert = Modal.alert;

@connect(
  state => state,
  {loadPublish, deletePublish}
)
class PublishList extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.mail !== prevProps.user.mail) {
      const {mail} = this.props.user;
      this.props.loadPublish({mail});
    }
  }

  handlePress() {
    this.props.history.push('/me/publish');
  }

  handleDelete(v) {
    const {mail} = this.props.user;
    const {_id} = v;
    this.props.deletePublish({mail, _id});
  }

  render() {
    return (
      <div>
        <NavBarHeader title={listTitle[getTitle(this.props.match.url)]} />
        <WhiteSpace />
        <WingBlank size='sm'>
          {
            this.props.goods.goodsList.map(v => 
              <React.Fragment key={v.name}>
                <Card>
                  <Card.Header
                    title={v.name}
                    thumb={v.images[0]?`${GOODS_PATH}${v.images[0]}`:null}
                    extra={<span>购入时间：{v.boughtTime}</span>}
                  />
                  <Card.Body>
                    <div>{v.introduction}</div>
                  </Card.Body>
                  <Card.Footer
                    content={v.status}
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
      </div>
    );
  }
}

export default PublishList;