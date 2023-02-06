import { BasicColumn } from '/@/components/Table/src/types/table'
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '表单名称',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
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
