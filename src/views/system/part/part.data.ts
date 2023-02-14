import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '组件名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '组件编码',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '组件归属',
    dataIndex: 'categoryName',
    width: 120,
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'nameLike',
    label: '组件名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'userNickLike',
    label: '组件编码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realNameLike',
    label: '物资编码',
    component: 'Input',
    colProps: { span: 6 },
  },
]
