import { FormSchema } from '/@/components/Form'
import { BasicColumn } from '/@/components/Table/src/types/table'
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '单据号',
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
    title: '故障现象',
    dataIndex: 'faultReason',
  },
  {
    title: '故障类型',
    dataIndex: 'metroFaultType',
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
    title: '故障等级',
    dataIndex: 'metroFaultGrade',
  },
  {
    title: '剩余时间',
    dataIndex: 'surplusTime',
  },
  {
    title: '延期原因',
    dataIndex: 'delayReason',
  },
  {
    title: '原定修复时间',
    dataIndex: 'originalTime',
  },
  {
    title: '申请延期日期',
    dataIndex: 'delayTime',
  },
  {
    title: '提报日期',
    dataIndex: 'createTime',
  },
  {
    title: '申请人',
    dataIndex: 'userName',
  },
]
