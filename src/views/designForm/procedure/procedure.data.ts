import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormSchema } from '/@/components/Form'
// 表格页
export const columns: BasicColumn[] = [
  {
    title: '流程名称',
    dataIndex: 'name',
  },
  {
    title: '流程key',
    dataIndex: 'key',
  },
  {
    title: '部署名称',
    dataIndex: 'deploymentName',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '版本号',
    dataIndex: 'version',
  },
]

export const basicFormSchema = (beforeUploadCallback): FormSchema[] => [
  {
    field: 'name',
    label: '流程名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'key',
    label: '流程key',
    component: 'Input',
    required: true,
  },
  {
    field: 'file',
    label: '上传',
    component: 'JUpload',
    componentProps: {
      beforeUpload: (file) => beforeUploadCallback(file),
      value: '',
    },
  },
]
