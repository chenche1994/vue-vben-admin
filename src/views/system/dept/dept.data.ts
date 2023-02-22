import { FormSchema } from '/@/components/Form'
import { apiGetUserList, apiGetOrgTree, apiGetSpecialty } from '/@/api'

export enum orgCategory {
  ORGANIZATION = 'ORGANIZATION',
  DUTY = 'DUTY',
}
// 部门基础表单
export function useBasicFormSchema(type = orgCategory.ORGANIZATION) {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'name',
      label: '名称',
      component: 'Input',
      rules: [{ required: true, message: '机构名称不能为空' }],
    },
    {
      field: 'parentId',
      label: '上级部门',
      component: 'TreeSelect',
      componentProps: {
        treeData: [],
        placeholder: '无',
        fieldNames: { label: 'name', value: 'id', children: 'subList' },
        dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
      },
    },
    {
      field: 'type',
      label: '类型',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { value: 'ORGANIZATION', label: '部门' },
          { value: 'DUTY', label: '岗位' },
        ],
      },
    },
    {
      field: 'specialtyId',
      label: '专业',
      component: 'ApiTreeSelect',
      componentProps: {
        api: apiGetSpecialty,
        fieldNames: { label: 'name', value: 'id', children: 'subList' },
      },
      show: type === orgCategory.ORGANIZATION,
    },
    {
      field: 'charger',
      label: '负责人',
      component: 'ApiSelect',
      componentProps: {
        api: apiGetUserList,
      },
      show: type === orgCategory.ORGANIZATION,
    },
    {
      field: 'mobile',
      label: '电话',
      component: 'Input',
      show: type === orgCategory.ORGANIZATION,
    },
    {
      field: 'email',
      label: '邮箱',
      component: 'Input',
      show: type === orgCategory.ORGANIZATION,
    },
    {
      field: 'address',
      label: '地址',
      component: 'Input',
      show: type === orgCategory.ORGANIZATION,
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
  return { basicFormSchema }
}

// 职务填写表单
export const postFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '岗位名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'deptId',
    label: '分配部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: apiGetOrgTree,
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
      isLeaf: (item) => {
        return !item.children
      },
    },
    required: true,
  },
  {
    field: 'desc',
    label: '描述',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入描述',
    },
  },
]
