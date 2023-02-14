import { FormSchema } from '/@/components/Form'

// 新增编辑基础表单
export const editFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '类目名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '类目编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级类目',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id' },
    },
  },
  {
    field: 'desc',
    label: '描述',
    component: 'InputTextArea',
  },
]

// 基本信息展示
export const basicFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '类目名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '类目编码',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'first',
    label: '一级类目',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'second',
    label: '二级类目',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'third',
    label: '三级类目',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'fourth',
    label: '四级类目',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
]
