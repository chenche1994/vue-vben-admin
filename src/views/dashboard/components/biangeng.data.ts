import { FormSchema } from '/@/components/Form'
import { BasicColumn } from '/@/components/Table/src/types/table'
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '计划检修编码',
    component: 'Input',
  },
  {
    field: 'code',
    label: '检修名称',
    component: 'Input',
  },
  {
    field: 'memo',
    label: '区域',
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
    title: '检修计划编码',
    dataIndex: 'code',
  },
  {
    title: '变更后检修名称',
    dataIndex: 'name',
  },
  {
    title: '所属专业',
    dataIndex: 'metroProfessional',
  },
  {
    title: '检修班组',
    dataIndex: 'team',
  },
  {
    title: '区域',
    dataIndex: 'metroArea',
  },
  {
    title: '计划开始检修时间',
    dataIndex: 'startTime',
  },
  {
    title: '检修周期',
    dataIndex: 'number',
  },
]
