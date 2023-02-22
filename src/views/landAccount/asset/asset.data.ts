import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import { apiGetDictByKey, apiGetEmployeeList, apiGetEmployeeInfo } from '/@/api'
import dayjs from 'dayjs'
import { useUserStore } from '/@/store/modules/user'
const userInfo = useUserStore().getUserInfo

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
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    field: 'proprietorDept',
    label: '归属部门',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    field: 'operateDept',
    label: '使用部门',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
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
    required: true,
  },
  {
    label: '资产分类',
    field: 'categoryId',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
    required: true,
  },
  {
    label: '位置',
    field: 'areaId',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
    required: true,
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
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '质保期',
    field: 'warrantyStartDate',
    component: 'RangePicker',
    componentProps: ({ formActionType }) => {
      return {
        valueFormat: 'YYYY-MM-DD',
        onChange: (e: ChangeEvent) => {
          const date1 = dayjs(e[0])
          const date2 = dayjs(e[1])
          const day = date2.diff(date1, 'day') // 质保总天数
          const dayReminder = date2.diff(dayjs(), 'day') // 质保剩余天数
          const { setFieldsValue } = formActionType
          setFieldsValue({
            warrantyDay: day,
            warrantylastDay: dayReminder > 0 ? dayReminder : '已超期',
          })
        },
      }
    },
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
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    label: '维修部门',
    field: 'maintainDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    label: '使用部门',
    field: 'operateDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    label: '归属部门',
    field: 'proprietorDept',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id', children: 'subList' },
    },
  },
  {
    label: '责任人',
    field: 'responsible',
    component: 'ApiSelect',
    componentProps: ({ formActionType }) => {
      return {
        api: apiGetEmployeeList,
        params: {
          pageSize: 100,
          pageIndex: 1,
        },
        labelField: 'realName',
        valueField: 'id',
        resultField: 'list',
        onChange: async (e: ChangeEvent) => {
          const { setFieldsValue } = formActionType
          const employee = await apiGetEmployeeInfo({ id: e })
          setFieldsValue({
            responsibleJobNumber: employee.jobNumber,
          })
        },
      }
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
    defaultValue: userInfo.realName,
  },
  {
    label: '创建人工号',
    field: 'creatorJobNumber',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    defaultValue: userInfo.realName,
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

export const priceFormSchema: FormSchema[] = [
  {
    label: '资产原值',
    field: 'initialAsset',
    component: 'Input',
  },
  {
    label: '累计折旧',
    field: 'cumulativeDiscount',
    component: 'Input',
  },
  {
    label: '本月折旧',
    field: 'monthDiscount',
    component: 'Input',
  },
  {
    label: '折旧年限',
    field: 'discountYears',
    component: 'Input',
  },
  {
    label: '折旧方法',
    field: 'depreciationStatus',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetDictByKey,
      resultField: 'itemList',
      labelField: 'name',
      valueField: 'name',
      params: {
        parameter: 'depreciationMethod',
      },
    },
  },
  {
    label: '本年折旧',
    field: 'yearDiscount',
    component: 'Input',
  },
  {
    label: '资产净值',
    field: 'netAsset',
    component: 'Input',
  },
  {
    label: '残值',
    field: 'residualAsset',
    component: 'Input',
  },
  {
    label: '残值率',
    field: 'residualRatio',
    component: 'Input',
  },
  {
    label: '建卡日期',
    field: 'cardCreateDate',
    component: 'DatePicker',
  },
]

export const columnsPart: BasicColumn[] = [
  {
    title: '组件编码',
    dataIndex: 'code',
  },
  {
    title: '组件名称',
    dataIndex: 'name',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    edit: true,
    editable: true,
  },
]
