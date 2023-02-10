import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '专业名称',
    dataIndex: 'name',
  },
  {
    title: '专业编码',
    dataIndex: 'userNick',
  },
  {
    title: '描述',
    dataIndex: 'memo',
  },
]

export const specialtyFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '专业名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '专业编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'memo',
    label: '描述',
    component: 'InputTextArea',
  },
]
