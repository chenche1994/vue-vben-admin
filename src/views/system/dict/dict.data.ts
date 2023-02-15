import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
// 表格页
export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '字典key',
    dataIndex: 'parameter',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 120,
  },
]

export const dictFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parameter',
    label: '字典key',
    component: 'Input',
    required: true,
  },
  {
    field: 'itemList',
    label: '配置数据',
    required: true,
    component: 'Input',
    slot: 'item',
  },
  {
    field: 'desc',
    label: '描述',
    component: 'InputTextArea',
  },
]
