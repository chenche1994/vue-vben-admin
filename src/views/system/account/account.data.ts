import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import { getDeptList } from '/@/api/demo/system'

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
    field: 'jobNumber',
    label: '工号',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'realName',
    label: '姓名',
    component: 'Input',
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'ApiCascader',
    componentProps: {
      api: getDeptList,
      labelField: 'deptName',
      valueField: 'id',
    },
  },
  {
    field: 'postId',
    label: '职务',
    component: 'Select',
  },
  {
    field: 'createAccount',
    label: '是否自动创建账号',
    component: 'Switch',
  },
  {
    field: 'isOuter',
    label: '是否委外',
    component: 'Switch',
  },
  {
    field: 'hireDate',
    label: '入职时间',
    component: 'DatePicker',
  },
  {
    field: 'mobile',
    label: '联系电话',
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'birthday',
    label: '生日',
    component: 'DatePicker',
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
  },
  {
    field: 'address',
    label: '详细地址',
    component: 'InputTextArea',
  },
]
