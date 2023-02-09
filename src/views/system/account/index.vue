<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="m-4 mr-0 w-1/4 xl:w-1/5" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
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
  </PageWrapper>
</template>
<script setup>
  import { PageWrapper } from '/@/components/Page'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import DeptTree from './components/deptTree.vue'
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
      width: 120,
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
