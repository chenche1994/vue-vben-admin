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
    title: '事件概述',
    dataIndex: 'desc',
  },
  {
    title: '事件影响',
    dataIndex: 'impact',
  },
  {
    title: '线路',
    dataIndex: 'metroArea',
  },
  {
    title: '车/站/段/所',
    dataIndex: 'metroArea[0]',
  },
  {
    title: '区域',
    dataIndex: 'metroArea[1]',
  },
  {
    title: '事件报告人',
    dataIndex: 'reporter?.realName',
  },
  {
    title: '报告人部门',
    dataIndex: 'reporter?.deptName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
]
