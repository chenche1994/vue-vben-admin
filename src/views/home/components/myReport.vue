<template>
  <Card>
    <div><Icon icon="ion:grid-outline" class="mr-2" />我的提报</div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue'
  import Icon from '/@/components/Icon'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { apiGetUserList } from '/@/api/sys/user'
  import { columns, searchFormSchema } from '../home.data'
  // 注册表格
  const [registerTable] = useTable({
    api: apiGetUserList,
    columns,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    formConfig: {
      labelWidth: 60,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    bordered: true,
  })
</script>
