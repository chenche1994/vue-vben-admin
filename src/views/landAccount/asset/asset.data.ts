import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import { apiGetDictByKey, apiGetAreaTree } from '/@/api'
// 表格页
export const columns: BasicColumn[] = [
  {
    title: '资产编码',
    dataIndex: 'code',
  },
  {
    title: '资产名称',
    dataIndex: 'name',
  },
  {
    title: '增加方式',
    dataIndex: 'increaseMethod',
  },
  {
    title: '资产分类',
    dataIndex: 'categoryFullName',
  },
  {
    title: '位置',
    dataIndex: 'areaName',
  },
  {
    title: '规格型号',
    dataIndex: 'specification',
  },
  {
    title: '承包商',
    dataIndex: 'contractor',
  },
  {
    title: '品牌制造商',
    dataIndex: 'brandManufacturer',
  },
  {
    title: '所属合同',
    dataIndex: 'laborContract',
  },
  {
    title: '合同号',
    dataIndex: 'contractNumber',
  },
  {
    title: '合同价格',
    dataIndex: 'contractPrice',
  },
  {
    title: '出厂编号',
    dataIndex: 'factoryNumber',
  },
  {
    title: '安装/到货日期',
    dataIndex: 'arrivalDate',
  },
  {
    title: '启用/领用日期',
    dataIndex: 'launchDate',
  },
  {
    title: '质保期',
    dataIndex: 'warrantyStartDate',
  },
  {
    title: '质保天数',
    dataIndex: 'warrantyDay',
  },
  {
    title: '质保剩余天数',
    dataIndex: 'warrantylastDay',
  },
  {
    title: '归口部门',
    dataIndex: 'dispatchDept',
  },
  {
    title: '维修部门',
    dataIndex: 'maintainDept',
  },
  {
    title: '使用部门',
    dataIndex: 'operateDept',
  },
  {
    title: '归属部门',
    dataIndex: 'proprietorDept',
  },
  {
    title: '责任人',
    dataIndex: 'responsible',
  },
  {
    title: '责任人工号',
    dataIndex: 'responsibleJobNumber',
  },
  {
    title: '资产创建人',
    dataIndex: 'creator',
  },
  {
    title: '创建人工号',
    dataIndex: 'creatorJobNumber',
  },
  {
    title: '实物状态',
    dataIndex: 'physicalStatus',
  },
  {
    title: '折旧状态',
    dataIndex: 'depreciationStatus',
  },
]

// 表格搜索参数
export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '资产编码',
    component: 'Input',
  },
  {
    field: 'nameLike',
    label: '资产名称',
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '位置',
    component: 'Input',
  },
  {
    field: 'proprietorDept',
    label: '归属部门',
    component: 'Input',
  },
  {
    field: 'operateDept',
    label: '使用部门',
    component: 'Input',
  },
]

export const basicFormSchema: FormSchema[] = [
  {
    label: '资产编码',
    field: 'code',
    component: 'Input',
    required: true,
  },
  {
    label: '资产名称',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '增加方式',
    field: 'increaseMethod',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetDictByKey,
      resultField: 'itemList',
      labelField: 'name',
      valueField: 'name',
      params: {
        parameter: 'increaseMethod',
      },
    },
    // required: true,
  },
  {
    label: '资产分类',
    field: 'categoryId',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
    // required: true,
  },
  {
    label: '位置',
    field: 'areaName',
    component: 'ApiTreeSelect',
    componentProps: {
      api: apiGetAreaTree,
    },
    // required: true,
  },
  {
    label: '规格型号',
    field: 'specification',
    component: 'Input',
  },
  {
    label: '承包商',
    field: 'contractor',
    component: 'Input',
  },
  {
    label: '品牌制造商',
    field: 'brandManufacturer',
    component: 'Input',
  },
  {
    label: '所属合同',
    field: 'laborContract',
    component: 'Input',
  },
  {
    label: '合同号',
    field: 'contractNumber',
    component: 'Input',
  },
  {
    label: '合同价格',
    field: 'contractPrice',
    component: 'Input',
  },
  {
    label: '出厂编号',
    field: 'factoryNumber',
    component: 'Input',
  },
  {
    label: '安装/到货日期',
    field: 'arrivalDate',
    component: 'DatePicker',
  },
  {
    label: '启用/领用日期',
    field: 'launchDate',
    component: 'DatePicker',
  },
  {
    label: '质保期',
    field: 'warrantyStartDate',
    component: 'DatePicker',
  },
  {
    label: '质保天数',
    field: 'warrantyDay',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '质保剩余天数',
    field: 'warrantylastDay',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '归口部门',
    field: 'dispatchDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
    },
  },
  {
    label: '维修部门',
    field: 'maintainDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
    },
  },
  {
    label: '使用部门',
    field: 'operateDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
    },
  },
  {
    label: '归属部门',
    field: 'proprietorDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
    },
  },
  {
    label: '责任人',
    field: 'responsible',
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    label: '责任人工号',
    field: 'responsibleJobNumber',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '资产创建人',
    field: 'creator',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '创建人工号',
    field: 'creatorJobNumber',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '实物状态',
    field: 'physicalStatus',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetDictByKey,
      params: {
        parameter: 1,
      },
      resultField: 'itemList',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '折旧状态',
    field: 'depreciationStatus',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetDictByKey,
      resultField: 'itemList',
      labelField: 'name',
      valueField: 'name',
      params: {
        parameter: 'depreciationStatus',
      },
    },
  },
]
