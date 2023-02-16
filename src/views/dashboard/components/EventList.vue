<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '处理',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { apiGetUserList } from '/@/api/sys/user'
  import {
    guzhang_columns,
    guzhang_searchFormSchema,
    jihua_searchFormSchema,
    jihua_columns,
    biangeng_searchFormSchema,
    biangeng_columns,
    linshi_searchFormSchema,
    linshi_columns,
    yanqi_searchFormSchema,
    yanqi_columns,
    shijian_searchFormSchema,
    shijian_columns,
  } from './event.data'
  const props = defineProps({
    formType: {
      type: String,
      default: 'guzhang',
    },
  })
  // 注册表格
  const [registerTable, { reload }] = useTable({
    api: apiGetUserList,
    columns: getColumns(props.formType),
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    formConfig: {
      labelWidth: 90,
      schemas: getSearchForm(props.formType),
      autoSubmitOnEnter: true,
      baseColProps: {
        span: 6,
      },
    },
    useSearchForm: true,
    bordered: true,
  })

  function getColumns() {
    switch (props.formType) {
      case 'guzhang':
        return guzhang_columns
      case 'jihua':
        return jihua_columns
      case 'biangeng':
        return biangeng_columns
      case 'linshi':
        return linshi_columns
      case 'yanqi':
        return yanqi_columns
      case 'shijian':
        return shijian_columns
      default:
        return guzhang_columns
    }
  }

  function getSearchForm() {
    switch (props.formType) {
      case 'guzhang':
        return guzhang_searchFormSchema
      case 'jihua':
        return jihua_searchFormSchema
      case 'biangeng':
        return biangeng_searchFormSchema
      case 'linshi':
        return linshi_searchFormSchema
      case 'yanqi':
        return yanqi_searchFormSchema
      case 'shijian':
        return shijian_searchFormSchema
      default:
        return guzhang_searchFormSchema
    }
  }
  // 编辑
  function handleEdit(record) {
    reload(record)
  }
</script>
