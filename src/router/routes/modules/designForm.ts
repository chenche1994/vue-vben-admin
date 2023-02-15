import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
// import { t } from '/@/hooks/web/useI18n'

const designForm: AppRouteModule = {
  path: '/designForm',
  name: 'DesignForm',
  component: LAYOUT,
  redirect: '/designForm/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '工单流程设计',
    orderNo: 1000,
  },
  children: [
    {
      path: 'index',
      name: 'Procedure',
      component: () => import('/@/views/designForm/procedure/index.vue'),
      meta: {
        title: '流程管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'design-form',
      name: 'DesignFormPage',
      component: () => import('/@/views/designForm/formList/index.vue'),
      meta: {
        title: '表单管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
}

export default designForm
