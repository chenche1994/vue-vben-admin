import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'userName',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'userNick',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    width: 120,
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    width: 120,
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userNameLike',
    label: '用户名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'userNickLike',
    label: '昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realNameLike',
    label: '真实姓名',
    component: 'Input',
    colProps: { span: 6 },
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
