import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account1',
    width: 120,
  },
  {
    title: '工号',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '所属部门',
    dataIndex: 'org',
    width: 120,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 120,
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '工号',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
]
