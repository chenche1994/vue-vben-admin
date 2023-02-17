<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:import-outlined" @click="handleCreate"
          >新建流程</a-button
        >
      </template>
    </BasicTable>
    <ProcedureModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table'
  import { apiGetProcedureList } from './procedure.api'
  import { columns } from './procedure.data'
  import { useModal } from '/@/components/Modal'
  import ProcedureModal from './procedureModal.vue'
  // const { handleImportXls } = useMethods()

  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '流程列表',
    api: apiGetProcedureList,
    columns,
    showTableSetting: true,
    bordered: true,
  })

  const [registerModal, { openModal }] = useModal()
  // 导入
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    })
  }

  function handleSuccess() {
    reload()
  }
</script>
