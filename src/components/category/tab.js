import { ICON_PATH } from '../../path';

const TABS = [
  {
    title: '男装',
    content: [
      {
        key: 'm-cloths',
        content: [
          {
            icon: `${ICON_PATH}m-tshirt.svg`,
            text: 'T恤',
            path: 'm-tshirt'
          },
          {
            icon: `${ICON_PATH}m-hoody.svg`,
            text: '卫衣',
            path: 'm-hoody'
          },
          {
            icon: `${ICON_PATH}m-pants.svg`,
            text: '裤装',
            path: 'm-pants'
          },
          {
            icon: `${ICON_PATH}m-jacket.svg`,
            text: '夹克',
            path: 'm-jacket'
          },
          {
            icon: `${ICON_PATH}m-downjacket.svg`,
            text: '羽绒服',
            path: 'm-downjacket'
          },
          {
            icon: `${ICON_PATH}m-shrit.svg`,
            text: '衬衫',
            path: 'm-shrit'
          }
        ]
      }
    ]
  },
  {
    title: '女装',
    content: [
      {
        key: 'w-cloths',
        content: [
          {
            icon: `${ICON_PATH}w-tshirt.svg`,
            text: 'T恤',
            path: 'w-tshirt'
          },
          {
            icon: `${ICON_PATH}w-hoody.svg`,
            text: '卫衣',
            path: 'w-hoody'
          },
          {
            icon: `${ICON_PATH}w-windbreaker.svg`,
            text: '风衣',
            path: 'w-windbreaker'
          },
          {
            icon: `${ICON_PATH}w-pants.svg`,
            text: '裤装',
            path: 'w-pants'
          },
          {
            icon: `${ICON_PATH}w-shirt.svg`,
            text: '衬衫',
            path: 'w-shirt'
          },
          {
            icon: `${ICON_PATH}w-dress.svg`,
            text: '裙子',
            path: 'w-dress'
          },
          {
            icon: `${ICON_PATH}w-downjacket.svg`,
            text: '羽绒服',
            path: 'w-downjacket'
          }
        ]
      }
    ]
  },
  {
    title: '男鞋',
    content: [
      {
        key: 'm-shoes',
        content: [
          {
            icon: `${ICON_PATH}m-sandals.svg`,
            text: '凉鞋',
            path: 'm-sandals'
          },
          {
            icon: `${ICON_PATH}m-sneakers.svg`,
            text: '球鞋',
            path: 'm-sneakers'
          },
          {
            icon: `${ICON_PATH}m-leathershoes.svg`,
            text: '皮鞋',
            path: 'm-leathershoes'
          },
          {
            icon: `${ICON_PATH}m-flipflop.svg`,
            text: '拖鞋',
            path: 'm-flipflop'
          },
          {
            icon: `${ICON_PATH}m-casualshoes.svg`,
            text: '休闲鞋',
            path: 'm-casualshoes'
          },
          {
            icon: `${ICON_PATH}m-sportshoes.svg`,
            text: '运动鞋',
            path: 'm-sportshoes'
          }
        ]
      }
    ]
  },
  {
    title: '女鞋',
    content: [
      {
        key: 'w-shoes',
        content: [
          {
            icon: `${ICON_PATH}w-sandals.svg`,
            text: '凉鞋',
            path: 'w-sandals'
          },
          {
            icon: `${ICON_PATH}w-flipflop.svg`,
            text: '拖鞋',
            path: 'w-flipflop'
          },
          {
            icon: `${ICON_PATH}w-leathershoes.svg`,
            text: '皮鞋',
            path: 'w-leathershoes'
          },
          {
            icon: `${ICON_PATH}w-casualshoes.svg`,
            text: '休闲鞋',
            path: 'w-casualshoes'
          },
          {
            icon: `${ICON_PATH}w-sportshoes.svg`,
            text: '运动鞋',
            path: 'w-sportshoes'
          },
          {
            icon: `${ICON_PATH}w-highheels.svg`,
            text: '高跟鞋',
            path: 'w-highheels'
          },
          {
            icon: `${ICON_PATH}w-snowboots.svg`,
            text: '雪地靴',
            path: 'w-snowboots'
          }
        ]
      }
    ]
  },
  {
    title: '手机数码',
    content: [
      {
        subTitle: '热门品牌',
        key: 'hot-phone',
        content: [
          {
            icon: `${ICON_PATH}apple.svg`,
            text: '苹果',
            path: 'apple'
          },
          {
            icon: `${ICON_PATH}huawei.svg`,
            text: '华为',
            path: 'huawei'
          },
          {
            icon: `${ICON_PATH}mi.svg`,
            text: '小米',
            path: 'mi'
          },
          {
            icon: `${ICON_PATH}vivo.svg`,
            text: 'Vivo',
            path: 'vivo'
          },
          {
            icon: `${ICON_PATH}oppo.svg`,
            text: 'OPPO',
            path: 'oppo'
          },
          {
            icon: `${ICON_PATH}sumsung.svg`,
            text: '三星',
            path: 'sumsung'
          },
          {
            icon: `${ICON_PATH}meizu.svg`,
            text: '魅族',
            path: 'meizu'
          }
        ]
      },
      {
        subTitle: '手机',
        key: 'phone',
        content: [
          {
            icon: `${ICON_PATH}gamephone.svg`,
            text: '游戏手机',
            path: 'gamephone'
          },
          {
            icon: `${ICON_PATH}cameraphone.svg`,
            text: '拍照手机',
            path: 'cameraphone'
          },
          {
            icon: `${ICON_PATH}oldphone.svg`,
            text: '老年机',
            path: 'oldphone'
          }
        ]
      },
      {
        subTitle: '电脑',
        key: 'computer',
        content: [
          {
            icon: `${ICON_PATH}laptop.svg`,
            text: '笔记本',
            path: 'laptop'
          },
          {
            icon: `${ICON_PATH}display.svg`,
            text: '显示屏',
            path: 'display'
          },
          {
            icon: `${ICON_PATH}host.svg`,
            text: '主机',
            path: 'host'
          }
        ]
      },
      {
        subTitle: '配件',
        key: 'fitting',
        content: [
          {
            icon: `${ICON_PATH}phonefilm.svg`,
            text: '手机膜',
            path: 'phonefilm'
          },
          {
            icon: `${ICON_PATH}charger.svg`,
            text: '充电器',
            path: 'charger'
          },
          {
            icon: `${ICON_PATH}dataline.svg`,
            text: '数据线',
            path: 'dataline'
          },
          {
            icon: `${ICON_PATH}mouse.svg`,
            text: '鼠标',
            path: 'mouse'
          },
          {
            icon: `${ICON_PATH}keyboard.svg`,
            text: '键盘',
            path: 'keyboard'
          },
          {
            icon: `${ICON_PATH}sound.svg`,
            text: '音响',
            path: 'sound'
          }
        ]
      }
    ]
  },
  {
    title: '家用电器',
    content: [
      {
        content: [
          {
            icon: `${ICON_PATH}tv.svg`,
            text: '电视',
            path: 'tv'
          },
          {
            icon: `${ICON_PATH}airconditioner.svg`,
            text: '空调',
            path: 'airconditioner'
          },
          {
            icon: `${ICON_PATH}washer.svg`,
            text: '洗衣机',
            path: 'washer'
          },
          {
            icon: `${ICON_PATH}refrigerator.svg`,
            text: '冰箱',
            path: 'refrigerator'
          },
          {
            icon: `${ICON_PATH}heater.svg`,
            text: '热水器',
            path: 'heater'
          },
          {
            icon: `${ICON_PATH}microwaveoven.svg`,
            text: '微波炉',
            path: 'microwaveoven'
          },
          {
            icon: `${ICON_PATH}humidifier.svg`,
            text: '加湿器',
            path: 'humidifier'
          }
        ]
      }
    ]
  },
  {
    title: '生活用品',
    content: [
      {
        content: [
          {
            icon: `${ICON_PATH}printer.svg`,
            text: '打印机',
            path: 'printer'
          },
          {
            icon: `${ICON_PATH}beautier.svg`,
            text: '美容仪',
            path: 'beautier'
          },
          {
            icon: `${ICON_PATH}safer.svg`,
            text: '保险箱',
            path: 'safer'
          },
          {
            icon: `${ICON_PATH}pen.svg`,
            text: '钢笔',
            path: 'pen'
          },
          {
            icon: `${ICON_PATH}bike.svg`,
            text: '自行车',
            path: 'bike'
          },
          {
            icon: `${ICON_PATH}lock.svg`,
            text: '锁',
            path: 'lock'
          }
        ]
      }
    ]
  }
];

const GetTypeByPath = (function mapTabsToTypes(TABS) {
  return TABS.reduce((acc, cur)=>{
    for(const content of cur.content) {
      for(const v of content.content) {
        acc[v.path] = `${cur.title},${v.text}`;
      }
    }
    return acc;
  }, {});
})(TABS);

export default TABS;
export {GetTypeByPath};