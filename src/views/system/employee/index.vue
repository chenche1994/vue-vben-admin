<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="m-4 mr-0 w-1/4 xl:w-1/5" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增员工</a-button>
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
  import AccountDrawer from './components/EmployeeDrawer.vue'
  import { apiGetEmployeeList, apiDelEmployee } from '/@/api/index'
  import { columns, searchFormSchema } from './employee.data'
  import { useDrawer } from '/@/components/Drawer'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '员工列表',
    api: apiGetEmployeeList,
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
      baseColProps: {
        span: 6,
      },
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
    await apiDelEmployee({ id: record.id })
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
