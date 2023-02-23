import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const station: AppRouteModule = {
  path: '/robot/station',
  name: 'RobotStation',
  component: LAYOUT,
  redirect: '/robot/station/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 300,
    icon: 'ant-design:bar-chart-outline',
    title: '场站信息',
  },
  children: [
    {
      path: 'index',
      name: 'RobotStationIndex',
      component: () => import('/@/views/statis/analysis/index.vue'),
      meta: {
        title: '场站信息',
      },
    },
  ],
}

export default station
