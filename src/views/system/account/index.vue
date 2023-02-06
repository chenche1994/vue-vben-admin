<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="m-4 mr-0 w-1/4 xl:w-1/5" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
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
  </PageWrapper>
</template>
<script setup>
  import { PageWrapper } from '/@/components/Page'
  import DeptTree from './components/deptTree.vue'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { getAccountList } from '/@/api/demo/system'
  import { columns } from './account.data'
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
  })
  // 详情
  function handleView() {}
  // 编辑
  function handleEdit() {}
  // 删除
  function handleDelete() {}
</script>
