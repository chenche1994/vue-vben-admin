import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/todo',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'todo',
      name: 'Todo',
      component: () => import('/@/views/dashboard/todoList/index.vue'),
      meta: {
        title: '待办列表',
      },
    },
    {
      path: 'done',
      name: 'Done',
      component: () => import('/@/views/dashboard/doneList/index.vue'),
      meta: {
        title: '已办列表',
      },
    },
  ],
}

export default dashboard
