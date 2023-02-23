import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const station: AppRouteModule = {
  path: '/robot/stationConfig',
  name: 'RobotStationConfig',
  component: LAYOUT,
  redirect: '/robot/stationConfig/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 300,
    icon: 'ant-design:bar-chart-outline',
    title: '场站配置',
  },
  children: [
    {
      path: 'index',
      name: 'RobotStationConfigIndex',
      component: () => import('/@/views/statis/analysis/index.vue'),
      meta: {
        title: '场站配置',
      },
    },
  ],
}

export default station
