<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
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
                icon: 'clarity:info-standard-line',
                tooltip: '详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountDrawer @register="registerAccountDrawer" />
  </PageWrapper>
</template>
<script setup>
  import { PageWrapper } from '/@/components/Page'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import DeptTree from './components/deptTree.vue'
  import AccountDrawer from './components/AccountDrawer.vue'
  import { getAccountList } from '/@/api/demo/system'
  import { columns, searchFormSchema } from './account.data'
  import { useDrawer } from '/@/components/Drawer'
  // 注册表格
  const [registerTable] = useTable({
    title: '账号列表',
    api: getAccountList,
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
  // 详情
  function handleView() {
    openDrawer(true)
  }
  // 编辑
  function handleEdit() {
    openDrawer(true)
  }
  // 删除
  function handleDelete() {}
</script>
