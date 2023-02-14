import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/account/index.vue'),
    },
    {
      path: 'employee',
      name: 'EmployeeManagement',
      meta: {
        title: t('routes.demo.system.employee'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/employee/index.vue'),
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/dept/index.vue'),
    },
    {
      path: 'specialty',
      name: 'SpecialtyManagement',
      meta: {
        title: t('routes.demo.system.specialty'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/specialty/index.vue'),
    },
    {
      path: 'area',
      name: 'AreaManagement',
      meta: {
        title: t('routes.demo.system.area'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/area/index.vue'),
    },
    {
      path: 'asset-category',
      name: 'AssetCategory',
      meta: {
        title: t('routes.demo.system.assetCategory'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/assetCategory/index.vue'),
    },
  ],
}

export default system
