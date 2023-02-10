import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import { apiGetOrgTree } from '/@/api'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '工号',
    dataIndex: 'jobNumber',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
  },
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
  },
  {
    title: '职务',
    dataIndex: 'postName',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobNumberLike',
    label: '工号',
    component: 'Input',
  },
  {
    field: 'realNameLike',
    label: '姓名',
    component: 'Input',
  },
  {
    field: 'mobileLike',
    label: '手机号',
    component: 'Input',
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
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: apiGetOrgTree,
      fieldNames: { label: 'name', value: 'id' },
      isLeaf: (item) => {
        return !item.children
      },
    },
    required: true,
  },
  {
    field: 'postId',
    label: '职务',
    component: 'ApiSelect',
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
    componentProps: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
    },
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
    required: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'email',
    label: '生日',
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: 'M',
        },
        {
          label: '女',
          value: 'F',
        },
        {
          label: '未知',
          value: 'U',
        },
      ],
    },
  },
  {
    field: 'address',
    label: '详细地址',
    component: 'InputTextArea',
  },
]
