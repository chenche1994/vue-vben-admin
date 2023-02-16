import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
// import { t } from '/@/hooks/web/useI18n'

const designForm: AppRouteModule = {
  path: '/designForm',
  name: 'DesignForm',
  component: LAYOUT,
  redirect: '/designForm/index',
  meta: {
    icon: 'ion:layers-outline',
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
      },
    },
    {
      path: 'design-form',
      name: 'DesignFormPage',
      component: () => import('/@/views/designForm/formList/index.vue'),
      meta: {
        title: '表单管理',
      },
    },
  ],
}

export default designForm
