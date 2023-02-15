<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:import-outlined">新建流程</a-button>
        <a-upload name="file" :showUploadList="false" :customRequest="onImportXls" />
      </template>
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table'
  import { apiGetProcedureList, Api } from './procedure.api'
  import { columns } from './procedure.data'
  import { useMethods } from '/@/hooks/system/useMethods'
  const { handleImportXls } = useMethods()
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '流程列表',
    api: apiGetProcedureList,
    columns,
    showTableSetting: true,
    bordered: true,
  })
  // 导入
  function onImportXls(d) {
    handleImportXls(d, Api.Deploy, () => {
      reload()
    })
  }
</script>
