import { FormSchema } from '/@/components/Form'
import { BasicColumn } from '/@/components/Table/src/types/table'
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '单据号',
    component: 'Input',
  },
  {
    field: 'code',
    label: '区域',
    component: 'Input',
  },
  {
    field: 'memo',
    label: '提报时间',
    component: 'RangePicker',
  },
]

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '单据号',
    dataIndex: 'receiptsId',
  },
  {
    title: '所属专业',
    dataIndex: 'metroProfessional',
  },
  {
    title: '区域',
    dataIndex: 'metroArea',
  },
  {
    title: '提报时间',
    dataIndex: 'reportTime',
  },
  {
    title: '检修完成时间',
    dataIndex: 'startTime',
  },
]
