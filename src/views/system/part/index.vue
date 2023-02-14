<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-upload name="file" :showUploadList="false" :customRequest="onImportXls">
          <a-button type="primary" preIcon="ant-design:import-outlined" style="margin-left: 8px"
            >导入</a-button
          >
        </a-upload>
        <a-button type="primary" @click="onExportXls">导出</a-button>
        <a-button type="primary" @click="handleDelete">删除</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table'
  import { apiGetComponentList, Api } from './part.api'
  import { columns, searchFormSchema } from './part.data'
  import { useMethods } from '/@/hooks/system/useMethods'
  const { handleImportXls } = useMethods()
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '组成部件列表',
    api: apiGetComponentList,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
  })
  // 删除
  async function handleDelete() {
    // await apiDelUser({ id: record.id })
    reload()
  }
  function onImportXls(d) {
    handleImportXls(d, Api.importUrl, () => {
      loadRootTreeData()
    })
  }
  function onExportXls() {}
</script>
