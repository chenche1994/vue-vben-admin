import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const robotStatis: AppRouteModule = {
  path: '/robot/statis',
  name: 'RobotStatis',
  component: LAYOUT,
  redirect: '/robot/statis/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 300,
    icon: 'ant-design:bar-chart-outline',
    title: '统计分析',
  },
  children: [
    {
      path: 'index',
      name: 'RobotStatIndex',
      component: () => import('/@/views/statis/analysis/index.vue'),
      meta: {
        title: '统计分析',
      },
    },
  ],
}

export default robotStatis
