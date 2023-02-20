import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 1,
    icon: 'ion:home-outline',
    title: '首页',
  },
  children: [
    {
      path: 'index',
      name: 'HomeIndex',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页',
      },
    },
  ],
}

export default home
