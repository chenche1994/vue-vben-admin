<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary"> 新增 </a-button>
      </template>
      <template #action>
        <a-button @click="openDesignModal"> 设计 </a-button>
        <a-button> 预览 </a-button>
        <a-button> 删除 </a-button>
      </template>
    </BasicTable>
    <DesignModel @register="registerDesignModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table'
  import { getBasicColumns } from './formlist.data'
  import { demoListApi } from '/@/api/demo/table'
  import { useModal } from '/@/components/Modal'
  import DesignModel from '../components/designModel.vue'
  const [registerTable] = useTable({
    title: '',
    api: demoListApi,
    columns: getBasicColumns(),
    bordered: true,
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  })
  const [registerDesignModal, { openModal: openDesignModal }] = useModal()
</script>
