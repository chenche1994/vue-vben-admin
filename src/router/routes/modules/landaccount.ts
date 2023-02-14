import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const landAccount: AppRouteModule = {
  path: '/landaccount',
  name: 'LandAccount',
  component: LAYOUT,
  redirect: '/landaccount/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '台账管理',
    orderNo: 1000,
  },
  children: [
    {
      path: 'index',
      name: 'Asset',
      component: () => import('/@/views/landAccount/asset/index.vue'),
      meta: {
        title: '资产管理',
      },
    },
  ],
}

export default landAccount
