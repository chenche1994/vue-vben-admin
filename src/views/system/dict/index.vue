<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
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
    <DictDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import DictDrawer from './DictDrawer.vue'
  import { apiGetDictList, apiDelDict } from '/@/api/sys/dict'
  import { columns } from './dict.data'
  import { useDrawer } from '/@/components/Drawer'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '数据字典',
    api: apiGetDictList,
    columns,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    showTableSetting: true,
    bordered: true,
  })
  const [registerDrawer, { openDrawer }] = useDrawer()
  // 编辑
  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    })
  }
  // 删除
  async function handleDelete(record) {
    await apiDelDict({ id: record.id })
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
