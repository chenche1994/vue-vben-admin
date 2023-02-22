<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport()">导出</a-button>
        <a-button type="primary" @click="handleExport('all')">导出全部</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '详情',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '计划变更',
                onClick: handleDelete.bind(null, record),
              },
              {
                color: 'error',
                label: '停用',
                onClick: handleDelete.bind(null, record),
              },
              {
                color: 'error',
                label: '删除',
                onClick: handleDelete.bind(null, record),
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
  import { apiGetUserList, apiDelUser } from '/@/api/sys/user'
  import { columns, searchFormSchema } from './repairSchedule.data'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    api: apiGetUserList,
    columns,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      baseColProps: { xs: 24, sm: 12, md: 10, lg: 10, xl: 8, xxl: 6 },
      actionColOptions: { xs: 24, sm: 12, md: 10, lg: 10, xl: 8, xxl: 6 },
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    rowSelection: {},
  })
  // 编辑
  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    })
  }
  // 删除
  async function handleDelete(record) {
    await apiDelUser({ id: record.id })
    reload()
  }

  // 新增账号
  function handleExport() {}
</script>
