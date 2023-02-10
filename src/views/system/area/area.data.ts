import { FormSchema } from '/@/components/Form'
import { BasicColumn } from '/@/components/Table/src/types/table'
import { apiGetUserList, apiGetAreaTree, apiGetOrgTree } from '/@/api'

// 部门新增编辑基础表单
export const basicFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级分类',
    component: 'ApiTreeSelect',
    componentProps: {
      api: apiGetAreaTree,
      fieldNames: { label: 'name', value: 'id' },
      isLeaf: (item) => {
        return !item.children
      },
    },
  },
  {
    field: 'parentId',
    label: '责任部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: apiGetOrgTree,
      fieldNames: { label: 'name', value: 'id' },
      isLeaf: (item) => {
        return !item.children
      },
    },
  },
  {
    field: 'charger',
    label: '责任人',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetUserList,
      params: {
        pageIndex: 1,
        pageSize: 100,
      },
      resultField: 'list',
    },
  },
  {
    field: 'memo',
    label: '备注',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入备注',
    },
  },
]

// 表格页
export const columns: BasicColumn[] = [
  {
    title: '区域编码',
    dataIndex: 'code',
  },
  {
    title: '区域名称',
    dataIndex: 'name',
  },
  {
    title: '责任人',
    dataIndex: 'employeeName',
  },
  {
    title: '责任部门',
    dataIndex: 'deptName',
  },
  {
    title: '责任岗位',
    dataIndex: 'postName',
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobNumberLike',
    label: '区域名称',
    component: 'Input',
  },
  {
    field: 'realNameLike',
    label: '区域编码',
    component: 'Input',
  },
]
