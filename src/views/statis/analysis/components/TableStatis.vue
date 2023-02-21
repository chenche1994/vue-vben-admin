<template>
  <Card title="工单统计">
    <BasicTable @register="registerTable" />
  </Card>
</template>
<script setup lang="ts">
  import { Card } from 'ant-design-vue'
  import { BasicTable, useTable } from '/@/components/Table'
  import { apiGetUserList } from '/@/api/sys/user'
  import { columns } from '../data'
  // 注册表格
  const [registerTable] = useTable({
    api: apiGetUserList,
    columns: columns,
    bordered: true,
  })
</script>
