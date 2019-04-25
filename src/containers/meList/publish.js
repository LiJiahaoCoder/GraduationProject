import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  InputItem,
  WhiteSpace,
  ImagePicker,
  Button,
  TextareaItem,
  Picker,
  List
} from 'antd-mobile';

import NavBarHeader from '../../components/navbarHeader';
import {uploadGoods} from '../../redux/goods.redux';
import {ICON_PATH} from '../../path';

// 生成购买时间列表
let date = new Date(Date.now());
const TIME_LIST = [];
let ALL_MONTH = [];
let THIS_MONTH = [];
for(let i = 1; i < date.getMonth() + 2; i++) {
  THIS_MONTH.push({
    value: i,
    label: `${i}月`
  });
}
for(let i = 1; i < 13; i++) {
  ALL_MONTH.push({
    value: i,
    label: `${i}月`
  });
}
for(let i = 2000; i < date.getFullYear() + 1; i++) {
  if(i === date.getFullYear()) {
    TIME_LIST.push({
      value: i,
      label: `${i}年`,
      children: THIS_MONTH
    });
  } else {
    TIME_LIST.push({
      value: i,
      label: `${i}年`,
      children: ALL_MONTH
    });
  }
}
TIME_LIST.unshift({value: '', label: '请选择'});
// 新旧程度以及类型列表
const LEVEL_LIST = [
  {
    value: '',
    label: '请选择'
  },
  {
    value: '10',
    label: '全新'
  },
  {
    value: '9',
    label: '9成新'
  },
  {
    value: '8',
    label: '8成新'
  },
  {
    value: '7',
    label: '7成新'
  },
  {
    value: '6',
    label: '6成新'
  },
  {
    value: '5',
    label: '5成新'
  },
  {
    value: '4',
    label: '4成新'
  }
];
const TYPE_LIST = [
  {
    value: '',
    label: '请选择'
  },
  {
    value: '男装',
    label: '男装',
    children: [
      {
        value: 'T恤',
        label: 'T恤'
      },
      {
        value: '卫衣',
        label: '卫衣'
      },
      {
        value: '裤装',
        label: '裤装'
      },
      {
        value: '夹克',
        label: '夹克'
      },
      {
        value: '羽绒服',
        label: '羽绒服'
      },
      {
        value: '衬衫',
        label: '衬衫'
      }
    ]
  },
  {
    value: '女装',
    label: '女装',
    children: [
      {
        value: 'T恤',
        label: 'T恤'
      },
      {
        value: '卫衣',
        label: '卫衣'
      },
      {
        value: '风衣',
        label: '风衣'
      },
      {
        value: '裤装',
        label: '裤装'
      },
      {
        value: '衬衫',
        label: '衬衫'
      },
      {
        value: '裙子',
        label: '裙子'
      },
      {
        value: '羽绒服',
        label: '羽绒服'
      }
    ]
  },
  {
    value: '男鞋',
    label: '男鞋',
    children: [
      {
        value: '凉鞋',
        label: '凉鞋'
      },
      {
        value: '球鞋',
        label: '球鞋'
      },
      {
        value: '皮鞋',
        label: '皮鞋'
      },
      {
        value: '拖鞋',
        label: '拖鞋'
      },
      {
        value: '休闲鞋',
        label: '休闲鞋'
      },
      {
        value: '运动鞋',
        label: '运动鞋'
      }
    ]
  },
  {
    value: '女鞋',
    label: '女鞋',
    children: [
      {
        value: '凉鞋',
        label: '凉鞋'
      },
      {
        value: '拖鞋',
        label: '拖鞋'
      },
      {
        value: '皮鞋',
        label: '皮鞋'
      },
      {
        value: '休闲鞋',
        label: '休闲鞋'
      },
      {
        value: '运动鞋',
        label: '运动鞋'
      },
      {
        value: '高跟鞋',
        label: '高跟鞋'
      },
      {
        value: '雪地靴',
        label: '雪地靴'
      }
    ]
  },
  {
    value: '手机数码',
    label: '手机数码',
    children: [
      {
        value: '游戏手机',
        label: '游戏手机'
      },
      {
        value: '拍照手机',
        label: '拍照手机'
      },
      {
        value: '老年机',
        label: '老年机'
      },
      {
        value: '笔记本',
        label: '笔记本'
      },
      {
        value: '显示屏',
        label: '显示屏'
      },
      {
        value: '主机',
        label: '主机'
      },
      {
        value: '手机膜',
        label: '手机膜'
      },
      {
        value: '充电器',
        label: '充电器'
      },
      {
        value: '数据线',
        label: '数据线'
      },
      {
        value: '鼠标',
        label: '鼠标'
      },
      {
        value: '键盘',
        label: '键盘'
      },
      {
        value: '音响',
        label: '音响'
      }
    ]
  },
  {
    value: '家用电器',
    label: '家用电器',
    children: [
      {
        value: '电视',
        label: '电视'
      },
      {
        value: '空调',
        label: '空调'
      },
      {
        value: '洗衣机',
        label: '洗衣机'
      },
      {
        value: '冰箱',
        label: '冰箱'
      },
      {
        value: '热水器',
        label: '热水器'
      },
      {
        value: '微波炉',
        label: '微波炉'
      },
      {
        value: '加湿器',
        label: '加湿器'
      }
    ]
  },
  {
    value: '生活用品',
    label: '生活用品',
    children: [
      {
        value: '打印机',
        label: '打印机'
      },
      {
        value: '美容仪',
        label: '美容仪'
      },
      {
        value: '保险箱',
        label: '保险箱'
      },
      {
        value: '钢笔',
        label: '钢笔'
      },
      {
        value: '自行车',
        label: '自行车'
      },
      {
        value: '锁',
        label: '锁'
      }
    ]
  }
];
@connect(
  state => state,
  {uploadGoods}
)
class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      name: '',
      brand: '',
      price: '',
      boughtTime: '',
      images: [],
      introduction: '',
      newLevel: [],
      type: []
    }

    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  onChange(val, key) {
    this.setState({
      [key]: val
    });
    this.setState({mail: this.props.user.mail});
  }

  onImageChange(files) {
    // console.log('----- enter onChange function -----');
    // console.log(files);
    this.setState({images: files});
  }

  handlePublish() {
    this.props.uploadGoods(this.state);
    setTimeout(() => {
      if(this.props.goods.isUpload)
        this.props.history.goBack();
    }, 500);
  }

  render() {
    return (
      <div>
        <NavBarHeader title='发布' />
        <WhiteSpace />
        <>
        <form encType='multipart/form-data'>
          <InputItem
            maxLength={24}
            onChange={(val) => this.onChange(val, 'name')}
          >
            商品名称
          </InputItem>
          <InputItem
            maxLength={24}
            onChange={(val) => this.onChange(val, 'brand')}
          >
            商品品牌
          </InputItem>
          <Picker
            data={TIME_LIST}
            cols={2}
            title='选择购买年月'
            value={this.state.boughtTime}
            onPickerChange={(val) => this.onChange(val, 'boughtTime')}
          >
            <List.Item arrow='horizontal'>购买年月</List.Item>
          </Picker>
          <Picker
            data={LEVEL_LIST}
            cols={1}
            title='选择新旧程度'
            value={this.state.newLevel}
            onPickerChange={(val) => this.onChange(val, 'newLevel')}
          >
            <List.Item arrow='horizontal'>新旧程度</List.Item>
          </Picker>
          <Picker
            data={TYPE_LIST}
            cols={2}
            title='选择商品种类'
            value={this.state.type}
            onPickerChange={(val) => this.onChange(val, 'type')}
          >
            <List.Item arrow='horizontal'>商品种类</List.Item>
          </Picker>
          <InputItem
            onChange={(val) => this.onChange(val, 'price')}
            extra={<span><img src={`${ICON_PATH}star-coin.svg`} alt='' /></span>}
          >
            出售价格
          </InputItem>
            <ImagePicker
              className='goods-image'
              length={5}
              multiple={true}
              selectable={this.state.images.length<5}
              files={this.state.images}
              onChange={files => this.onImageChange(files)}
            />
          <div style={{color: '#666', textAlign: 'right'}}>最多上传5张照片</div>
          <WhiteSpace />
          <TextareaItem
            placeholder='请输入商品描述，不超过150个字符'
            rows={5}
            count={150}
            files={this.state.images}
            onChange={(val) => this.onChange(val, 'introduction')}
            />
          <Button type='primary' onClick={this.handlePublish}>发布</Button>
          </form>
        </>
      </div>
    );
  }
}

export default Publish;