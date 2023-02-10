<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增专业</a-button>
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
    <SpecialtyModel @register="registerModel" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import SpecialtyModel from './SpecialtyModel.vue'
  import { apiGetSpecialty, apiDelSpecialty } from '/@/api'
  import { columns } from './specialty.data'
  import { useModal } from '/@/components/Modal'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '专业列表',
    api: apiGetSpecialty,
    columns,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
    showTableSetting: true,
    bordered: true,
  })
  const [registerModel, { openModal }] = useModal()
  // 编辑
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    })
  }
  // 删除
  async function handleDelete(record) {
    await apiDelSpecialty({ id: record.id })
    reload()
  }

  // 新增账号
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    })
  }
  // 刷新表格
  function handleSuccess() {
    reload()
  }
</script>
