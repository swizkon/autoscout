import Vue from 'vue'
import Router from 'vue-router'

import Hello from '../components/Hello'
import AccountHistory from '../components/AccountHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/accounts/:id/history',
      name: 'AccountHistory',
      component: AccountHistory
    },
    {
      path: '/mocks/:mockfile',
      name: 'MockHistory',
      component: AccountHistory
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})