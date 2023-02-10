import { FormSchema } from '/@/components/Form'
import { apiGetUserList, apiGetOrgTree, apiGetSpecialty } from '/@/api'

// 部门基础表单
export function useBasicFormSchema() {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'name',
      label: '部门名称',
      component: 'Input',
      rules: [{ required: true, message: '机构名称不能为空' }],
    },
    {
      field: 'parentId',
      label: '上级部门',
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
      field: 'specialtyId',
      label: '专业',
      component: 'ApiCascader',
      componentProps: {
        api: apiGetSpecialty,
        labelField: 'deptName',
        valueField: 'id',
        isLeaf: (item) => {
          return !item.children
        },
      },
    },
    {
      field: 'charger',
      label: '负责人',
      component: 'ApiSelect',
      componentProps: {
        api: apiGetUserList,
      },
    },
    {
      field: 'mobile',
      label: '电话',
      component: 'Input',
    },
    {
      field: 'fax',
      label: '传真',
      component: 'Input',
    },
    {
      field: 'address',
      label: '地址',
      component: 'Input',
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
