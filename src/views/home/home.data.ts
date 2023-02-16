import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import home_ic_trobleTicket from '/@/assets/images/home_ic_trobleTicket.png'
import home_ic_planTicket from '/@/assets/images/home_ic_planTicket.png'
import home_ic_temporaryTicket from '/@/assets/images/home_ic_temporaryTicket.png'
export const entranceList = [
  {
    title: '故障工单',
    url: home_ic_trobleTicket,
    path: 'Risk',
  },
  {
    title: '计划检修工单',
    url: home_ic_planTicket,
    path: 'Plan',
  },
  {
    title: '临时检修工单',
    url: home_ic_temporaryTicket,
    path: 'Temporary',
  },
  {
    title: '事件提报',
    url: home_ic_temporaryTicket,
    path: 'event',
  },
]
// 表格页
export const columns: BasicColumn[] = [
  {
    title: '单据号',
    dataIndex: 'userName',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'userNick',
    width: 120,
  },
  {
    title: '工单类型',
    dataIndex: 'realName',
    width: 120,
  },
  {
    title: '提报日期',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '未完成',
          value: 'Running',
        },
        {
          label: '已完成',
          value: 'Finish',
        },
      ],
    },
    colProps: { span: 8 },
    defaultValue: 'all',
  },
  {
    field: 'reportTime',
    label: '提报时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]
