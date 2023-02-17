import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
import { apiGetFormDataSource } from './formlist.api'
import { apiGetProcedureList, apiGetProcedureNode } from '../procedure/procedure.api'
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '表单名称',
      dataIndex: 'name',
      width: 150,
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' },
      // ],
    },
    {
      title: '表单key',
      dataIndex: 'address',
    },
    {
      title: '数据库表名',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '所属数据库',
      width: 150,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '描述',
      width: 150,
      sorter: true,
      dataIndex: 'endTime',
    },
  ]
}

export const basicFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '表单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'formKey',
    label: '表单key',
    component: 'Input',
    required: true,
  },
  {
    field: 'datasourceId',
    label: '数据源',
    component: 'ApiSelect',
    componentProps: {
      api: apiGetFormDataSource,
      labelField: 'title',
      valueField: 'id',
      resultField: 'list',
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    },
    required: true,
  },
  {
    field: 'processDefinitionId',
    label: '挂载流程',
    component: 'ApiSelect',
    componentProps: ({ formActionType }) => {
      return {
        api: apiGetProcedureList,
        labelField: 'deploymentName',
        valueField: 'id',
        resultField: 'list',
        params: {
          pageIndex: 1,
          pageSize: 10,
        },
        onChange: async (e: ChangeEvent) => {
          const { updateSchema } = formActionType
          const nodeList = await apiGetProcedureNode({
            processDefinitionId: e,
            typeList: ['UserTask'],
          })
          updateSchema([{ field: 'nodeId', componentProps: { options: nodeList } }])
        },
      }
    },
    required: true,
  },
  {
    field: 'nodeId',
    label: '流程节点',
    component: 'Select',
    componentProps: {
      options: [],
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    required: true,
  },
  {
    field: 'content',
    label: '设计',
    component: 'Input',
    slot: 'content',
    required: true,
  },
]
