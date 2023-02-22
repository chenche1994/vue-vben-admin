import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '检修计划编码',
    dataIndex: 'userName',
    width: 120,
  },
  {
    title: '检修计划名称',
    dataIndex: 'userNick',
    width: 120,
  },
  {
    title: '区域',
    dataIndex: 'realName',
    width: 120,
  },
  {
    title: '检修周期',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '开始日期',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'mobile',
    width: 120,
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userNameLike',
    label: '检修计划编码',
    component: 'Input',
  },
  {
    field: 'userNickLike',
    label: '检修计划名称',
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '区域',
    component: 'Input',
  },
  {
    field: 'date',
    label: '开始日期',
    component: 'RangePicker',
  },
  {
    field: 'satsus',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '正常',
          value: 'NORMAL',
        },
        {
          label: '停用',
          value: 'STOP',
        },
      ],
    },
  },
]

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'mobile',
    label: '电话',
    component: 'Input',
    required: true,
  },
  {
    field: 'userNick',
    label: '昵称',
    component: 'Input',
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'profile',
    label: '简介',
    component: 'InputTextArea',
  },
  {
    field: 'photo',
    label: '头像',
    component: 'Upload',
  },
]
