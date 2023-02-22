import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const landAccount: AppRouteModule = {
  path: '/landaccount',
  name: 'LandAccount',
  component: LAYOUT,
  redirect: '/landaccount/index',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: '台账管理',
    orderNo: 1000,
  },
  children: [
    {
      path: 'index',
      name: 'FormList',
      component: () => import('/@/views/landAccount/formList/index.vue'),
      meta: {
        title: '工单列表',
      },
    },
    {
      path: 'repairSchedule',
      name: 'RepairSchedule',
      component: () => import('/@/views/landAccount/repairSchedule/index.vue'),
      meta: {
        title: '检修计划',
      },
    },
    {
      path: 'asset',
      name: 'Asset',
      component: () => import('/@/views/landAccount/asset/index.vue'),
      meta: {
        title: '资产管理',
      },
    },
  ],
}

export default landAccount
