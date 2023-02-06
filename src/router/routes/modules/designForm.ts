import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
// import { t } from '/@/hooks/web/useI18n'

const designForm: AppRouteModule = {
  path: '/designForm',
  name: 'DesignForm',
  component: LAYOUT,
  redirect: '/designForm/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '表单设计',
    orderNo: 1000,
  },
  children: [
    {
      path: 'index',
      name: 'DesignFormPage',
      component: () => import('/@/views/designForm/formList/index.vue'),
      meta: {
        title: '表单设计',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
}

export default designForm
