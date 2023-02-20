import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const home: AppRouteModule = {
  path: '/statis',
  name: 'Statis',
  component: LAYOUT,
  redirect: '/statis/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 300,
    icon: 'ant-design:bar-chart-outline',
    title: '统计分析',
  },
  children: [
    {
      path: 'index',
      name: 'StatIndex',
      component: () => import('/@/views/statis/analysis/index.vue'),
      meta: {
        title: '统计分析',
      },
    },
  ],
}

export default home
