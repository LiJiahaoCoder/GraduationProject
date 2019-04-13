import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// components
import IdVertify from './idVertify';
import BankCard from './bankcard';
import Safe from './safe';
import Order from './order';
import Favorite from './favorite';
import About from './about';

const list = [
  {
    path: 'idvertify',
    component: IdVertify
  },
  {
    path: 'bankcard',
    component: BankCard
  },
  {
    path: 'safe',
    component: Safe
  },
  {
    path: 'order',
    component: Order
  },
  {
    path: 'favorite',
    component: Favorite
  },
  {
    path: 'about',
    component: About
  }
];

class MeList extends Component {
  render() {
    return (
      <div>
        <Switch>
          {
            list.map(v => <Route key={v.path} path={`/me/${v.path}`} component={v.component} />)
          }
        </Switch>
      </div>
    );
  }
}

export default MeList;