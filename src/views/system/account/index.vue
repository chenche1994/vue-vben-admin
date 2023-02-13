<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountDrawer @register="registerAccountDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import AccountDrawer from './components/AccountDrawer.vue'
  import { apiGetUserList, apiDelUser } from '/@/api/sys/user'
  import { columns, searchFormSchema } from './account.data'
  import { useDrawer } from '/@/components/Drawer'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '账号列表',
    api: apiGetUserList,
    columns,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
  })
  const [registerAccountDrawer, { openDrawer }] = useDrawer()
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
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    })
  }
  // 刷新表格
  function handleSuccess() {
    reload()
  }
</script>
